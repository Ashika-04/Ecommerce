// import axios from 'axios';
// import React, { useContext, useEffect, useReducer } from 'react';
// import { toast } from 'react-toastify';
// import Button from 'react-bootstrap/Button';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
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
//         orders: action.payload,
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
// export default function OrderListScreen() {
//   const navigate = useNavigate();
//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
//     useReducer(reducer, {
//       loading: true,
//       error: '',
//     });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await axios.get(`/api/orders`, {
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

//   const deleteHandler = async (order) => {
//     if (window.confirm('Are you sure to delete?')) {
//       try {
//         dispatch({ type: 'DELETE_REQUEST' });
//         await axios.delete(`/api/orders/${order._id}`, {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         toast.success('order deleted successfully');
//         dispatch({ type: 'DELETE_SUCCESS' });
//       } catch (err) {
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
//         <title>Orders</title>
//       </Helmet>
//       <h1>Orders</h1>
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
//               <th>USER</th>
//               <th>DATE</th>
//               <th>TOTAL</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.user ? order.user.name : 'DELETED USER'}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>{order.totalPrice.toFixed(2)}</td>
//                 <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>

//                 <td>
//                   {order.isDelivered
//                     ? order.deliveredAt.substring(0, 10)
//                     : 'No'}
//                 </td>
//                 <td>
//                   <Button
//                     type="button"
//                     variant="light"
//                     onClick={() => {
//                       navigate(`/order/${order._id}`);
//                     }}
//                   >
//                     Details
//                   </Button>
//                   &nbsp;
//                   <Button
//                     type="button"
//                     variant="light"
//                     onClick={() => deleteHandler(order)}
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
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import './OrderListScreen.css'; // Import the CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
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

export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
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

  const showDeleteConfirmation = (order) => {
    setOrderToDelete(order);
    setShowConfirmDialog(true);
  };

  const cancelDelete = () => {
    setOrderToDelete(null);
    setShowConfirmDialog(false);
  };

  const confirmDelete = async () => {
    if (orderToDelete) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${orderToDelete._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
    setShowConfirmDialog(false);
    setOrderToDelete(null);
  };

  return (
    <div className="order-list-container">
      <Helmet>
        <title>Orders</title>
      </Helmet>
      
      {loadingDelete && (
        <div className="loading-delete">
          <LoadingBox>Deleting...</LoadingBox>
        </div>
      )}
      
      {showConfirmDialog && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <h3 className="confirmation-title">Confirm Deletion</h3>
            <p>Are you sure you want to delete order #{orderToDelete?._id}?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <h1 className="order-list-title">Order Management</h1>
      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders && orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">{order._id}</td>
                <td className="user-name">{order.user ? order.user.name : 'DELETED USER'}</td>
                <td className="order-date">{order.createdAt.substring(0, 10)}</td>
                <td className="order-total">${order.totalPrice.toFixed(2)}</td>
                <td className={order.isPaid ? "order-status-paid" : "order-status-not-paid"}>
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </td>
                <td className={order.isDelivered ? "order-status-delivered" : "order-status-not-delivered"}>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="details-button"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => showDeleteConfirmation(order)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p className="empty-state-message">No orders found.</p>
        </div>
      )}
    </div>
  );
}