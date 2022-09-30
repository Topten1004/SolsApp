import React, { useState, useEffect, useRef, createRef } from "react";
// import TuiImageEditor from "tui-image-editor";
// import FileSaver from "file-saver";

// import "tui-image-editor/dist/tui-image-editor.css";
// import "tui-color-picker/dist/tui-color-picker.css";

import CloseImage from '../../../assets/modals/CloseDark.svg' ;

import  {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    DialogActions,
    Button,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {

    },
    paper : {
        backgroundColor : '#23262F !important',
        borderRadius : '10px !important',
        
        "& .MuiDialogTitle-root" : {
            color : 'white',
            padding : '10px !important',
            fontFamily : 'Montserrat',
            display : 'flex', alignItems : 'center', justifyContent : 'space-between'
        },

        "& .MuiDialogContent-root" : {
            padding : '0px !important',
        },

        "& .MuiButtonBase-root" : {
            textTransform : 'capitalize !important',
            color : 'white',
            borderRadius : 20,
            width : 150,
            paddingLeft : 20, paddingRight : 20,
            "& svg" : {
                fontSize : '25px !important'
            }
        },

        // "& .tui-image-editor-main-container" : {
        //     backgroundColor : '#23262F !important'
        // },
        // "& .tui-image-editor-menu" : {
        //     backgroundColor : '#23262F !important'
        // },
        // "& .tui-image-editor-header" : {
        //     minWidth : '0px !important',
        //     marginTop : '10px',
        //     padding : '0px !important'
        // },
        // "& .tui-image-editor-help-menu" : {
        //     display : 'none !important'
        // },
        // "& .tui-image-editor-header-logo" : {
        //     display : "none !important",
        //     height : '0px !important',
        // },
        // "& .tie-crop-preset-button" : {
        //     display : 'none !important',
        //     height : '0px !important'
        // },
        // "& .tui-image-editor-menu-crop":{
        // },
        // "& .tui-image-editor-submenu-style" : {
        //     position : 'unset !important'
        // },
        // "& .tui-image-editor-header-buttons" : {
        //     float : 'none !important',
        //     display : 'none !important',
        //     height : '0px !important'
        //     // "& div" : {
        //     //     width: '100px', height: '40px',
        //     //     border : 'none !important'
        //     // },
        //     // "& button" : {
        //     //     width: '100px', height: '40px',
        //     //     background : '#3772FF !important',
        //     //     border : 'none !important'
        //     // }
        // },
        // "& .tui-image-editor-main" : {
        //     top : 0
        // },
        // "& .tui-image-editor-menu-crop" : {
        // },
        // "& .tui-image-editor-canvas-container" : {
        //     width : '300px !important',
        //     height : '250px !important',
        // }
    },
    lineDiv : {
        borderBottom : '2px solid gray',
    },
    descriptionDiv : {
        color : "#43D9AD"
    }
})) ;

const ImageEditorModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        
        path
    } = props ;

    // const editorProps = {
    //     includeUI: {
    //         menu: ["crop"],
    //         initMenu: "crop",
    //         uiSize: {
    //             width: "300px",
    //             height: "300px"
    //         },
    //         menuBarPosition: "bottom"
    //     },
    //     cssMaxWidth: 270,
    //     selectionStyle: {
    //       cornerSize: 20,
    //       rotatingPointOffset: 70
    //     }
    // };

    // const ImageEditor = (props) => {
    //     const rootEl = createRef();
    
    //     const [imageEditorInst, setImageEditorInst] = useState(null) ;
    
    //     useEffect(() => {
    //         return () => {
    //             imageEditorInst?.destroy() ;
    //             setImageEditorInst(null) ;
    //         }
    //     }, []);
    
    //     useEffect(() => {
    //         if(rootEl && !imageEditorInst) {
    //             setImageEditorInst(new TuiImageEditor(rootEl.current, {
    //                 ...props
    //             })) ;
    //         }
    //     }, [rootEl]) ;

    //     useEffect(() => {
    //         if(imageEditorInst) {
    //             imageEditorInst.loadImageFromURL(path, 'lena').then((sizeValue)=>{
    //                 console.log(sizeValue) ;
    //                 imageEditorInst.ui.activeMenuEvent();
    //                 imageEditorInst.ui.resizeEditor({imageSize: sizeValue});
    //                 console.log("Image allegedly loaded.")
    //             }).catch(e=>{
    //                 // console.error("Something went wrong:")
    //                 // console.error(e);

    //                 let canvasEl = document.getElementsByClassName("lower-canvas")[0]

    //                 const context = canvasEl.getContext('2d');
                    
    //                 const image = new Image();
    //                 image.src = path;
    //                 image.onload = () => {
    //                     context.drawImage(image, 0, 0, 350, 150);
    //                 };

    //                 imageEditorInst.ui.activeMenuEvent();
    //             })
    //         }
    //     }, [path, imageEditorInst]) ;
         
    //     return (
    //         <div ref={rootEl} ></div>
    //     )
    // }

    // const imgRef = useRef() ;
    const canvasRef = useRef(null) ;

    const handleDownload = () => {
        // let canvas = document.getElementsByClassName("lower-canvas")[0];
        // console.log(canvas) ;

        // canvas.toBlob(function(blob) {
        //     saveAs(blob, "pretty image.png");
        //     console.log(blob) ;
        // });
    }

    // useEffect(() => {
    //     console.log(canvasRef.current) ;
    //     if(canvasRef?.current) {
    //         const context = canvasRef.current.getContext('2d');

    //         const image = new Image();
    //         image.src = path;
    //         image.onload = () => {
    //           context.drawImage(image, 0, 0, 350, 150);
    //         };
    //     }
    // }, [canvasRef?.current, canvasRef]) ;


    // useEffect(() => {
    //     console.log(canvasRef.current) ;
    //     if(canvasRef?.current) {
    //         const context = canvasRef.current.getContext('2d');

    //         const image = new Image();
    //         image.src = path;
    //         image.onload = () => {
    //           context.drawImage(image, 0, 0, 350, 150);
    //         };
    //     }
    // }, []) ;

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    Edit Photo <img src={CloseImage} onClick={handleClose} style={{cursor : 'pointer'}}/>
                </DialogTitle>
                <DialogContent>
                    {/* <ImageEditor
                        {...editorProps}
                    /> */}
                    <canvas ref={canvasRef} width={350} height={150} style={{border : '1px solid red !important'}}/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' sx={{background : '#484C56 !important'}}>Cancel</Button>
                    <Button variant={'contained'} sx={{background : '#3772FF !important'}} onClick={handleDownload}>Done</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ImageEditorModal ;