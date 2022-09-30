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

export const FetchNFTById = async (web3Provider, nft_id) => {
    try { 
        const signer = web3Provider.getSigner() ;
        let marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;

        let nft = await marketplace.fetchNFTById(nft_id) ;

        return nft ;
        
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const FetchOrdersByBidder = async (web3Provider, wallet) => {
    try {
        const signer = web3Provider.getSigner() ;

        let bidContract = new ethers.Contract(bidContract_address, bidContract_abi, signer) ;

        let bid_status = ["pending", "accepted", "denied"] ;

        let bidsByOwner = await bidContract.fetchOrdersByBidder(wallet) ;

        bidsByOwner = await Promise.all(
            bidsByOwner.map(async bid => {
                let item = {
                    bid_id : Number(bid.bid_id.toString()),
                    nft_id : Number(bid.nft_id.toString()),
                    from : bid.from,
                    to : bid.to,
                    amount : Number(bid.amount.toString()),
                    price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
                    placed_at : new Date(Number(bid.placed_at) * 1000).toLocaleString(),
                    checked_at : new Date(Number(bid.checked_at) * 1000).toLocaleString(),
                    status : bid_status[Number(bid.status.toString())],
                    dir : 'right'
                }

                return item ;
            })
        );

        return bidsByOwner;
    } catch(err) {
        console.log(err);
        return false ;
    }
}
export const FetchNFTsURI = async (web3Provider, wallet) => {
    try {
        const signer = web3Provider.getSigner() ;

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let rareContract = new ethers.Contract(rareContract_address, rareContract_abi, signer) ;
        let legenContract = new ethers.Contract(legenContract_address, legenContract_abi, signer) ;

        let nftsByOwner = await marketplaceContract.fetchAllNFTs() ;

        let filter_nfts = [] ;

        await Promise.all(
            await nftsByOwner.map( async nft => {
                let isYourNft ;

                if(Number(nft.price_id.toString()) === 1) {
                    isYourNft = await legenContract.checkOwnerOrBuyer(Number(nft.nft_id.toString()), wallet) ;
                } else {
                    isYourNft = await rareContract.checkOwner(Number(nft.nft_id.toString()), wallet) ;
                }

                let nft_info ;

                if(Number(nft.price_id.toString()) === 1) {
                    nft_info = await legenContract.fetchLegen(Number(nft.nft_id.toString())) ;
                } else {
                    nft_info = await rareContract.fetchRare(Number(nft.nft_id.toString())) ;
                }

                if(isYourNft && nft_info.creator !== wallet) filter_nfts.push(nft) ;
            })
        ) ;

        return filter_nfts ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const FetchNFTsByOwner = async (web3Provider, wallet) => {
    try {
        const signer = web3Provider.getSigner() ;

        const address = await signer.getAddress() ;

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let rareContract = new ethers.Contract(rareContract_address, rareContract_abi, signer) ;
        let legenContract = new ethers.Contract(legenContract_address, legenContract_abi, signer) ;
        let solsNFTContract = new ethers.Contract(solsNFT_address, solsNFT_abi, signer) ;

        let nftsByOwner = await marketplaceContract.fetchAllNFTs() ;

        let filter_nfts = [] ;

        await Promise.all(
            await nftsByOwner.map( async nft => {
                let isBuyer = await legenContract.checkBuyer(Number(nft.nft_id.toString()), wallet) ;

                if(nft.owners.includes(wallet) || isBuyer) filter_nfts.push(nft) ;
            })
        ) ;

        filter_nfts = await Promise.all(
            filter_nfts.map(async nft => {
                let nftInfo ;
                if(Number(nft.price_id.toString()) === 1) {
                    nftInfo = await legenContract.fetchLegen(Number(nft.nft_id.toString())) ;
                    let buyer_isBuyer = await legenContract.checkBuyer(Number(nft.nft_id.toString()), address) ;
                    let seller_isBuyer = await legenContract.checkBuyer(Number(nft.nft_id.toString()), wallet) ;

                    let balanceOf = await solsNFTContract._balanceOf(wallet, Number(nft.nft_id.toString())) ;

                    nftInfo = {
                        product_price : ethers.utils.formatUnits(nftInfo.product_price.toString(), 'ether') ,
                        product_unit : Number(nftInfo.product_unit.toString()),
                        ticket_price : ethers.utils.formatUnits(nftInfo.ticket_price.toString(), 'ether'),
                        ticket_unit : Number(nftInfo.ticket_unit.toString()) ,
                        ticket_available : Number(nftInfo.ticket_available.toString()) ,
                        royalty : ethers.utils.formatUnits(nftInfo.royalty.toString(), 'ether'),
                        sold : nftInfo.sold,
                        creator : nftInfo.creator,
                        isBuyer : {
                            seller : seller_isBuyer,
                            buyer :buyer_isBuyer
                        },
                        balanceOf : Number(balanceOf.toString())
                    }
                }
                if(Number(nft.price_id.toString()) === 2) {
                    nftInfo = await rareContract.fetchRare(Number(nft.nft_id.toString())) ;
                    let balanceOf = await solsNFTContract._balanceOf(wallet, Number(nft.nft_id.toString())) ;

                    nftInfo = {
                        minimum_bidding : Number(ethers.utils.formatUnits( nftInfo.minimum_bidding.toString(), 'ether') ),
                        bid_unit : Number(nftInfo.bid_unit.toString()),
                        item_available : Number(nftInfo.item_available.toString()),
                        royalty : Number(ethers.utils.formatUnits(nftInfo.royalty.toString(), 'ether')),
                        sold : nftInfo.sold,
                        creator : nftInfo.creator.toString(),
                        balanceOf :Number(balanceOf.toString()),
                    }
                }
                let item = {
                    ...nftInfo ,
                    nft_id : Number(nft.nft_id.toString()),
                    product_id : Number(ethers.utils.formatUnits(nft.product_id.toString(), 'ether') ),
                    price_id : Number(nft.price_id.toString()),
                    name : nft.name,
                    description :  nft.description,
                    uri : nft.uri,
                    owners : nft.owners,
                    seller : {
                        wallet : wallet,
                        isCreator : nftInfo.creator === wallet,
                        isReseller : nft.owners.includes(wallet) && (nftInfo.creator !== wallet),
                    },
                    buyer : {
                        isCreator : nftInfo.creator === address,
                        isReseller : nft.owners.includes(address) && (nftInfo.creator !== address),
                    }
                }
                return item ;
            })
        );

        // console.log(" NFTs By Owner  \n", nftsByOwner) ;

        // console.log(filter_nfts) ; 
        return filter_nfts ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const FetchBidsByOwner = async (web3Provider, wallet) => {
    try {
        const signer = web3Provider.getSigner() ;

        let bidContract = new ethers.Contract(bidContract_address, bidContract_abi, signer) ;

        let bid_status = ["pending", "accepted", "denied"] ;

        let bidsByOwner = await bidContract.fetchBidsByOwner(wallet) ;

        bidsByOwner = await Promise.all(
            bidsByOwner.map(async bid => {
                let item = {
                    bid_id : Number(bid.bid_id.toString()),
                    nft_id : Number(bid.nft_id.toString()),
                    from : bid.from,
                    to : bid.to,
                    amount : Number(bid.amount.toString()),
                    price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
                    placed_at : new Date(Number(bid.placed_at) * 1000).toLocaleString(),
                    checked_at : new Date(Number(bid.checked_at) * 1000).toLocaleString(),
                    status : bid_status[Number(bid.status.toString())],
                    dir : 'left'
                }

                return item ;
            })
        );

        return bidsByOwner;
    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const BalanceByAccount = async (web3Provider, nft_id, account) => {
    try {
        const signer = web3Provider.getSigner() ;

        let solsmarketplace = new ethers.Contract(solsNFT_address, solsNFT_abi, signer) ;

        let balanceOf = await solsmarketplace._balanceOf(account, nft_id) ;

        return balanceOf.toString() ;
        
    } catch(err) {
        console.log(err) ;
        return  false ;
    }
}