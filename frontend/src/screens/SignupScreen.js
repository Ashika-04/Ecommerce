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

// export default function SignupScreen() {
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const redirectInUrl = new URLSearchParams(search).get('redirect');
//   const redirect = redirectInUrl ? redirectInUrl : '/';

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
//     try {
//       const { data } = await Axios.post('/api/users/signup', {
//         name,
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
//         <title>Sign Up</title>
//       </Helmet>
//       <h1 className="my-3">Sign Up</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>

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
//           <Form.Group className="mb-3" controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit">Sign Up</Button>
//         </div>
//         <div className="mb-3">
//           Already have an account?{' '}
//           <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
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
import './SignupScreen.css'; // We'll create this CSS file

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      toast.success('Welcome to our bakery! 🎉');
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
    <div className="signup-screen">
      <Container className="signup-container">
        <div className="signup-wrapper">
          <div className="signup-left">
            <div className="signup-decoration">
              <div className="cupcake-icon">🧁</div>
              <h2>Join Our Sweet Community</h2>
              <p>Create an account to enjoy personalized service, track your orders, and receive exclusive sweet offers!</p>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">🎂</span>
                  <span>Exclusive cake deals</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🚚</span>
                  <span>Faster checkout</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">❤️</span>
                  <span>Save your favorites</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="signup-right">
            <Helmet>
              <title>Sign Up | Sugar Delights</title>
            </Helmet>
            
            <div className="signup-form-container">
              <div className="form-header">
                <h1>Create Account</h1>
                <p>Join our sweet family today</p>
              </div>
              
              <Form onSubmit={submitHandler} className="signup-form">
                <Form.Group className="mb-4" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                  <div className="input-icon">👤</div>
                </Form.Group>

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
                    placeholder="Create a password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <div className="input-icon">🔒</div>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                  />
                  <div className="input-icon">✅</div>
                </Form.Group>
                
                <div className="mb-4">
                  <Button 
                    type="submit" 
                    className="signup-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
                
                <div className="form-links">
                  <div className="mb-2">
                    <span>Already have an account? </span>
                    <Link to={`/signin?redirect=${redirect}`} className="form-link">
                      Sign In
                    </Link>
                  </div>
                </div>
                
                <div className="terms-text">
                  <p>By creating an account, you agree to our <Link to="/terms" className="form-link">Terms of Service</Link> and <Link to="/privacy" className="form-link">Privacy Policy</Link></p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}