// import React, { useContext, useReducer, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Store } from '../Store';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';
// import axios from 'axios';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false };
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };

//     default:
//       return state;
//   }
// };

// export default function ProfileScreen() {
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const [name, setName] = useState(userInfo.name);
//   const [email, setEmail] = useState(userInfo.email);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
//     loadingUpdate: false,
//   });

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         '/api/users/profile',
//         {
//           name,
//           email,
//           password,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({
//         type: 'UPDATE_SUCCESS',
//       });
//       ctxDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       toast.success('User updated successfully');
//     } catch (err) {
//       dispatch({
//         type: 'FETCH_FAIL',
//       });
//       toast.error(getError(err));
//     }
//   };

//   return (
//     <div className="container small-container">
//       <Helmet>
//         <title>User Profile</title>
//       </Helmet>
//       <h1 className="my-3">User Profile</h1>
//       <form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit">Update</Button>
//         </div>
//       </form>
//     </div>
//   );
// }
// import React, { useContext, useReducer, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Store } from '../Store';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';
// import axios from 'axios';
// import LoadingBox from '../components/LoadingBox'; // ✅ make sure this exists

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };
//     default:
//       return state;
//   }
// };

// export default function ProfileScreen() {
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;

//   const [name, setName] = useState(userInfo.name);
//   const [email, setEmail] = useState(userInfo.email);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
//     loadingUpdate: false,
//   });

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // ✅ Check confirm password before sending request
//     if (password && password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       dispatch({ type: 'UPDATE_REQUEST' });
//       const { data } = await axios.put(
//         '/api/users/profile',
//         { name, email, password },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       dispatch({ type: 'UPDATE_SUCCESS' });
//       ctxDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       toast.success('User updated successfully');
//     } catch (err) {
//       dispatch({ type: 'UPDATE_FAIL' });
//       toast.error(getError(err));
//     }
//   };

//   return (
//     <div className="container small-container">
//       <Helmet>
//         <title>User Profile</title>
//       </Helmet>
//       <h1 className="my-3">User Profile</h1>
//       <form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="confirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit" disabled={loadingUpdate}>
//             {loadingUpdate ? 'Updating...' : 'Update'}
//           </Button>
//         </div>
//         {loadingUpdate && <LoadingBox />} {/* ✅ Show loading spinner */}
//       </form>
//     </div>
//   );
// }
import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import './ProfileScreen.css'; // External CSS import

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        '/api/users/profile',
        { name, email, password },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully!');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div className="profile-container">
      <Helmet>
        <title>User Profile - Sweet Delights Bakery</title>
      </Helmet>
      
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-icon">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
      
      <div className="profile-content">
        <form onSubmit={submitHandler} className="profile-form">
          <Form.Group className="mb-4 form-group-custom" controlId="name">
            <Form.Label className="form-label">Full Name</Form.Label>
            <Form.Control
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </Form.Group>
          
          <Form.Group className="mb-4 form-group-custom" controlId="email">
            <Form.Label className="form-label">Email Address</Form.Label>
            <Form.Control
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />
          </Form.Group>
          
          <Form.Group className="mb-4 form-group-custom" controlId="password">
            <Form.Label className="form-label">New Password</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (optional)"
            />
            <div className="form-text">Leave blank to keep current password</div>
          </Form.Group>
          
          <Form.Group className="mb-4 form-group-custom" controlId="confirmPassword">
            <Form.Label className="form-label">Confirm New Password</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </Form.Group>
          
          <div className="form-actions">
            <Button 
              type="submit" 
              className="profile-update-btn"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle me-2"></i>
                  Update Profile
                </>
              )}
            </Button>
          </div>
        </form>
        
        {loadingUpdate && (
          <div className="loading-overlay">
            <LoadingBox />
          </div>
        )}
      </div>
    </div>
  );
}