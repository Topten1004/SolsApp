import * as React from 'react' ;


import Avatar1Image from '../../../../assets/minting/1.png';
import Avatar2Image from '../../../../assets/minting/2.png';
import Avatar3Image from '../../../../assets/minting/3.png';

import Product1Image from '../../../../assets/product_group/Image1.png' ;
import Product2Image from '../../../../assets/product_group/Image2.png' ;
import Product3Image from '../../../../assets/product_group/Image3.png' ;

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { EffectCube, Pagination } from "swiper";

import 'swiper/swiper.min.css';
import 'swiper/modules/effect-cube/effect-cube.min.css' ;

import {
    Grid,
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
       
    },
    productInfoCard : {
        border : '5px solid white',
        borderRadius : 25,

        width : 700,
        height : 400,

        marginTop : '20px',
        marginBottom : '20px',

        display : 'flex',

        "& .swiper" : {
            width: '150px',
            height: '200px',
            position: 'absolute',
        },
    },
    avatarDiv : {
        backgroundColor : 'black',
        
        width : 200,
        height : '100%',

        borderTopLeftRadius : 20,
        borderBottomLeftRadius : 20,

        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center',

        padding : 10
    },
    productInfoDiv : {
        backgroundColor : '#478AD7',
        
        width : 500,
        height : '100%',

        borderTopRightRadius : 20,
        borderBottomRightRadius : 20,

        padding : 10,

        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    slashDiv : {
        background : 'rgba(51, 139, 239, 0.21)',
        borderRadius : 20,

        marginTop : 20,
        padding : 20,

        width : 400,
    },
}));

const MintingPress = () => {
    const classes = useStyles() ;

    return (
        <>
            <Box className={classes.productInfoCard}>
                <Box className={classes.avatarDiv}>
                    <Box sx={{mt : '30px'}}>
                        <Box sx={{color  :'white', fontSize : 25, fontWeight : 'bold'}}>.mp4 file</Box>
                        <Box sx={{color  :'white', fontSize : 25, fontWeight : 'bold'}}>12/24</Box>
                    </Box>
                    <Box sx={{mb : '20px', display : 'flex', flexWrap : 'wrap', flexDirection :'row-reverse', gap : '20px', transform : 'rotate(180deg)'}}>
                        <img src={Avatar1Image} width={60} style={{transform : 'rotate(180deg)'}} />
                        <img src={Avatar2Image} width={60} style={{transform : 'rotate(180deg)'}}/>
                        <img src={Avatar3Image} width={60} style={{transform : 'rotate(180deg)'}}/>
                    </Box>
                </Box>
                <Box className={classes.productInfoDiv}>
                    <Box sx={{fontSize : 25, color : 'white', fontWeight : 'bold', fontFamily : 'Montserrat'}}>
                        Ebook 12 : Zero to One
                    </Box>
                    <Box className={classes.slashDiv}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//HOST ID : 983-4853JD</Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//Released: June 2022</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//Joined: June 2022</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//Relaxing-yourself</Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container sx={{mt : '20px', height : '200px'}}>
                        <Grid item xs={7} sx={{display : 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
                            <Box sx={{color :'#43D9AD', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontSize : 25, fontFamily : 'Bruno Ace'}}>
                                14 SOLS
                            </Box>
                            <Box>
                                <Box sx={{fontFamily : 'Montserrat', fontWeight : 'bold'}}>
                                    10.99USD/product x unlimited
                                </Box>
                                <Box sx={{fontFamily : 'Montserrat', fontWeight : 'bold'}}>
                                    70.00USD/ticket x 200
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Swiper
                                effect={"cube"}
                                grabCursor={true}
                                cubeEffect={{
                                slideShadows: true,
                                }}
                                pagination={true}
                                modules={[EffectCube, Pagination]}
                            >
                                <SwiperSlide>
                                    <img src={Product1Image} width={150} height={200}/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={Product2Image} width={150} height={200}/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={Product3Image} width={150} height={200}/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={Product1Image} width={150} height={200}/>
                                </SwiperSlide>
                            </Swiper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default MintingPress ; 