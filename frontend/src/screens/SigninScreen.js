// import Axios from 'axios';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Helmet } from 'react-helmet-async';
// import { useContext, useEffect, useState } from 'react';
// import { Store } from '../Store';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';

// export default function SigninScreen() {
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const redirectInUrl = new URLSearchParams(search).get('redirect');
//   const redirect = redirectInUrl ? redirectInUrl : '/';

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await Axios.post('/api/users/signin', {
//         email,
//         password,
//       });
//       ctxDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       navigate(redirect || '/');
//     } catch (err) {
//       toast.error(getError(err));
//     }
//   };

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Sign In</title>
//       </Helmet>
//       <h1 className="my-3">Sign In</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit">Sign In</Button>
//         </div>
//         <div className="mb-3">
//           New customer?{' '}
//           <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
//         </div>
//         <div className="mb-3">
//           Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
//         </div>
//       </Form>
//     </Container>
//   );
// }
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import './SigninScreen.css'; // We'll create this CSS file

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      toast.success('Welcome back! 🎂');
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="signin-screen">
      <Container className="signin-container">
        <div className="signin-wrapper">
          <div className="signin-left">
            <div className="signin-decoration">
              <div className="cake-icon">🍰</div>
              <h2>Sweet Delights Bakery</h2>
              <p>Sign in to access your sweet account and continue your delicious journey with us!</p>
            </div>
          </div>
          
          <div className="signin-right">
            <Helmet>
              <title>Sign In | Sugar Delights</title>
            </Helmet>
            
            <div className="signin-form-container">
              <div className="form-header">
                <h1>Welcome Back!</h1>
                <p>Sign in to your account</p>
              </div>
              
              <Form onSubmit={submitHandler} className="signin-form">
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                  <div className="input-icon">✉️</div>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <div className="input-icon">🔒</div>
                </Form.Group>
                
                <div className="mb-4">
                  <Button 
                    type="submit" 
                    className="signin-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
                
                <div className="form-links">
                  <div className="mb-2">
                    <span>New to our bakery? </span>
                    <Link to={`/signup?redirect=${redirect}`} className="form-link">
                      Create your account
                    </Link>
                  </div>
                  
                  <div>
                    <Link to={`/forget-password`} className="form-link">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}