import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTrail, reset } from '../features/trails/trailsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { gpx } from '@tmcw/togeojson';

import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import DisplayStats from './DisplayStats';

function CreateTrail() {
  const gpxFileRef = useRef();
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    activity: 0,
    creator: '',
    difficulty: 0,
    distance: 0,
    elevation: 0,
    token: '',
    track: {},
    trail: '',
  });

  const activityValue = [0, 1, 2, 3];
  const difficultyValue = [0, 1, 2, 3, 4];

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const token = storedUser.token;

  const { track, activity, difficulty, distance, elevation, trail } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const creator = user._id;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate(`/${user._id}`);
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    console.log(formData);
  };

  //Handle files

  const convert = (file) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(file, 'text/xml');
    const geoJson = gpx(parsed);
    return geoJson;
  };

  const gpxfileHandler = () => {
    gpxFileRef.current.click();
  };

  const FileHandler = (e) => {
    const file = e.target.files[0];
    console.log('file', file.name);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const toConvert = e.target.result;

      setFormData((prevState) => ({
        ...prevState,
        track: convert(toConvert),
      }));
    };
    console.log('READ_AS_TEXT', reader.readAsText(file));
    // reader.readAsText(file)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const trailData = {
      activity,
      creator,
      difficulty,
      distance,
      elevation,
      token,
      track,
      trail,
    };

    dispatch(createTrail(trailData));
    dispatch(reset());

    setFormData({
      activity: 0,
      creator: '',
      difficulty: 0,
      distance: 0,
      elevation: 0,
      token: '',
      track: {},
      trail: '',
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <Container className="create-trail">
          <section>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <div className="create-trail_content">
                <input
                  id="trail"
                  name="trail"
                  value={trail}
                  placeholder="Entert Trail Name"
                  onChange={onChange}
                  type="text"
                />

                <select
                  name="activity"
                  id="activity"
                  value={activity}
                  onChange={onChange}
                >
                  <option value={activityValue[0]}>Select Activity</option>
                  <option value={activityValue[1]}>MTB</option>
                  <option value={activityValue[2]}>Hiking</option>
                  <option value={activityValue[3]}>Running</option>
                </select>

                <select
                  name="difficulty"
                  id="difficulty"
                  value={difficulty}
                  onChange={onChange}
                >
                  <option value={difficultyValue[0]}>Select Difficulty</option>
                  <option value={difficultyValue[1]}>Easy</option>
                  <option value={difficultyValue[2]}>Medium</option>
                  <option value={difficultyValue[3]}>Hard</option>
                  <option value={difficultyValue[4]}>Expert</option>
                </select>

                <div className="create-trail_file">
                  <input
                    ref={gpxFileRef}
                    type="file"
                    id="track"
                    accept=".gpx"
                    name="track"
                    // value={track}
                    style={{ display: 'none' }}
                    placeholder="Entert track Name"
                    onChange={FileHandler}
                  />
                  <div>
                    <button type="button" onClick={gpxfileHandler}>
                      Select file
                    </button>
                    {fileName && (
                      <p className="create-trail_field">
                        File name: {fileName}
                      </p>
                    )}
                  </div>
                </div>
                <DisplayStats
                  track={formData.track}
                  type={formData.track.type}
                />
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </section>
        </Container>
      </div>
    </>
  );
}

export default CreateTrail;
