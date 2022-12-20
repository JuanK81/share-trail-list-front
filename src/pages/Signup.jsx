import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

import { FaUser } from 'react-icons/fa';

import Footer from '../components/ui/Footer';
import Hero from '../components/Hero';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';

export const SignUp = () => {
  // ******************DUMMY_FORM******************** //
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error('Paswords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  // ******************DUMMY_FORM******************** //
  return (
    <>
      <Hero>
        <Container>
          <div>
            <h1>DUMMY_SIGNUP</h1>
            <section>
              <h1>
                <FaUser /> Sign Up
              </h1>
              <p>Create Account</p>
            </section>
            <section>
              <form onSubmit={onSubmit}>
                <div>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Entert your Name"
                    onChange={onChange}
                    type="text"
                  />
                </div>
                <div>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Entert your Email"
                    onChange={onChange}
                    type="email"
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Entert Password"
                    onChange={onChange}
                    type="password"
                  />
                </div>
                <div>
                  <input
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm Password"
                    onChange={onChange}
                    type="password"
                  />
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </section>
          </div>
          <div>
          </div>
        </Container>
      </Hero>
      <Footer />
    </>
  );
};

export default SignUp;
