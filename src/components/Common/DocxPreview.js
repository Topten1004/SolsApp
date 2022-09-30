import * as React from 'react' ;

import FileViewer from '@nuzz78/react-file-viewer' ;
import { CustomErrorComponent } from 'custom-error';

import WordImage from '../../assets/common/Word.png' ;

import { v4 as uuidv4 } from 'uuid';

import {
    Box 
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        paddingLeft : '0px !important',
        marginTop : '0px !important', marginBottom : '0px !important',
        whiteSpace: 'pre-wrap !important',
        fontFamily : 'Montserrat !important',
        fontSize : '15px !important',

        "& div" : {
            fontSize : '15px !important',
            margin : '5px !important',
            padding : '0px !important'
        },
        "& ol" : {
            fontSize : '15px !important',
            margin : '0px !important',
            marginLeft : '5px !important',
            padding : '0px !important',
            paddingLeft : '10px !important'
        },
        "& li" : {
            fontSize : '15px !important',
            margin : '5px !important',
            padding : '0px !important'
        },
        "& ul" : {
            fontSize : '15px !important',
            margin : '0px !important',
            marginLeft : '5px !important',
            padding : '0px !important',
            paddingLeft : '10px !important'
        },
        "& p" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h1" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h2" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h3" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h4" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h5" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& h6" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& span" : {
            fontSize : '15px !important',
            margin : '5px  !important',
            padding : '0px !important'
        },
        "& img" : {
            width : 30,
            height : 30
        },
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        height : props=> props.height,
        overflowX : 'hidden',
        color : 'black',
        
        "& #docx" : {
            maxWidth : props => props.width + 'px !important',
            maxHeight : props => props.height + 'px !important',
            margin : '0px !important'
        },
        "& .document-container" : {
            maxWidth : props => (props.width  - 10 )+ 'px !important',
            maxHeight : props => ( props.height - 10 ) + 'px !important',
            overflowY : 'scroll',
            boxSizing : 'border-box !important',
            background : 'none !important',
            overflowX : 'hidden',
            boxSizing : 'border-box',

            
            "&::-webkit-scrollbar-track" : {
                marginTop : '10px',
                marginBottom : '10px'
            },
          
        },
        "& .pg-viewer-wrapper" : {
            margin : '0px !important',
            padding : '0px !important',
            maxWidth : props => props.width + 'px !important',
            maxHeight : props => props.height + 'px !important',
            overflow : 'hidden'
        },
        "& .pg-viewer" : {
            margin : '0px !important',
            padding : '0px !important',
            maxWidth : props => props.width + 'px !important',
            maxHeight : props => props.height + 'px !important',
            overflow : 'hidden'
        },
    }
}))
const DocxPreview = (props) => {

    const {
        previewUrl,
        selfIndex,
        activeIndex,
        width,
        height
    } = props ;

    const classes = useStyles(props) ;
    const thisRef = React.useRef() ;

    const onError = (e) => {
        console.log(e) ;
    }

    return (
        <Box className={classes.root} key={uuidv4()} ref={thisRef} id={uuidv4()}>
        {
            previewUrl && (selfIndex === activeIndex) ? <FileViewer
                fileType={'docx'}
                filePath={previewUrl}
                errorComponent={CustomErrorComponent}
                onError={onError}
                key={uuidv4()}
            /> : <img src={WordImage} width={100} height={100}/>
        }
        </Box>
  );
} 

export default DocxPreview ;