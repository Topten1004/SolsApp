import * as React from 'react' ;

import TweetImage from '../../../../assets/socials/Tweet.svg' ;
import FaceBookImage from '../../../../assets/socials/FaceBook.svg' ;
import RedditImage from '../../../../assets/socials/Reddit.svg' ;
import WhatsAppImage from '../../../../assets/socials/WhatsApp.svg' ;

import { 
    Box
} from '@mui/material';

const Socials = () => {
    return (
        <Box sx={{display : 'flex', gap : '40px', flexWrap : 'wrap'}}>
            <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                <img src={TweetImage} />
                <Box sx={{color : "#1DA1F2"}}>Twitter</Box>
            </Box>
            <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                <img src={FaceBookImage} />
                <Box sx={{color : "#1877F2"}}>FaceBook</Box>
            </Box>
            <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                <img src={RedditImage} />
                <Box sx={{color : "#FF4500"}}>Reddit</Box>
            </Box>
            <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                <img src={WhatsAppImage} />
                <Box sx={{color : "#25D366"}}>WhatsApp</Box>
            </Box>
        </Box>
    )
}

export default Socials ;