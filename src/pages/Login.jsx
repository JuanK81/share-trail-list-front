import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Container from '../components/ui/Container';
import Footer from '../components/ui/Footer';
import Hero from '../components/Hero';
import Spinner from '../components/ui/Spinner';

export const Login = () => {
  // ******************DUMMY_FORM******************** //
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/explore');
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log('ONSUBMIT_USERDATA', userData);
    dispatch(login(userData));
  };

  // ******************DUMMY_FORM******************** //

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="login-background">lgugyouygouygougy</div>
      <Hero>
        <Container className="login">
          <form onSubmit={onSubmit} className="login-form">
            <div className="login-form_container">
              <input
                className="login-form_input"
                id="email"
                name="email"
                value={email}
                placeholder="Entert your Email"
                onChange={onChange}
                type="email"
              />
            </div>
            <div className="login-form_container">
              <input
                className="login-form_input"
                id="password"
                name="password"
                value={password}
                placeholder="Entert Password"
                onChange={onChange}
                type="password"
              />
            </div>

            <div className="login-form_container">
              <button type="submit" className="login-form_button">
                Login
              </button>
            </div>
          </form>
        </Container>
      </Hero>
      <Footer />
    </>
  );
};

export default Login;
