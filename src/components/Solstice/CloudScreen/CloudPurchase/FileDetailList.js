import * as React from 'react' ;

import { bytesToSize } from '../../../../utils/Helper';

import Loading from 'react-loading-components' ;
import FileInformation from './FileInformation';

import VideoImage from '../../../../assets/cloud/Video.jpg' ;
import GalaryImage from '../../../../assets/cloud/Image.png' ;
import PdfImage from '../../../../assets/cloud/Pdf.png' ;
import WordImage from '../../../../assets/cloud/Word.png' ;

import {
    Box,
    Grid,
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow, 
    TableCell,
    TableFooter,
    TablePagination,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        border : '1px solid '+theme.palette.blue.A100+' !important', borderRadius : '15px !important',
        backgroundColor : theme.palette.blue.A200,
        padding : '10px !important',

        "& .MuiTableContainer-root" : {
            maxHeight : '900px !important',
            "&::-webkit-scrollbar-thumb" : {
                backgroundColor : "#538f815c" ,
                borderRadius : "5px"
            } ,
            "&::-webkit-scrollbar-track" : {
                backgroundColor : "#538f815c" ,
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            "&::-webkit-scrollbar":{
                width : "10px",
                height : '10px',
                cursor : 'pointer !important'
            } ,
        },
        "& .MuiTable-root" : {
            minWidth : 650,
            borderCollapse: 'separate !important',
            borderSpacing: '0 10px',
            "& .MuiTableCell-root" : {
                color : theme.palette.green.A200,
            }
        },
        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                fontSize : '15px',
                textAlign : 'center !important',
                "&:first-child": {
                    textAlign : 'left !important'
                },
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root" : {
                cursor : 'pointer',
                "&:hover" : {
                    background : theme.palette.blue.A300 + ' !important'
                }
            },
            "& .MuiTableCell-root" : {
                borderBottom : '1px solid gray !important',
                borderTop : '1px solid gray !important',
                marginBottom : '10px !important',
                fontSize : '15px',
                textAlign : 'center !important',
                "&:first-child": {
                    borderLeft  :'1px solid gray',
                    borderBottomLeftRadius : '10px !important', borderTopLeftRadius : '10px !important',
                },
                "&:last-child": {
                    borderRight  :'1px solid gray',
                    borderBottomRightRadius : '10px !important', borderTopRightRadius : '10px !important',
                },
            }
        },
        "& .MuiTableFooter-root" : {
            "& .MuiTablePagination-root" : {
                color : theme.palette.green.A200 + " !important",
                "& svg" : {
                    color : theme.palette.green.A200
                }
            },
            "& .MuiTablePagination-spacer" : {
                "-webkit-flex" : 'none !important',
                flex : 'none !important'
            },
            "& .MuiInputBase-input" : {
                color : theme.palette.green.A200 + " !important",
            },
            "& .MuiTablePagination-toolbar" : {
            },
        }
    },
    paper : {
        backgroundColor : theme.palette.blue.main + ' !important',
        "& .MuiList-root" : {
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : theme.palette.blue.A300 + " !important",
            color : theme.palette.green.A200 + " !important",
        },
    },
})) ;

const FileDetailList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const match1190 = useMediaQuery('(min-width : 1190px)') ;

    const {
        fileList,
        searchStr,
        viewFileList,
    } = props ;

    const headFields = [
        "Name",
        "Size",
        "Upload Date",
        "File Type"
    ]

    const [fileIndex, setFileIndex] = React.useState(0) ;
    const [filterFileList, setFilterFileList] = React.useState([]) ;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSelectFile = (fileIndex) => {
        setFileIndex(fileIndex) ;
    }

    React.useEffect(() => {
        if(fileList) {
            setPage(0) ;

            let temp = [...fileList?.filter(file => file.name.toLowerCase().search(searchStr.toLowerCase()) >= 0 
                && (viewFileList === 'recent' ? new Date().getTime() - file.created_at.toDate().getTime() < 24*60*60*1000*2 : true
                    ))] ;

            setFilterFileList(temp) ;
        }
    }, [searchStr, viewFileList, fileList]) ;

    return (
        <Grid container>
            <Grid item xs={match1190 ? 8 : 12} className={classes.root}>
                <TableContainer sx={{paddingRight:"5px"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    headFields.map((field, index) => {
                                        return (
                                            <TableCell key={index}>{ field }</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                fileList ? (
                                    fileList.length ? 
                                        filterFileList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((file, index) => {
                                            return(
                                                <TableRow key={index} onClick={() => handleSelectFile(page * rowsPerPage + index)} sx={{background : page * rowsPerPage + index === fileIndex && theme.palette.blue.A200}}>
                                                    <TableCell>
                                                        <Box sx={{display : 'flex', alignItems :'center', gap : '10px'}}>
                                                            {
                                                                file.category === 'video' && <img src={VideoImage} width={30} style={{borderRadius : '50%'}}/>
                                                            }
                                                            {
                                                                file.category === 'image' && <img src={GalaryImage} width={30} />
                                                            }
                                                            {
                                                                file.category === 'pdf' && <img src={PdfImage} width={30} />
                                                            }
                                                            {
                                                                file.category === 'vnd.openxmlformats-officedocument.wordprocessingml.document' && <img src={WordImage} width={40} />
                                                            }
                                                            {file.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >{bytesToSize(file.size)}</TableCell>
                                                    <TableCell>{file.created_at.toDate().toLocaleDateString()}</TableCell>
                                                    <TableCell sx={{textTransform : 'capitalize !important'}}>
                                                        {
                                                            file.category === 'vnd.openxmlformats-officedocument.wordprocessingml.document' ? "Docx" :file.category
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    : <TableRow  >
                                        <TableCell colSpan={4} >There aren't any files.</TableCell>
                                    </TableRow>
                                ) : 
                                <TableRow  >
                                    <TableCell colSpan={4} >
                                        <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    labelRowsPerPage={"Files per page"}
                                    count={
                                        fileList 
                                        ? filterFileList.length
                                        : 0
                                    }
                                    SelectProps={{
                                        MenuProps : {
                                            classes : {
                                                paper :  classes.paper
                                            }
                                        }
                                    }}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />    
                            </TableRow>
                        
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={match1190 ? 4 : 12} sx={{color : theme.palette.blue.A100, padding : match1190 ? '20px' : '5px', display : !fileList?.length && 'none', marginTop : '20px'}}>
                <FileInformation
                    fileInfo={filterFileList?.[fileIndex]}
                />
            </Grid>
        </Grid>
    )
}

export default FileDetailList ;