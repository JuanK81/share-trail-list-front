import { NavLink } from 'react-router-dom';



export const NavButton = ({
  children,
  btnClass,
  linkClass,
  // isActive,
  to,
  onClick,
}) => {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}>
      <NavLink className={`btn-link ${linkClass}`} to={to}>
        {children}
      </NavLink>
    </button>
  );
};

export default NavButton;
