import Container from './Container';
import FilterSelect from './FilterSelect';

export const FilterBox = () => {
  return (
    <Container className='"explore-filters'>
      <FilterSelect
        htmlFor="activity"
        label="Activity"
        name="activity"
        option={[
          {
            value: 'all',
            text: 'All',
            // selected: true,
          },
          {
            value: 'mtb',
            text: 'MTB',
          },
          {
            value: 'hiking',
            text: 'Hiking',
          },
          {
            value: 'running',
            text: 'Running',
          },
        ]}
      />
      <FilterSelect
        name="difficulty"
        htmlFor="difficulty"
        label="Difficulty"
        option={[
          {
            value: 'any',
            text: 'Any',
            selected: true,
          },
          {
            value: 'easy',
            text: 'Easy',
          },
          {
            value: 'medium',
            text: 'Medium',
          },
          {
            value: 'hard',
            text: 'Hard',
          },
          {
            value: 'expert',
            text: 'Expert',
          },
        ]}
      />
      <div>
        <label htmlFor="distance">Distance</label>
        <input type="range" id="distance" min="0" max="100" />
        <label htmlFor="elevation">Elevation</label>
        <input type="range" id="elevation" min="0" max="3000" />
      </div>
    </Container>
  );
};

export default FilterBox;
