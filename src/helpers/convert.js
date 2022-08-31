import { gpx } from '@tmcw/togeojson';

const convert = (file) => {
  const parser = new DOMParser();

  const parsed = parser.parseFromString(file, 'text/xml');
  // console.log('PARSED__', parsed);
  const geoJson = gpx(parsed);
  // console.log('GEO_JSON__', geoJson.features[0]);
  // console.log('GEO_JSON__type', geoJson.features[0].properties.type);
  return geoJson;
};
// const convert = async (file) => {
//   const parser = new DOMParser();

//     const parsed = await parser.parseFromString(file, 'text/xml');
//     console.log('PARSED__', parsed);
//     const geoJson = await gpx(parsed);
//     console.log('GEO_JSON__', geoJson);
//     return geoJson;

// };

export default convert;
