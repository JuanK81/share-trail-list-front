import { useState } from 'react';

import Container from './ui/Container';

import handleTrack from '../helpers/handleTrack';

const DisplayStats = ({ track, trail, type, className, children }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDetailHandler = () => {
    setShowDetails(!showDetails);
  };

   const activityTypeHandler = (act) => {
     if (act === 0) {
       return 'All';
     } else if (act === 1) {
       return 'MTB';
     } else if (act === 2) {
       return 'Hiking';
     } else if (act === 3) {
       return 'Running';
     } else {
       return '';
     }
   };

   const difficultyTypeHandler = (dif) => {
     if (dif === 0) {
       return 'All';
     } else if (dif === 1) {
       return 'Easy';
     } else if (dif === 2) {
       return 'Medium';
     } else if (dif === 3) {
       return 'Hard';
     } else if (dif === 4) {
       return 'Expert';
     } else {
       return '';
     }
   };

  if (!track.type || !type) {
    return (
      <>
        <Container className="display-stats">
          {<h2 className="display-stats_title">WAITING FOR STATS...</h2>}
        </Container>
      </>
    );
  }
  const trackStats = { ...handleTrack(track) };
  const { complete, segments } = trackStats;
  const { elevation, heartRate, distance, time } = complete;
  return (
    <>
      <Container className={`display-stats ${className}`}>
        <h2 className="display-stats_title" onClick={showDetailHandler}>
          {!showDetails ? 'DISPLAY STATS' : 'HIDE STATS'}
        </h2>
        <br />
        {trail && trail.activity && trail.difficulty && showDetails && (
          <>
            {/* <p className="display-stats_field">creator: {trail.creator}</p> */}
            <p className="display-stats_field">
              activity: {activityTypeHandler(trail.activity)}
            </p>
            <p className="display-stats_field">
              difficulty: {difficultyTypeHandler(trail.difficulty)}
            </p>
          </>
        )}
        {elevation.elevationGain && showDetails && (
          <p className="display-stats_field">
            elevation: {elevation.elevationGain}m
          </p>
        )}
        {heartRate.averageHeartRate && showDetails && (
          <>
            <p className="display-stats_field">
              max. heart rate: {heartRate.maxHeartRate}
            </p>
            <p className="display-stats_field">
              min. heart rate: {heartRate.minHeartRate}
            </p>
            <p className="display-stats_field">
              average heart rate: {heartRate.averageHeartRate}
            </p>
          </>
        )}
      </Container>
      {children}
    </>
  );
};

export default DisplayStats;
