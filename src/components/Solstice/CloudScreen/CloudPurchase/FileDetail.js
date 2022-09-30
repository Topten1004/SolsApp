import * as React from 'react' ;

import {
    Box
} from '@mui/material' ;

import {makeStyles} from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {

    },
    infoDiv : {
        display : 'flex', flexDirection : 'column', gap : '10px'
    }
}))
 const FileDetail = (props) => {
    const classes = useStyles() ;

    const {
        fileDetailInfo
    } = props ; 

    return (
        <Box className={classes.root}>
            {
               fileDetailInfo?.price_type === 'legendary' && <Box className={classes.infoDiv}>
                    <Box>
                        Price per product: {fileDetailInfo?.product_price}usd
                    </Box>
                    <Box>
                        Price per ticket : {fileDetailInfo?.resell_price}
                    </Box>
                    <Box>
                        # of tickets available: {fileDetailInfo?.resell_count}
                    </Box>
                    <Box>
                        Royalty: {fileDetailInfo?.royalty_fee}%
                    </Box>
                </Box>
            }
            {
               fileDetailInfo?.price_type === 'rare' && <Box className={classes.infoDiv}>
                    <Box>
                        Minimum Bidding: {fileDetailInfo?.minimum_bidding}usd
                    </Box>
                    <Box>
                        Royalty: {fileDetailInfo?.royalty_fee}%
                    </Box>
                    <Box>
                        Avaliable Items: {fileDetailInfo?.available_items}
                    </Box>
                    <Box>
                        Listing Time Frame : 
                        &nbsp;{fileDetailInfo?.listing_time.from.year}.
                        {fileDetailInfo?.listing_time.from.month}.
                        {fileDetailInfo?.listing_time.from.day}&nbsp;-&nbsp; 
                        {fileDetailInfo?.listing_time.to.year}.{fileDetailInfo?.listing_time.to.month}.{fileDetailInfo?.listing_time.to.day} 
                    </Box>
                </Box>
            }
            {
               fileDetailInfo?.price_type === 'bundle' && <Box className={classes.infoDiv}>
                    <Box>
                        Price per subscription: {fileDetailInfo?.subscription_price}usd
                    </Box>
                    <Box>
                        Payment: {fileDetailInfo?.payment_method}
                    </Box>
                    <Box>
                        Release Date : {fileDetailInfo?.release_date}
                    </Box>
                    <Box>
                        Distribution Schedule: {fileDetailInfo?.distribution_schedule}
                    </Box>
                </Box>
            }
            {
               fileDetailInfo?.price_type === 'free' && <Box className={classes.infoDiv}>
                    <Box>
                        Release Date : {fileDetailInfo?.release_date}
                    </Box>
                    <Box>
                        Distribution Schedule: {fileDetailInfo?.distribution_schedule}
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default FileDetail ;