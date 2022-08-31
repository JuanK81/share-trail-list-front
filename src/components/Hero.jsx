


// import img1 from '../assets/pexels-amanda-klamrowski-10216508.jpg';
import img2 from '../assets/pexels-artem-saranin-1496373.jpg';
// import img3 from '../assets/pexels-james-wheeler-1578750.jpg';


export const Hero = ({ children }) => {
  return (
    <div className="hero">
      <div
        className="hero-img"
        style={{
          backgroundImage: `url(${img2})`,
        }}
      >
        {children}
        
      </div>
    </div>
  );
};

export default Hero;
