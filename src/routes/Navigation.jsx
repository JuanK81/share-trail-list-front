import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { logout, reset } from '../features/auth/authSlice';
import { ToastContainer } from 'react-toastify';

import Home from '../pages/Home';
import Explore from '../pages/Explore';
import logo from '../assets/full-logo.png';
import NavButton from '../components/ui/NavButton';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  
  return (
    <>
      <header className="header">
        <nav className="header-nav">
          <NavButton
            to="explore"
            linkClass="header-btn-link"
            btnClass="btn header-nav_btn"
          >
            Explore
          </NavButton>

          {user && (
            <NavButton
              to={`/${user._id}`}
              linkClass="header-btn-link"
              btnClass="btn header-nav_btn"
            >
              Dashboard
            </NavButton>
          )}
        </nav>
        <NavLink to="/Home">
          <div className="header-logo">
            <img className="header-logo_img" src={logo} alt="logo" />
          </div>
        </NavLink>

        <div className="header-user">
          {user ? (
            <button onClick={onLogout} className="btn header-user_sign">
              Logout
            </button>
          ) : (
            <>
              <NavButton
                to="singup"
                linkClass="header-btn-link"
                btnClass="btn header-user_sign"
              >
                Sign Up
              </NavButton>

              <NavButton
                to="login"
                linkClass="header-btn-link"
                btnClass="btn header-user_log"
              >
                Log In
              </NavButton>
            </>
          )}
        </div>
      </header>

      <div className="header-bg"></div>

      <Routes>
        <Route path="/explore" element={<Explore />} />
        <Route path={`/${user._id}`} element={<Dashboard />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Navigation;
