import { useDispatch } from 'react-redux';

import Container from '../components/ui/Container';
import { deleteTrail } from '../features/trails/trailsSlice';

import DisplayStats from './DisplayStats';

function Trail({ trail }) {
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const creator = trail.creator;

  const deleteTrailhandler = () => {
    dispatch(deleteTrail(trail._id));
  };

  //  if (trail.track) {
  //    console.log('TRAIL_TRACK', trail.track);
  //  } else {
  //    console.log('NO_TRACK_AVAILABLE');
  //  }

  return (
    <div margin={'1.5rem 0'} className="trail-item">
      <Container className="trail-item_header">
        <h2 className="trail-item_name">{trail.trail}</h2>
        <p>{new Date(trail.createdAt).toLocaleString('es-ES')}</p>

        {trail && (
          <DisplayStats
            className="trail-item_details"
            track={trail.track}
            trail={trail}
            type={trail.track.type}
          >
            {storedUser._id === creator && (
              <button
                className="trail-item_delete-btn"
                onClick={deleteTrailhandler}
              >
                Delete
              </button>
            )}
          </DisplayStats>
        )}
      </Container>
    </div>
  );
}

export default Trail;
