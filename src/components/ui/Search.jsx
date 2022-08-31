import { FaLongArrowAltRight } from 'react-icons/fa';


export const Search = () => {
  return (
    <div className="hero-search">
      <input
        placeholder="    Enter location or trail name..."
        className="hero-search_input"
        type="text"
      />
      <button
        onClick={() => console.log('clicked!!!')}
        className="hero-search_NavButton"
      >
        {<FaLongArrowAltRight/>}
      </button>
    </div>
  );
};

export default Search;
