import { useSelector } from 'react-redux';

import Container from '../components/ui/Container';
import CreateTrail from '../components/CreateTrail';
import TrailsList from '../components/TrailList';


function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard_container">
      <CreateTrail />
      <Container className="dashboard">
        <section className="dashboard_content">
          <h2 className="dashboard_user">Welcome {user && user.name}</h2>
          <TrailsList dashboard={true}/>
        </section>
      </Container>
    </div>
  );
}

export default Dashboard;
