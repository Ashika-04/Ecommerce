// import axios from 'axios';
// import React, { useContext, useEffect, useReducer } from 'react';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate, useParams } from 'react-router-dom';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { Store } from '../Store';
// import { getError } from '../utils';
// import { toast } from 'react-toastify';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, order: action.payload, error: '' };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'PAY_REQUEST':
//       return { ...state, loadingPay: true };
//     case 'PAY_SUCCESS':
//       return { ...state, loadingPay: false, successPay: true };
//     case 'PAY_FAIL':
//       return { ...state, loadingPay: false };
//     case 'PAY_RESET':
//       return { ...state, loadingPay: false, successPay: false };

//     case 'DELIVER_REQUEST':
//       return { ...state, loadingDeliver: true };
//     case 'DELIVER_SUCCESS':
//       return { ...state, loadingDeliver: false, successDeliver: true };
//     case 'DELIVER_FAIL':
//       return { ...state, loadingDeliver: false };
//     case 'DELIVER_RESET':
//       return {
//         ...state,
//         loadingDeliver: false,
//         successDeliver: false,
//       };
//     default:
//       return state;
//   }
// }
// export default function OrderScreen() {
//   const { state } = useContext(Store);
//   const { userInfo } = state;

//   const params = useParams();
//   const { id: orderId } = params;
//   const navigate = useNavigate();

//   const [
//     {
//       loading,
//       error,
//       order,
//       successPay,
//       loadingPay,
//       loadingDeliver,
//       successDeliver,
//     },
//     dispatch,
//   ] = useReducer(reducer, {
//     loading: true,
//     order: {},
//     error: '',
//     successPay: false,
//     loadingPay: false,
//   });

//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             amount: { value: order.totalPrice },
//           },
//         ],
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   }

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         dispatch({ type: 'PAY_REQUEST' });
//         const { data } = await axios.put(
//           `/api/orders/${order._id}/pay`,
//           details,
//           {
//             headers: { authorization: `Bearer ${userInfo.token}` },
//           }
//         );
//         dispatch({ type: 'PAY_SUCCESS', payload: data });
//         toast.success('Order is paid');
//       } catch (err) {
//         dispatch({ type: 'PAY_FAIL', payload: getError(err) });
//         toast.error(getError(err));
//       }
//     });
//   }
//   function onError(err) {
//     toast.error(getError(err));
//   }

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await axios.get(`/api/orders/${orderId}`, {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         });
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
//       }
//     };

//     if (!userInfo) {
//       return navigate('/login');
//     }
//     if (
//       !order._id ||
//       successPay ||
//       successDeliver ||
//       (order._id && order._id !== orderId)
//     ) {
//       fetchOrder();
//       if (successPay) {
//         dispatch({ type: 'PAY_RESET' });
//       }
//       if (successDeliver) {
//         dispatch({ type: 'DELIVER_RESET' });
//       }
//     } else {
//       const loadPaypalScript = async () => {
//         const { data: clientId } = await axios.get('/api/keys/paypal', {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         });
//         paypalDispatch({
//           type: 'resetOptions',
//           value: {
//             'client-id': clientId,
//             currency: 'USD',
//           },
//         });
//         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
//       };
//       loadPaypalScript();
//     }
//   }, [
//     order,
//     userInfo,
//     orderId,
//     navigate,
//     paypalDispatch,
//     successPay,
//     successDeliver,
//   ]);

//   async function deliverOrderHandler() {
//     try {
//       dispatch({ type: 'DELIVER_REQUEST' });
//       const { data } = await axios.put(
//         `/api/orders/${order._id}/deliver`,
//         {},
//         {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({ type: 'DELIVER_SUCCESS', payload: data });
//       toast.success('Order is delivered');
//     } catch (err) {
//       toast.error(getError(err));
//       dispatch({ type: 'DELIVER_FAIL' });
//     }
//   }

//   return loading ? (
//     <LoadingBox></LoadingBox>
//   ) : error ? (
//     <MessageBox variant="danger">{error}</MessageBox>
//   ) : (
//     <div>
//       <Helmet>
//         <title>Order {orderId}</title>
//       </Helmet>
//       <h1 className="my-3">Order {orderId}</h1>
//       <Row>
//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Shipping</Card.Title>
//               <Card.Text>
//                 <strong>Name:</strong> {order.shippingAddress.fullName} <br />
//                 <strong>Address: </strong> {order.shippingAddress.address},
//                 {order.shippingAddress.city}, {order.shippingAddress.postalCode}
//                 ,{order.shippingAddress.country}
//                 &nbsp;
//                 {order.shippingAddress.location &&
//                   order.shippingAddress.location.lat && (
//                     <a
//                       target="_new"
//                       href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
//                     >
//                       Show On Map
//                     </a>
//                   )}
//               </Card.Text>
//               {order.isDelivered ? (
//                 <MessageBox variant="success">
//                   Delivered at {order.deliveredAt}
//                 </MessageBox>
//               ) : (
//                 <MessageBox variant="danger">Not Delivered</MessageBox>
//               )}
//             </Card.Body>
//           </Card>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Payment</Card.Title>
//               <Card.Text>
//                 <strong>Method:</strong> {order.paymentMethod}
//               </Card.Text>
//               {order.isPaid ? (
//                 <MessageBox variant="success">
//                   Paid at {order.paidAt}
//                 </MessageBox>
//               ) : (
//                 <MessageBox variant="danger">Not Paid</MessageBox>
//               )}
//             </Card.Body>
//           </Card>

