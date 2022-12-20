import { gpx } from '@tmcw/togeojson';

const convert = (file) => {
  const parser = new DOMParser();

  const parsed = parser.parseFromString(file, 'text/xml');
  const geoJson = gpx(parsed);
  return geoJson;
};

export default convert;
