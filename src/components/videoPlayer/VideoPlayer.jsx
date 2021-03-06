import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CircularProgress } from '@material-ui/core';
import { formatSource } from '../../utils';
import styles from './styles';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.video = null;
  }

  state = {
    loading: false
  };
  pause = () => {
    this.video.pause();
  };

  play = () => {
    this.video.play();
  };

  load = () => {
    this.video.load();
  };

  hasEnded = () => {
    if (this.props.nextClip) {
      const clipFormatted = formatSource(
        this.props.nextClip.startTime,
        this.props.nextClip.endTime
      );
      this.video.src = clipFormatted;
      this.props.OnUpdateNextClip(this.props.nextClip.id);
      this.video.play();
    }
  };

  onWaiting = () => {
    this.setState({ loading: true });
  };

  onPlaying = () => {
    this.setState({ loading: false });
  };

  onLoadedData = () => {
    this.setState({ loading: false });
  };
  onPause = () => {
    if (this.props.nextClip) {
      const clipFormatted = formatSource(
        this.props.nextClip.startTime,
        this.props.nextClip.endTime
      );

      this.props.OnUpdateNextClip(this.props.nextClip.id);
      setTimeout(() => {
        this.video.src = clipFormatted;
        this.video.play();
      }, 3000);
    }
  };

  renderSpinner = () => {
    const { classes } = this.props;
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress size={192} className={classes.progress} />
      </div>
    );
  };

  render() {
    const {
      props: { classes, source },
      state: { loading },
      renderSpinner,
      onLoadedData,
      onPlaying,
      onWaiting,
      hasEnded,
      onPause
    } = this;
    return (
      <Card className={classes.card}>
        <video
          width="100%"
          height="400px"
          controls
          autoPlay
          muted
          src={source}
          ref={c => {
            this.video = c;
          }}
          onEnded={hasEnded}
          onWaiting={onWaiting}
          onPlaying={onPlaying}
          onLoadedData={onLoadedData}
          onPause={onPause}
        />
        {loading && renderSpinner()}
      </Card>
    );
  }
}

VideoPlayer.propTypes = {
  source: PropTypes.string
};

export default withStyles(styles)(VideoPlayer);