//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Items</Card.Title>
//               <ListGroup variant="flush">
//                 {order.orderItems.map((item) => (
//                   <ListGroup.Item key={item._id}>
//                     <Row className="align-items-center">
//                       <Col md={6}>
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="img-fluid rounded img-thumbnail"
//                         ></img>{' '}
//                         <Link to={`/product/${item.slug}`}>{item.name}</Link>
//                       </Col>
//                       <Col md={3}>
//                         <span>{item.quantity}</span>
//                       </Col>
//                       <Col md={3}>${item.price}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Order Summary</Card.Title>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Items</Col>
//                     <Col>${order.itemsPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Shipping</Col>
//                     <Col>${order.shippingPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Tax</Col>
//                     <Col>${order.taxPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>
//                       <strong> Order Total</strong>
//                     </Col>
//                     <Col>
//                       <strong>${order.totalPrice.toFixed(2)}</strong>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 {!order.isPaid && (
//                   <ListGroup.Item>
//                     {isPending ? (
//                       <LoadingBox />
//                     ) : (
//                       <div>
//                         <PayPalButtons
//                           createOrder={createOrder}
//                           onApprove={onApprove}
//                           onError={onError}
//                         ></PayPalButtons>
//                       </div>
//                     )}
//                     {loadingPay && <LoadingBox></LoadingBox>}
//                   </ListGroup.Item>
//                 )}
//                 {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//                   <ListGroup.Item>
//                     {loadingDeliver && <LoadingBox></LoadingBox>}
//                     <div className="d-grid">
//                       <Button type="button" onClick={deliverOrderHandler}>
//                         Deliver Order
//                       </Button>
//                     </div>
//                   </ListGroup.Item>
//                 )}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import './OrderScreen.css'; // Import the CSS file

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="order-container">
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      
      <h1 className="order-title">Order {orderId}</h1>
      
      <div className="order-grid">
        <div className="order-left-column">
          <div className="order-card">
            <div className="order-card-header">
              <h2 className="order-card-title">Shipping</h2>
            </div>
            <div className="order-card-body">
              <p className="order-info">
                <strong>Name:</strong> 
                <span className="order-info-text">{order.shippingAddress.fullName}</span>
              </p>
              <p className="order-info">
                <strong>Address:</strong> 
                <span className="order-info-text">
                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </span>
              </p>
              {order.shippingAddress.location &&
                order.shippingAddress.location.lat && (
                  <a
                    className="map-link"
                    target="_new"
                    href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                  >
                    Show On Map
                  </a>
                )}
              {order.isDelivered ? (
                <div className="status-message status-success">
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className="status-message status-danger">Not Delivered</div>
              )}
            </div>
          </div>

          <div className="order-card">
            <div className="order-card-header">
              <h2 className="order-card-title">Payment</h2>
            </div>
            <div className="order-card-body">
              <p className="order-info">
                <strong>Method:</strong> 
                <span className="order-info-text">{order.paymentMethod}</span>
              </p>
              {order.isPaid ? (
                <div className="status-message status-success">
                  Paid at {order.paidAt}
                </div>
              ) : (
                <div className="status-message status-danger">Not Paid</div>
              )}
            </div>
          </div>

          <div className="order-card">
            <div className="order-card-header">
              <h2 className="order-card-title">Items</h2>
            </div>
            <div className="order-card-body">
              <ul className="order-items-list">
                {order.orderItems.map((item) => (
                  <li key={item._id} className="order-item">
                    <div className="order-item-grid">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                      />
                      <div className="order-item-details">
                        <Link 
                          to={`/product/${item.slug}`} 
                          className="order-item-name"
                        >
                          {item.name}
                        </Link>
                        <span className="order-item-quantity">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                      <div className="order-item-price">
                        ${item.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="order-right-column">
          <div className="order-card">
            <div className="order-card-header">
              <h2 className="order-card-title">Order Summary</h2>
            </div>
            <div className="order-card-body">
              <ul className="order-summary-list">
                <li className="order-summary-item">
                  <span>Items</span>
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </li>
                <li className="order-summary-item">
                  <span>Shipping</span>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </li>
                <li className="order-summary-item">
                  <span>Tax</span>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </li>
                <li className="order-summary-item">
                  <span>Order Total</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </li>
                
                {!order.isPaid && (
                  <li className="order-summary-item">
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div className="paypal-container">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div className="loading-pay"><LoadingBox></LoadingBox></div>}
                  </li>
                )}
                
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li className="order-summary-item">
                    {loadingDeliver && <div className="loading-deliver"><LoadingBox></LoadingBox></div>}
                    <button 
                      className="deliver-button" 
                      onClick={deliverOrderHandler}
                      disabled={loadingDeliver}
                    >
                      {loadingDeliver ? 'Delivering...' : 'Deliver Order'}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}