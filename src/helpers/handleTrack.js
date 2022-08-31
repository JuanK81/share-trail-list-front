const handleTrack = (file) => {
  //Filter input to access data
  let input = {};

  if (file.type === 'FeatureCollection') {
    input = file.features[0];
  }
  if (file.type === 'Feature') {
    input = file;
  }

  //Output data
  const trackData = {
    segments: [
      {
        segment: 0,
        coods: [[]],
        elevation: [],
        elevationGain: 0,
        length: 0,
      },
    ],
    complete: {
      distance: {},
      elevation: {},
      time: {},
      heartRate: {},
    },
  };

  //Basic variables
  const geometry = input.geometry;
  const properties = input.properties;
  //  const time = properties.time;
  const heart = properties.coordinateProperties.heart
    ? properties.coordinateProperties.heart
    : 0;
  const times = properties.coordinateProperties.times;

  //ELEVATION
  const elevation = () => {
    //Extract elevation from coordinates
    const elevationArray = geometry.coordinates.map((item) => item[2]);
    const positive = [];
    const negative = [];
    // const base = elevationArray[0];

    //Separate ascending from descending
    for (let i = 0; i < elevationArray.length; i++) {

      if (elevationArray[i] < elevationArray[i + 1]) {
        positive.push(elevationArray[i + 1]);
      }
      if (elevationArray[i] > elevationArray[i + 1]) {
        negative.push(elevationArray[i + 1]);
      }
    }

    //Define segments
    //TODO

    //elevation gain
    let elevationGain = 0;
    elevationArray.forEach((coord, index) => {
      if (index === elevationArray.length - 1) return; 
      const elevationDifference =
        elevationArray[index + 1] - elevationArray[index];
      if (elevationDifference > 0) elevationGain += elevationDifference;
    });

    return { elevationGain, elevationArray };
  };
  trackData.complete.elevation.elevationGain = elevation().elevationGain;
  trackData.complete.elevation.rawElevation = elevation().elevationArray;

  // HEART RATE
  const calcHeartRate = () => {
    if (!heart) return;
    const sum = heart.reduce((total, current) => {
      return total + current;
    }, 0);
    const averageheartRate = Math.floor(sum / heart.length + 1);
    const maxHeartRate = Math.max.apply(null, heart);
    const minHeartRate = Math.min.apply(null, heart);
    return { averageheartRate, maxHeartRate, minHeartRate };
  };
  
if(heart) {
  trackData.complete.heartRate.rawHeartRate = heart;
  trackData.complete.heartRate.maxHeartRate = calcHeartRate().maxHeartRate;
  trackData.complete.heartRate.minHeartRate = calcHeartRate().minHeartRate;
  trackData.complete.heartRate.averageHeartRate = calcHeartRate().averageheartRate;
}
  

  //TIME
  const totalTime = () => {
    // let d;
    let h;
    let m;
    let s;
    const startTime = times[0]
      .split('T')[1]
      .split('Z')[0]
      .split(':')
      .map((item) => parseInt(item));
    const finishtTime = times[times.length - 1]
      .split('T')[1]
      .split('Z')[0]
      .split(':')
      .map((item) => parseInt(item));

    const toSeconds =
      finishtTime[0] * 3600 +
      finishtTime[1] * 60 +
      finishtTime[2] -
      startTime[0] * 3600 +
      startTime[1] * 60 +
      startTime[2];

    const toHMS = (num) => {
      num = Number(num);
      h = Math.floor(num / 3600);
      m = Math.floor((num % 3600) / 60);
      s = Math.floor((num % 3600) % 60);
      return [h, m, s];
    };

    const duration = toHMS(toSeconds);
    return { duration, startTime, finishtTime };
  };
  trackData.complete.time.duration = totalTime().duration;
  trackData.complete.time.startTime = totalTime().startTime;
  trackData.complete.time.finishTime = totalTime().finishtTime;

  return { ...trackData };
};

export default handleTrack;
