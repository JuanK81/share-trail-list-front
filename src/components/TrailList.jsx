import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getTrails, 
  // getUserTrails, 
  reset 
} from '../features/trails/trailsSlice';

import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import Trail from '../components/Trail';

function TrailsList({dashboard}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { trail, isLoading, isError, message } = useSelector(
    (state) => state.trail
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    // if (!dashboard) {
    dispatch(getTrails());
  // }

  //   if (dashboard) {
  //   dispatch(getUserTrails());}

    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, message, dispatch, dashboard]);


 //TODO: create function to fetch user trails in backend
                

  if (isLoading) {
    return <Spinner />;
  }

if (!dashboard) {
  return (
    <Container margin="2rem 0 0 0" className="trails-list_container">
      <section className="trails-list">
        {trail.length > 0 ? (
          <div>
            {trail.map((trailItem) => (
              <div key={trailItem._id}>
                <Trail trail={trailItem} />
              </div>
            ))}
          </div>
        ) : (
          <h3>There are no trails yet to show.</h3>
        )}
      </section>
    </Container>
  );}

  if (dashboard) {
    return (
      <Container margin="2rem 0 0 0" className="trails-list_container">
        <section className="trails-list">
          {trail.length > 0 ? (
            <div>
              {trail.map((trailItem) => (
                <div key={trailItem._id}>
                  <Trail trail={trailItem} />
                </div>
              ))}
            </div>
          ) : (
            <h3>There are no trails yet to show.</h3>
          )}
        </section>
      </Container>
    );
  }
}

export default TrailsList;
