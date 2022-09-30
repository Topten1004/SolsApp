import * as React from 'react' ;

class CanvasVideo extends React.Component {
    componentDidMount () {
      var { src } = this.props;
      if (src) {
        // Create the video element.
        var video = document.createElement('video');
        // Set the source for the video defined
        // in the given props.
        if (src.length) {
          for (let i = 0; i < src.length; i++) {
            let source = src[i];
            let vidSrc = document.createElement('source');
            vidSrc.src = source.src;
            vidSrc.type = source.type;
            video.appendChild(vidSrc);
          }
        } else if (src.src && src.type) {
          video.src = src.src;
          video.type = src.type;
        }
        if (this.props.loop) {
          video.loop = 'loop';
        }
        if (this.props.muted) {
          video.muted = 'muted';
        }
        // Set the size for the video, and position it off
        // screen before adding it to the DOM.
        video.height = this.props.height;
        video.style.left = '-1000%';
        video.style.position = 'absolute';
        video.style.top = '-1000%';
        video.width = this.props.width;
        document.body.appendChild(video);
        // Get the 2D context of the canvas.
        this.context = this.refs.canvas.getContext('2d');
        this.setState({ video });
        // Wait for the next thread before calling to
        // setup the video event listeners.
        setTimeout(() => {
          this.setupListeners();
        }, 0);
      }
    }
    componentWillUnmount () {
      const { video } = this.state;
      this.unmounted = true;
      // Make sure to remove all event listeners as well.
      this.setupListeners(true);
      // If the video element still exists, make sure we do a
      // proper garbage collection and remove it from the DOM.
      // This needs to happen AFTER the event listeners have
      // been removed.
      if (video) {
        video.parentNode.removeChild(video);
      }
    }
    constructor (props) {
      super(props);
      this.context = null;
      this.frameRate = 60;
      // Setup handles to methods that are bound to
      // the current context.
      this.handleAnimationFrame = this.onAnimationFrame.bind(this);
      this.handleEnded = this.onEnded.bind(this);
      this.handleLoadedMetaData = this.onLoadedMetaData.bind(this);
      this.handleWindowResize = this.onWindowResize.bind(this);
      this.pause = this.pause.bind(this);
      this.play = this.play.bind(this);
      // Setup the default state.
      this.state = {
        mobile: this.isMobile(),
        playing: false,
        video: null
      };
      this.timestamp = null;
      this.unmounted = false;
    }
    isMobile () {
      // TODO: Remove the "return true;" statement.
      return true;
      return (window.innerWidth <= 768);
    }
    onAnimationFrame () {
      const { mobile, video } = this.state;
      const render = () => {
        // Draw the video to the canvas 2D context.
        if(this?.context) {
            this?.context?.drawImage(video, 0, 0, this.props.width, this.props.height);
        }
      };
      if (video) {
        // If currently running in the mobile version, the video won't actually
        // be playing but we will be advancing the "currentTime" property of the
        // video manually based on the set framerate.
        if (mobile) {
          let timestamp = Date.now();
          let elapsed = (timestamp - this.timestamp) / 1000;
          this.timestamp = timestamp;
          if (elapsed >= (1 / this.frameRate)) {
            if (video.currentTime >= video.duration) {
              if (this.props.loop) {
                video.currentTime = 0;
              } else {
                this.pause();
              }
            } else {
              video.currentTime = Math.min((video.currentTime + elapsed), video.duration);
            }
            render();
          }
        } else {
          render();
        }
        // If the video is still playing, request another animation frame.
        if (this.state.playing) {
          this.requestAnimationFrame();
        }
      }
    }
    onEnded (e) {
      if (!this.props.loop) {
        this.setState({ playing: false });
      }
    }
    onLoadedMetaData (e) {
      if (this.props.autoPlay) {
        this.play();
      }
    }
    onWindowResize (e) {
      const mobile = this.isMobile();
      // If going mobile, make sure the video is muted; otherwise
      // if we are coming back from mobile video reset the muted
      // to the original value.
      if (mobile && !this.state.mobile) {
        this.state.video.muted = 'muted';
      } else if (!mobile && this.state.mobile) {
        if (!this.props.muted) {
          this.state.video.muted = null;
        }
      }
      this.setState({ mobile });
    }
    pause () {
      const { mobile, video } = this.state;
      // If not running in the mobile version, we need
      // to pause the actual video.
      if (!mobile) {
        video.pause();
      }
      this.setState({ playing: false });
    }
    play () {
      const { mobile, video } = this.state;
      // If not running in the mobile version, we need
      // to play the actual video.
      if (!mobile) {
        video.play();
      }
      this.setState({ playing: true });
      // Track the current timestamp, and begin requesting
      // animation frames.
      this.timestamp = Date.now();
      this.requestAnimationFrame();
    }
    render () {
      return (
        <div className="CanvasVideo">
          <canvas
            height={this.props.height}
            ref="canvas"
            width={this.props.width}
          />
        </div>
      );
    }
    requestAnimationFrame () {
      // If the component hasn't unmounted, use "window.requestAnimationFrame" if available
      // or use timeouts if not available (mostly for IE9).
      if (!this.unmounted) {
        if (typeof window.requestAnimationFrame == 'function') {
          window.requestAnimationFrame(this.handleAnimationFrame);
        } else {
          setTimeout(() => {
            this.handleAnimationFrame();
          }, 5);
        }
      }
    }
    setupListeners (remove) {
      const { video } = this.state;
      // Remove the event listeners if the "remove" parameter is true, or if the
      // component has been unmounted. Otherwise add the event listeners.
      if (remove || this.unmounted) {
        video.removeEventListener('ended', this.handleEnded);
        video.removeEventListener('loadedmetadata', this.handleLoadedMetaData);
        window.removeEventListener('resize', this.handleWindowResize);
      } else {
        video.addEventListener('ended', this.handleEnded);
        video.addEventListener('loadedmetadata', this.handleLoadedMetaData);
        window.addEventListener('resize', this.handleWindowResize);
      }
    }
  }

  export default CanvasVideo ;