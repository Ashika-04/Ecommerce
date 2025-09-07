// import React, { useContext, useEffect, useReducer } from 'react';
// import { Helmet } from 'react-helmet-async';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { Store } from '../Store';
// import { getError } from '../utils';
// import Button from 'react-bootstrap/esm/Button';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, orders: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default function OrderHistoryScreen() {
//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const navigate = useNavigate();

//   const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
//     loading: true,
//     error: '',
//   });
//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });
//       try {
//         const { data } = await axios.get(
//           `/api/orders/mine`,

//           { headers: { Authorization: `Bearer ${userInfo.token}` } }
//         );
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({
//           type: 'FETCH_FAIL',
//           payload: getError(error),
//         });
//       }
//     };
//     fetchData();
//   }, [userInfo]);
//   return (
//     <div>
//       <Helmet>
//         <title>Order History</title>
//       </Helmet>

//       <h1>Order History</h1>
//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
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
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import './OrderHistoryScreen.css'; // Import the CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="order-history-container">
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1 className="order-history-title">Order History</h1>
      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders && orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td className="order-date">{order.createdAt.substring(0, 10)}</td>
                <td className="order-total">${order.totalPrice.toFixed(2)}</td>
                <td className={order.isPaid ? "order-status-paid" : "order-status-not-paid"}>
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </td>
                <td className={order.isDelivered ? "order-status-delivered" : "order-status-not-delivered"}>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
                </td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p className="empty-state-message">You haven't placed any orders yet.</p>
          <button 
            className="shop-now-button"
            onClick={() => navigate('/')}
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
}