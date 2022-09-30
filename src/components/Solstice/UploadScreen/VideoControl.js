import * as React from 'react' ;

import format from 'format-duration' ;

const VideoControl = (props) => {
    
    const {
        videoPreview,
        videoIndex,
        fileType,

        handleChangeDuration,
    } = props ;

    const [format_duration, setFormatDuration] = React.useState(null) ;
    const [duration, setDuration] = React.useState(null) ;

    const videoRef = React.useRef() ;

    const handleLoadedMetadata = () => {
        const video = videoRef.current ;

        if(!video) return ;

        setFormatDuration(format(video.duration * 1000)) ;
        setDuration(video.duration) ;
    }

    React.useEffect(() => {
        if(format_duration && duration) {
            handleChangeDuration(videoIndex, format_duration, duration, fileType) ;
        }
    }, [format_duration, duration]) ;

    return (
        <>
            <video src={videoPreview} ref={videoRef} onLoadedMetadata={handleLoadedMetadata} width={270} height={400} controls/>
        </>
    )
}

export default VideoControl ;