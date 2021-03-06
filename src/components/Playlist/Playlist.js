import React, { Component } from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  PlayButton,
  PrevButton,
  NextButton,
  Progress,
  Timer,
  VolumeControl,
} from 'react-soundplayer/components';
import styled from 'styled-components';

const PlaylistWrapper = styled.div`
  .player {
    margin-top: 30px;
  }

  .header {
    padding: 0 10px;
    font-weight: 100;
  }

  .trackButton {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    width: 100%;
    font-size: 1em;
    padding: 1rem;
    margin: 0;
    height: auto;
    vertical-align: middle;
    border-radius: 3px;
    opacity: 0.6;
    box-sizing: border-box;
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
  }

  .trackButtonInnerFlex {
    display: flex;
  }

  .trackButton:hover {
    opacity: 1;
  }

  .trackButtonActive {
    opacity: 1;
  }

  .trackButtonTitle {
    margin-right: 10px;
  }

  .trackList {
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
    opacity: 0;
    visibility: hidden;
  }

  .trackListShow {
    opacity: 1;
    visibility: visible;
  }

  .currentTrack {
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    transition: opacity 0.5s;
    opacity: 0;
    visibility: hidden;
  }

  .currentTrackShow {
    opacity: 1;
    visibility: visible;
  }

  .playbackControls {
    display: flex;
    max-width: 400px;
    justify-content: space-between;
  }

  .playbackProgress {
    padding: 0 10px;
    max-width: 378px;
    margin-top: 20px;
  }

  .controlButton {
    padding: 10px;
    background-color: transparent;
    text-decoration: none;
    border: 0;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  .playButton {
    width: 38px;
  }

  .previousButton,
  .nextButton {
    width: 40px;
  }

  .progress {
    height: 10px;
    background: #ccc;
    align-self: center;
  }

  .progressInner {
    background: black;
    height: 100%;
  }

  .timer {
    text-align: left;
    margin: 20px 0;
    font-size: 12px;
  }

  .volumeButton button {
    width: 40px;
  }

  .volumeButton div {
    display: none;
  }

  /* TODO just apply this instead of classes */
  button {
    background-color: transparent;
    text-decoration: none;
    border: 0;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  @media (min-width: 768px) {
    .currentTrack {
      padding: 1rem;
    }

    .playbackProgress {
      display: flex;
      max-width: 500px;
      margin: 20px 40px 0 0;
      justify-content: space-between;
    }

    .progress {
      width: 300px;
    }

    .timer {
      margin: 0;
      text-align: left;
    }

    .trackList {
      padding: 0 10px;
    }
  }
`;

class PlaylistSoundPlayer extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
    };
  }

  playTrackAtIndex(playlistIndex) {
    // eslint-disable-next-line react/prop-types
    const { soundCloudAudio } = this.props;

    this.setState({ activeIndex: playlistIndex });
    soundCloudAudio.play({ playlistIndex });
  }

  nextIndex() {
    // eslint-disable-next-line react/prop-types
    const { playlist } = this.props;
    const { activeIndex } = this.state;

    if (activeIndex >= playlist.tracks.length - 1) {
      return;
    }

    if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: activeIndex + 1 });
    }
  }

  prevIndex() {
    const { activeIndex } = this.state;

    if (activeIndex <= 0) {
      return;
    }

    if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: activeIndex - 1 });
    }
  }

  renderTrackList() {
    const { playlist } = this.props;

    const componentClasses = ['trackList'];

    if (playlist) {
      componentClasses.push('trackListShow');
    }

    const tracks = playlist && playlist.tracks && playlist.tracks.map((track, i) => {
      // eslint-disable-next-line
      const isActive = this.props.soundCloudAudio._playlistIndex === i;
      // eslint-enable
      const className = isActive
        ? 'trackButton trackButtonActive'
        : 'trackButton';

      return (
        <button
          key={track.id}
          className={className}
          onClick={e => this.playTrackAtIndex(i, e)}
        >
          <div className="trackButtonInnerFlex">
            <span className="trackButtonTitle">{track.title}</span>
            <span className="trackButtonTime">{Timer.prettyTime(track.duration / 1000)}</span>
          </div>
        </button>
      );
    });

    return (
      <div className={componentClasses.join(' ')}>{tracks}</div>
    );
  }

  renderTrackInfo() {
    // eslint-disable-next-line react/prop-types
    const { playlist, currentTime, duration } = this.props;
    const componentClasses = ['currentTrack'];
    const previousButtonClass = 'controlButton previousButton';
    const nextButtonClass = 'controlButton nextButton';
    const playButtonClass = 'controlButton playButton';
    const volumeButtonClass = 'controlButton volumeButton';
    const progressClass = 'progress';
    const progressInnerClass = 'progressInner';
    const timerClass = 'timer';
    const headerClass = 'header';

    if (playlist) {
      componentClasses.push('currentTrackShow');
    }

    return (
      <div className={componentClasses.join(' ')}>
        <h2 className={headerClass}>{playlist ? playlist.title : ''}</h2>
        <div>
          <div className="playbackControls">
            <PrevButton
              className={previousButtonClass}
              onPrevClick={() => this.prevIndex()}
              {...this.props}
            />
            <PlayButton
              className={playButtonClass}
              {...this.props}
            />
            <NextButton
              className={nextButtonClass}
              onNextClick={() => this.nextIndex()}
              {...this.props}
            />
            <VolumeControl
              className={volumeButtonClass}
              {...this.props}
            />

          </div>
          <div className="playbackProgress">
            <Progress
              className={progressClass}
              innerClassName={progressInnerClass}
              value={(currentTime / duration) * 100 || 0}
              {...this.props}
            />
            <div className={timerClass}>
              <Timer duration={duration || 0} currentTime={currentTime} {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <PlaylistWrapper>
        <div className="player">
          {this.renderTrackInfo()}
          {this.renderTrackList()}
        </div>
      </PlaylistWrapper>
    );
  }
}

export default withSoundCloudAudio(PlaylistSoundPlayer);
