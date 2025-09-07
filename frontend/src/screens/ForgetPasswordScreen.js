// import Axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Store } from '../Store';
// import { getError } from '../utils';

// export default function ForgetPasswordScreen() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');

//   const { state } = useContext(Store);
//   const { userInfo } = state;

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/');
//     }
//   }, [navigate, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await Axios.post('/api/users/forget-password', {
//         email,
//       });
//       toast.success(data.message);
//     } catch (err) {
//       toast.error(getError(err));
//     }
//   };

//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Forget Password</title>
//       </Helmet>
//       <h1 className="my-3">Forget Password</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <div className="mb-3">
//           <Button type="submit">submit</Button>
//         </div>
//       </Form>
//     </Container>
//   );
// }
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';
import './ForgetPasswordScreen.css'; // Import the CSS file

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message);
      setEmail('');
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h1 className="forget-password-title">Forgot Password</h1>
      <form className="forget-password-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button 
            className="submit-button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </div>
        
        <div className="helper-text">
          Remember your password? <a href="/signin">Sign In</a>
        </div>
      </form>
    </div>
  );
}