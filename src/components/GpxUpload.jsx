import React, {
  useRef,
  // useState
} from 'react';
import { gpx } from '@tmcw/togeojson';
// import { useEffect } from 'react';
// import MaplibreCra from '../mplibre-cra/MaplibreCra';

const GpxUpload = ({ id, center, onInput }) => {
  // const [file, setFile] = useState();
  const gpxFileRef = useRef();

  const gpxfileHandler = () => {
    console.log('CLICKED!');
    gpxFileRef.current.click();
  };

  const convert = (track) => {
    return fetch(track)
      .then(function (res) {
        return res.text();
      })
      .then(function (xml) {
        const fileParsedFromDom = new DOMParser().parseFromString(
          xml,
          'text/xml'
        );
        const converted = gpx(fileParsedFromDom);
        console.log(converted);
        return converted;
      })
      .then((geoJson) => {
        console.log('GEO_JSON__==>', geoJson);
        return geoJson;
      })
      .catch((err) => console.log(err));
  };

  const pickedGpxHandler = (e) => {
    if (e.target.files || e.target.files.length() === 1) {
      let pickedFile = e.target.files[0];

      const output = convert(pickedFile);
      console.log('OUTPUT==>', output);
    }
  };

  return (
    <>
      <input
        ref={gpxFileRef}
        id={id}
        type="file"
        style={{ display: 'none' }}
        accept=".gpx"
        onChange={pickedGpxHandler}
      />
      <div className={`gpx-upload ${center && 'center'}`}>
        <div className={`gpx-upload_preview`}>{/* <MaplibreCra /> */}</div>
        <button type="button" onClick={gpxfileHandler}>
          Select file
        </button>
      </div>
    </>
  );
};

export default GpxUpload;
