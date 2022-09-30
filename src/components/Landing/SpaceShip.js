import React from 'react';

import EARTH_IMAGE from '../../assets/SpaceShip/earth.png';
import ENIGMA_IMAGE from '../../assets/SpaceShip/enigma.png';
import COURSES_IMAGE from '../../assets/SpaceShip/courses.png';
import CIRCLE_IMAGE from '../../assets/SpaceShip/circle.png';
import BOARD_IMAGE from '../../assets/SpaceShip/board.png';
import LAUNCH_IMAGE from '../../assets/SpaceShip/launch.png';
import MINT_IMAGE from '../../assets/SpaceShip/mint.png';
import USERS_IMAGE from '../../assets/SpaceShip/users.png';

import {
    Box,
    useMediaQuery
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {

    },
    title : {
        fontSize : '64px',
        fontWeight : 'bold',
        color : '#338BEF',
        marginBottom : '200px',
        paddingLeft : '100px',
        ['@media (max-width : 1000px)'] : {
            fontSize : '45px',
            textAlign : 'center',
            marginBottom : '100px',
            paddingLeft : '0px',
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '30px',
            padding : '20px',
            marginBottom : '50px',
        }
    },
    earth : {
        position : 'relative',
        backgroundImage : `url(${EARTH_IMAGE})`,
        backgroundSize : '100% 100%',
        height : '1900px',
        padding : '60px',
        ['@media (max-width : 1500px)'] : {
            height : '1400px',
        },
        ['@media (max-width : 1000px)'] : {
            height : '1800px',
            backgroundSize : 'unset',
            objectFit : 'cover',
            padding : '30px',
        },
        ['@media (max-width : 600px)'] : {
            height : '1300px',
        },
        ['@media (max-width : 400px)'] : {
            height : '1200px',
        },
    },
    enigma : {
        fontSize : '32px',
        marginLeft : '50%',
        display : 'flex',
        alignItems : 'center',
        marginBottom : '50px',
        ['@media (max-width : 1500px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            display : 'block',
            width : '80%',
            marginLeft : '10%',
            marginBottom : '300px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '18px',
            textAlign : 'center',
            marginBottom : '200px'
        },
    },
    enigmaImage : {
        marginRight : '50px',
        width : '200px',
        ['@media (max-width : 1000px)'] : {
            marginLeft : 'calc(50% - 100px)',
        },
        ['@media (max-width : 400px)'] : {
            width : '150px',
            marginLeft : 'calc(50% - 75px)',
        }
    },
    courses : {
        marginTop : -280,
        fontSize : '32px',
        width : '500px',
        height : '300px',
        ['@media (max-width : 1500px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            marginTop : -100,
            width : '400px',
            height : '200px',
            fontSize : '18px'
        },
        ['@media (max-width : 600px)'] : {
            width : '300px',
            height : '200px',
            fontSize : '16px'
        },
        ['@media (max-width : 600px)'] : {
            width : '250px',
            height : '200px',
        }
    },
    coursesImage : {
        width : '100%',
        height : '100%'
    },
    users : {
        marginTop : '30px',
        marginLeft : '-60px',
        display : 'flex',
        alignItems : 'center',
        fontSize : '32px',
        ['@media (max-width : 1500px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            display : 'block',
            marginLeft : 0,
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '18px',
            textAlign : 'center'
        }
    },
    usersImage : {
        width : '60%',
        ['@media (max-width : 600px)'] : {
            width : '100%'
        }
    },
    board : {
        position : 'relative',
        width : '70%',
        height : '650px',
        marginTop : 100,
        left : 0,
        ['@media (max-width : 1000px)'] : {
            left : '10%',
            width : '80%',
            height : '500px'
        },
        ['@media (max-width : 800px)'] : {
            left : '5%',
            width : '90%',
            height : '400px'
        },
        ['@media (max-width : 600px)'] : {
            height : '300px'
        },
        ['@media (max-width : 500px)'] : {
            height : '250px'
        }
    },
    boardImage : {
        width : '100%',
        height : '100%'
    },
    mintImage : {
        position : 'absolute',
        top : 30,
        left : '30%',
        ['@media (max-width : 800px)'] : {
            width : '200px'
        },
        ['@media (max-width : 600px)'] : {
            width : '150px'
        }
    },
    launchImage : {
        position : 'absolute',
        top : 0,
        left : 100,
        ['@media (max-width : 1000px)'] : {
            left : 30,
        },
        ['@media (max-width : 800px)'] : {
            width : '100px',
            top : 30,
        },
        ['@media (max-width : 600px)'] : {
            width : '60px',
            top : 10,
        },
        ['@media (max-width : 400px)'] : {
            left : 15,
        }
    },
    boardText : {
        position : 'absolute',
        top : '30%',
        left : '30%',
        width : '520px',
        fontSize : '35px',
        fontWeight : 'bold',
        ['@media (max-width : 1600px)'] : {
            top : '35%',
            left : '25%',
            fontSize : '30px'
        },
        ['@media (max-width : 1500px)'] : {
            left : '35%',
            width : '350px',
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            width : '35%',
            fontSize : '18px'
        },
        ['@media (max-width : 800px)'] : {
            fontSize : '16px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '10px'
        },
        ['@media (max-width : 400px)'] : {
            fontSize : '8px'
        }
    },
    circle : {
        position : 'absolute',
        top : 500,
        right : 200,
        width : '500px',
        ['@media (max-width : 1500px)'] : {
            top : 400,
            right : 100,
        },
        ['@media (max-width : 1000px)'] : {
            top : 1200,
            left : '15%',
            width : '60%',
            fontSize : '24px'
        },
        ['@media (max-width : 600px)'] : {
            top : 800,
            left : '15%',
            width : '60%',
            fontSize : '24px'
        }
    }
}))

const SpaceShip = () => {

    const classes = useStyles();

    const match = useMediaQuery('(min-width : 1000px)');
    
    return(
        <Box className={classes.root}>
            <Box className={classes.title}>
                Next-Level Monetization Opportunities
            </Box>
            <Box className={classes.enigma}>
                <Box component={'img'} src={ENIGMA_IMAGE} className={classes.enigmaImage} />
                <Box>
                    SOLS provides a central point of control to solidify out-of-network online product distribution. End-to-end visibility for every uploaded file. 
                </Box>
            </Box>
            <Box className={classes.earth}>
                <Box className={classes.courses}>
                    <Box>
                        Connect all your distribution channels from one place. 
                    </Box>
                    <Box component={'img'} src={COURSES_IMAGE} className={classes.coursesImage} />
                </Box>
                <Box className={classes.users}>
                    <Box component={'img'} src={USERS_IMAGE} className={classes.usersImage}/>
                    <Box>
                    Take your products deeper into consumer networks with automated “royalty” affilate marketing contracts.
                    </Box>
                </Box>
                <Box className={classes.board}>
                    <Box component={'img'} src={MINT_IMAGE} className={classes.mintImage}/>
                    <Box component={'img'} src={LAUNCH_IMAGE} className={classes.launchImage}/>
                    <Box component={'img'} src={BOARD_IMAGE} className={classes.boardImage}/>
                    <Box className={classes.boardText}>
                        Use NFTs to drive your products across the map. Unlock your own AirDrop with SOLS today! 
                    </Box>
                </Box>
                <Box component={'img'} src={CIRCLE_IMAGE} className={classes.circle}/>
            </Box>
        </Box>
    )
}

export default SpaceShip;