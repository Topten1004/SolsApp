// import SOLSMarketplace from '../contracts/SOLSMarketplace.json' ;
// import Rare from '../contracts/Rare.json' ;
// import Legen from '../contracts/Legendary.json' ;
// import SOLSNFT from '../contracts/SOLSNFT.json' ;
// import Bid from '../contracts/Bid.json' ;
import erc20Token_abi from '../constants/abis/erc20.json' ;

import SOLSMarketplace from './interface/SOLSMarketplace.json' ;
import Rare from './interface/Rare.json' ;
import Legen from './interface/Legendary.json' ;
import SOLSNFT from './interface/SOLSNFT.json' ;
import Bid from './interface/Bid.json' ;

import { ethers } from 'ethers';
import { getUnit } from '../utils/Helper';

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

export const BuyLegendaryAsNFT = async (web3Provider, nft_id) => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let nonce = await signer.getTransactionCount() ;
        let nonce_1 = '0x' + (nonce + 1).toString(16);
        let nonce_2 = '0x' + (nonce + 1).toString(16);

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let legenContract = new ethers.Contract(legenContract_address, legenContract_abi, signer) ;
        let _legen = await legenContract.fetchLegen(Number(nft_id)) ;

        let erc20Token_address = await marketplaceContract.fetchUnitById(Number(_legen.ticket_unit.toString())) ;
        let erc20TokenContract = new ethers.Contract(erc20Token_address , erc20Token_abi, signer) ;

        let balance = await erc20TokenContract.balanceOf(address) ; //
        if(Number(ethers.utils.formatUnits(balance.toString(), 'ether')) < Number(ethers.utils.formatUnits( _legen.ticket_price.toString(), 'ether'))) {
            return 'Inffucient ' + getUnit(Number(_legen.ticket_unit.toString())) + " Balance";
        }
        let tx = await erc20TokenContract.approve(marketplace_address, _legen.ticket_price.toString(), {nonce : nonce_1 }) ;
        await tx.wait() ;

        tx = await marketplaceContract.buyLegendaryAsNFT(nft_id, {nonce : nonce_2}) ;
        await tx.wait() ;

        return 200 ;
    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;
    }
}

export const BuyLegendaryAsProduct = async (web3Provider, nft_id, wallet) => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let nonce = await signer.getTransactionCount() ;
        let nonce_1 = '0x' + (nonce + 1).toString(16);
        let nonce_2 = '0x' + (nonce + 2).toString(16);

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let legenContract = new ethers.Contract(legenContract_address, legenContract_abi, signer) ;
        let _legen = await legenContract.fetchLegen(Number(nft_id)) ;

        let erc20Token_address = await marketplaceContract.fetchUnitById(Number(_legen.product_unit.toString())) ;
        let erc20TokenContract = new ethers.Contract(erc20Token_address , erc20Token_abi, signer) ;

        let balance = await erc20TokenContract.balanceOf(address) ;
        if(Number(ethers.utils.formatUnits(balance.toString(), 'ether')) < Number(ethers.utils.formatUnits( _legen.product_price.toString(), 'ether'))) {
            return 'Inffucient ' + getUnit(Number(_legen.product_unit.toString())) + " Balance";
        }

        let tx = await erc20TokenContract.approve(marketplace_address, _legen.product_price.toString(), { nonce : nonce_1 }) ;
        await tx.wait() ;

        tx = await marketplaceContract.buyLegendaryAsProduct(nft_id, wallet, { nonce : nonce_2 }) ;
        await tx.wait() ;

        return 200 ;
    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;

    }
}

