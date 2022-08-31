import React, { 
  // useState, 
  useRef 
} from 'react';

import convert from '../helpers/convert';

function FileInput({ id, name }) {
  // const [trackData, setTrackData] = useState({ track: '' });
  const gpxFileRef = useRef();

  const gpxfileHandler = () => {
    gpxFileRef.current.click();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const toConvert = e.target.result;
      // setTrackData((prevState) => ({
      //   ...prevState,
      //   track: convert(toConvert),
      // }));
      return convert(toConvert);
    };
    console.log('READ_AS_TEXT', reader.readAsText(file));
  };

  return (
    <>
      <input
        onChange={onChange}
        ref={gpxFileRef}
        id={id}
        name={name}
        type="file"
        style={{ display: 'none' }}
        accept=".gpx"
      />
      <br />
      <div>
        <button type="button" onClick={gpxfileHandler}>
          Select file
        </button>
      </div>
    </>
  );
}

export default FileInput;
