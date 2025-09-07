// import axios from 'axios';
// import React, { useContext, useEffect, useReducer } from 'react';
// import Button from 'react-bootstrap/Button';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { Store } from '../Store';
// import { getError } from '../utils';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         users: action.payload,
//         loading: false,
//       };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'DELETE_REQUEST':
//       return { ...state, loadingDelete: true, successDelete: false };
//     case 'DELETE_SUCCESS':
//       return {
//         ...state,
//         loadingDelete: false,
//         successDelete: true,
//       };
//     case 'DELETE_FAIL':
//       return { ...state, loadingDelete: false };
//     case 'DELETE_RESET':
//       return { ...state, loadingDelete: false, successDelete: false };
//     default:
//       return state;
//   }
// };
// export default function UserListScreen() {
//   const navigate = useNavigate();
//   const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
//     useReducer(reducer, {
//       loading: true,
//       error: '',
//     });

//   const { state } = useContext(Store);
//   const { userInfo } = state;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await axios.get(`/api/users`, {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({
//           type: 'FETCH_FAIL',
//           payload: getError(err),
//         });
//       }
//     };
//     if (successDelete) {
//       dispatch({ type: 'DELETE_RESET' });
//     } else {
//       fetchData();
//     }
//   }, [userInfo, successDelete]);

//   const deleteHandler = async (user) => {
//     if (window.confirm('Are you sure to delete?')) {
//       try {
//         dispatch({ type: 'DELETE_REQUEST' });
//         await axios.delete(`/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         toast.success('user deleted successfully');
//         dispatch({ type: 'DELETE_SUCCESS' });
//       } catch (error) {
//         toast.error(getError(error));
//         dispatch({
//           type: 'DELETE_FAIL',
//         });
//       }
//     }
//   };
//   return (
//     <div>
//       <Helmet>
//         <title>Users</title>
//       </Helmet>
//       <h1>Users</h1>

//       {loadingDelete && <LoadingBox></LoadingBox>}
//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>IS ADMIN</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.isAdmin ? 'YES' : 'NO'}</td>
//                 <td>
//                   <Button
//                     type="button"
//                     variant="light"
//                     onClick={() => navigate(`/admin/user/${user._id}`)}
//                   >
//                     Edit
//                   </Button>
//                   &nbsp;
//                   <Button
//                     type="button"
//                     variant="light"
//                     onClick={() => deleteHandler(user)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import './UserListScreen.css'; // We'll create this CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function UserListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('User deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  return (
    <div className="pastry-user-list-screen">
      <Helmet>
        <title>Users | Sweet Delights Bakery</title>
      </Helmet>
      
      <div className="pastry-admin-header">
        <h1>User Management</h1>
        <p className="admin-subtitle">Manage all registered users</p>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Card className="pastry-users-card">
          <Card.Body>
            <div className="table-responsive">
              <Table striped bordered hover className="pastry-users-table">
                <thead>
                  <tr>
                    <th>
                      <i className="fas fa-id-card"></i> ID
                    </th>
                    <th>
                      <i className="fas fa-user"></i> NAME
                    </th>
                    <th>
                      <i className="fas fa-envelope"></i> EMAIL
                    </th>
                    <th>
                      <i className="fas fa-crown"></i> ROLE
                    </th>
                    <th>
                      <i className="fas fa-cog"></i> ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="user-row">
                      <td className="user-id">{user._id.substring(0, 8)}...</td>
                      <td className="user-name">{user.name}</td>
                      <td className="user-email">{user.email}</td>
                      <td className="user-role">
                        {user.isAdmin ? (
                          <Badge bg="success" className="admin-badge">
                            <i className="fas fa-crown"></i> ADMIN
                          </Badge>
                        ) : (
                          <Badge bg="secondary" className="user-badge">
                            <i className="fas fa-user"></i> USER
                          </Badge>
                        )}
                      </td>
                      <td className="user-actions">
                        <Button
                          type="button"
                          className="edit-btn"
                          onClick={() => navigate(`/admin/user/${user._id}`)}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </Button>
                        <Button
                          type="button"
                          className="delete-btn"
                          onClick={() => deleteHandler(user)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {users.length === 0 && (
              <div className="no-users-message">
                <i className="fas fa-users-slash"></i>
                <h3>No Users Found</h3>
                <p>There are no registered users yet.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}