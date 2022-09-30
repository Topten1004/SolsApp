import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    upload : {
        documentFiles : null ,
        videoFiles : null,
        imageFiles : null,
        audioFiles : null,
        videoTotalSize : 0,
        documentTotalSize : 0,
        audioTotalSize : 0,
        imageTotalSize : 0
    },
    purchase : {
        documentFiles : null ,
        videoFiles : null,
        imageFiles : null,
        audioFiles : null,
        videoTotalSize : 0,
        documentTotalSize : 0,
        audioTotalSize : 0,
        imageTotalSize : 0
    }
}

export default function cloud(state=INITIAL_STATE, action) {
    switch(action.type) {
        // case ActionTypes.DocumentFiles :
        //     return ({
        //         ...state,
        //         documentFiles : action.payload
        //     })
        // case ActionTypes.VideoFiles : 
        //     return ({
        //         ...state,
        //         videoFiles : action.payload
        //     })
        // case ActionTypes.AudioFiles :
        //     return ({
        //         ...state,
        //         audioFiles : action.payload
        //     })
        // case ActionTypes.ImageFiles : 
        //     return ({
        //         ...state,
        //         imageFiles : action.payload
        //     })
        case ActionTypes.CloudUploadFiles: 
            return ({
                ...state,
                upload : {
                    imageFiles : action.payload.imageFiles,
                    videoFiles : action.payload.videoFiles,
                    audioFiles : action.payload.audioFiles,
                    documentFiles : action.payload.documentFiles,

                    videoTotalSize : action.payload.videoTotalSize,
                    imageTotalSize : action.payload.imageTotalSize,
                    documentTotalSize : action.payload.documentTotalSize,
                    audioTotalSize : action.payload.audioTotalSize
                }
            });
        case ActionTypes.CloudPurchaseFiles: 
            return ({
                ...state,
                purchase : {
                    imageFiles : action.payload.imageFiles,
                    videoFiles : action.payload.videoFiles,
                    audioFiles : action.payload.audioFiles,
                    documentFiles : action.payload.documentFiles,

                    videoTotalSize : action.payload.videoTotalSize,
                    imageTotalSize : action.payload.imageTotalSize,
                    documentTotalSize : action.payload.documentTotalSize,
                    audioTotalSize : action.payload.audioTotalSize
                }
            })
        default :
            return state ;
    }
}