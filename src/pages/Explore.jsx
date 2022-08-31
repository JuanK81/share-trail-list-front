import FilterBox from '../components/ui/FilterBox';
import TrailList from '../components/TrailList';
import MaplibreCra from '../mplibre-cra/MaplibreCra';


//TODO set trail data as props to be passed from trails-list to map
const Explore = () => {
  return (
    <div className="explore">
      <div className="explore-sidebar">
        <FilterBox />
        <TrailList />
      </div>
        <MaplibreCra />
    </div>
  );
};

export default Explore;
