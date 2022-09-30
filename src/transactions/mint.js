// import SOLSMarketplace from '../contracts/SOLSMarketplace.json' ;
// import Rare from '../contracts/Rare.json' ;
// import Legen from '../contracts/Legendary.json' ;
// import SOLSNFT from '../contracts/SOLSNFT.json' ;
// import Bid from '../contracts/Bid.json' ;

import SOLSMarketplace from './interface/SOLSMarketplace.json' ;
import Rare from './interface/Rare.json' ;
import Legen from './interface/Legendary.json' ;
import SOLSNFT from './interface/SOLSNFT.json' ;
import Bid from './interface/Bid.json' ;

import { ethers } from 'ethers';

// const rareContract_address = Rare.networks['5777'].address ;
// const rareContract_abi = Rare.abi ;

// const legenContract_address = Legen.networks['5777'].address ;
// const legenContract_abi = Legen.abi ;

// const solsNFT_address = SOLSNFT.networks['5777'].address ;
// const solsNFT_abi = SOLSNFT.abi ;

// const bidContract_address = Bid.networks['5777'].address ;
// const bidContract_abi = Bid.abi ;

// const marketplace_address = SOLSMarketplace.networks['5777'].address ;
// const marketplace_abi = SOLSMarketplace.abi ;

const rareContract_address = Rare.address ;
const rareContract_abi = Rare.abi ;

const legenContract_address = Legen.address ;
const legenContract_abi = Legen.abi ;

const solsNFT_address = SOLSNFT.address ;
const solsNFT_abi = SOLSNFT.abi ;

const bidContract_address = Bid.address ;
const bidContract_abi = Bid.abi ;

const marketplace_address = SOLSMarketplace.address ;
const marketplace_abi = SOLSMarketplace.abi ;

// const nonce = await web3.eth.getTransactionCount(ADMIN_WALLET_ADDR, 'latest'); 

// nonce: nonce,
// gasLimit: 3141592,
// gasUsed: 21662,
export const MintLegendary = async (web3Provider, product_id, product_price, product_unit, ticket_price, ticket_unit, ticket_available, royalty, name, description, uri) => {
    try {
        const signer = web3Provider.getSigner() ;
        
        let nonce = await signer.getTransactionCount() ;
        nonce = '0x' + (nonce + 1).toString(16);

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;

        if(product_id === 0) {
            let _product_price = ethers.utils.parseUnits(product_price.toString(), 'ether') ;
            let _ticket_price = ethers.utils.parseUnits(ticket_price.toString(), 'ether') ;
            let _royalty = ethers.utils.parseUnits(royalty.toString(), 'ether') ;

            try {
                let tx = await marketplaceContract.mintLegendary(product_id, 
                    {
                        product_price : _product_price,
                        product_unit : Number(product_unit), 
                        ticket_price : _ticket_price,
                        ticket_unit : Number(ticket_unit),
                        ticket_available : Number(ticket_available),
                        royalty : _royalty,
                    },
                    name, description, uri , { nonce : nonce }
                ) ;

                let resultTx = await tx.wait() ;

                let nft_id = await resultTx?.events?.filter(e => e.event === 'NFTListed')[0]?.args[0];

                console.log("new nft id : *****", Number(nft_id.toString())) ;

                nft_id = Number(nft_id.toString()) ;

                return nft_id ;

            } catch(err) {
                console.log(err) ;
                return 'error';
            } 
        }
    } catch(err) {
        console.log(err) ;
        return 'error' ;
    }
}

export const MintRare = async (web3Provider, product_id, minimum_bidding, bid_unit, item_available, royalty, name, description, uri) => {
    try {
        const signer = web3Provider.getSigner() ;

        let nonce = await signer.getTransactionCount() ;
        // let gasPrice = await signer.getGasPrice() ;
        nonce = '0x' + (nonce + 1).toString(16);

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
    
        if(product_id === 0) {
            let _minium_bidding = ethers.utils.parseUnits(minimum_bidding.toString(), 'ether') ;
            let _items_available = Number(item_available) ;
            let _bid_unit = Number(bid_unit) ;
            let _royalty = ethers.utils.parseUnits(royalty.toString(), 'ether') ;

            try {
                let tx = await marketplaceContract.mintRare(product_id,
                    { 
                        minimum_bidding : _minium_bidding, 
                        bid_unit : _bid_unit ,
                        item_available : _items_available,
                        royalty :  _royalty,
                    } ,
                    name, description, uri, {nonce : nonce}
                ) ;

                let resultTx = await tx.wait() ;

                let nft_id = await resultTx?.events?.filter(e => e.event === 'NFTListed')[0]?.args[0];

                console.log("new nft id : *****", nft_id) ;

                nft_id = Number(nft_id.toString()) ;

                return nft_id ;

            } catch(err) {
                console.log(err) ;
                return 'error';
            } 
        }
    } catch(err) {
        console.log(err) ;
        return 'error' ;
    }
}