export const PlaceBid = async (web3Provider, nft_id, amount, price) => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let nonce = await signer.getTransactionCount() ;
        let nonce_1 = '0x' + (nonce + 1).toString(16);
        let nonce_2 = '0x' + (nonce + 2).toString(16);


        let marketplaceContract =  new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let rareContract = new ethers.Contract(rareContract_address, rareContract_abi, signer) ;
        let _rare = await rareContract.fetchRare(Number(nft_id)) ;

        let erc20Token_address = await marketplaceContract.fetchUnitById(Number(_rare.bid_unit.toString())) ;
        let erc20TokenContract = new ethers.Contract(erc20Token_address , erc20Token_abi, signer) ;

        let balance = await erc20TokenContract.balanceOf(address) ;
        if(Number(ethers.utils.formatUnits(balance.toString(), 'ether')) < Number(price) ) {
            return 'Inffucient ' + getUnit(Number(_rare.bid_unit.toString())) + " Balance";
        }

        let tx = await erc20TokenContract.approve(marketplace_address, ethers.utils.parseUnits(price.toString()).toString() , {nonce : nonce_1}) ;
        await tx.wait() ;

        tx = await marketplaceContract.placeBid(nft_id, amount, ethers.utils.parseUnits(price.toString(), 'ether'), {nonce : nonce_2}) ;
        await tx.wait() ;

        return 200 ;
    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;

    }
}

export const AcceptBid = async (web3Provider, bid_id) => {
    try {
        const signer = web3Provider.getSigner() ;
        let nonce = await signer.getTransactionCount() ;
        nonce = '0x' + (nonce + 1).toString(16);
        
        let marketplaceContract =  new ethers.Contract(marketplace_address, marketplace_abi, signer) ;
        let rareContract = new ethers.Contract(rareContract_address, rareContract_abi, signer) ;
        let bidContract = new ethers.Contract(bidContract_address, bidContract_abi, signer) ;
        let _bid = await bidContract.fetchBid(Number(bid_id)) ;
        let _rare = await rareContract.fetchRare(Number(_bid.nft_id)) ;

        let erc20Token_address = await marketplaceContract.fetchUnitById(Number(_rare.bid_unit.toString())) ;
        let erc20TokenContract = new ethers.Contract(erc20Token_address , erc20Token_abi, signer) ;

        let balance = await erc20TokenContract.balanceOf(_bid.to) ;

        if(Number(ethers.utils.formatUnits(balance.toString(), 'ether')) < ethers.utils.formatUnits(_bid.price.toString(), 'ether') ) {
            return 'Inffucient ' + getUnit(Number(_rare.bid_unit.toString())) + " Balance";
        }
        
        let tx = await marketplaceContract.acceptBid(Number(bid_id), { nonce : nonce }) ;
        await tx.wait() ;

        return 200 ;
    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;
    }
}

export const DenyBid = async (web3Provider, bid_id) => {
    try {
        const signer = web3Provider.getSigner() ;
        let nonce = await signer.getTransactionCount() ;
        nonce = '0x' + (nonce + 1).toString(16);

        let bidContract =  new ethers.Contract(bidContract_address, bidContract_abi, signer) ;

        let tx = await bidContract.denyBid(Number(bid_id), { nonce : nonce }) ;

        await tx.wait() ;

        return 200 ;
    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;
    }
}

export const Payment = async (web3Provider, to, price, price_unit) => {
    try {

        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let nonce = await signer.getTransactionCount() ;
        let nonce_1 = '0x' + (nonce + 1).toString(16);
        let nonce_2 = '0x' + (nonce + 2).toString(16);

        let marketplaceContract = new ethers.Contract(marketplace_address, marketplace_abi, signer) ;

        let erc20Token_address = await marketplaceContract.fetchUnitById(Number(price_unit)) ;
        let erc20TokenContract = new ethers.Contract(erc20Token_address , erc20Token_abi, signer) ;

        let balance = await erc20TokenContract.balanceOf(address) ;
        if(Number(ethers.utils.formatUnits(balance.toString(), 'ether')) < Number(price)) {
            return 'Inffucient ' + getUnit(price_unit) + " Balance";
        }

        let tx = await erc20TokenContract.approve(marketplace_address, ethers.utils.parseUnits(price.toString()).toString(), {nonce : nonce_1 }) ;
        await tx.wait() ;

        tx = await marketplaceContract.payment(to, ethers.utils.parseUnits(price.toString(), 'ether') , Number(price_unit) ,{nonce : nonce_2}) ;
        await tx.wait() ;

        return 200 ;

    } catch(err) {
        return err?.data?.message ? err?.data?.message?.replace('VM Exception while processing transaction: revert ', '') : "You denied transaction signature" ;
    }
}