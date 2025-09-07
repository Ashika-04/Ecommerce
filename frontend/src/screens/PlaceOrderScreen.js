// import Axios from 'axios';
// import React, { useContext, useEffect, useReducer } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Link, useNavigate } from 'react-router-dom';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';
// import { Store } from '../Store';
// import CheckoutSteps from '../components/CheckoutSteps';
// import LoadingBox from '../components/LoadingBox';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'CREATE_REQUEST':
//       return { ...state, loading: true };
//     case 'CREATE_SUCCESS':
//       return { ...state, loading: false };
//     case 'CREATE_FAIL':
//       return { ...state, loading: false };
//     default:
//       return state;
//   }
// };

// export default function PlaceOrderScreen() {
//   const navigate = useNavigate();

//   const [{ loading }, dispatch] = useReducer(reducer, {
//     loading: false,
//   });

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart, userInfo } = state;

//   const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
//   cart.itemsPrice = round2(
//     cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
//   );
//   cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
//   cart.taxPrice = round2(0.15 * cart.itemsPrice);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

//   const placeOrderHandler = async () => {
//     try {
//       dispatch({ type: 'CREATE_REQUEST' });

//       const { data } = await Axios.post(
//         '/api/orders',
//         {
//           orderItems: cart.cartItems,
//           shippingAddress: cart.shippingAddress,
//           paymentMethod: cart.paymentMethod,
//           itemsPrice: cart.itemsPrice,
//           shippingPrice: cart.shippingPrice,
//           taxPrice: cart.taxPrice,
//           totalPrice: cart.totalPrice,
//         },
//         {
//           headers: {
//             authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );
//       ctxDispatch({ type: 'CART_CLEAR' });
//       dispatch({ type: 'CREATE_SUCCESS' });
//       localStorage.removeItem('cartItems');
//       navigate(`/order/${data.order._id}`);
//     } catch (err) {
//       dispatch({ type: 'CREATE_FAIL' });
//       toast.error(getError(err));
//     }
//   };

//   useEffect(() => {
//     if (!cart.paymentMethod) {
//       navigate('/payment');
//     }
//   }, [cart, navigate]);

//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
//       <Helmet>
//         <title>Preview Order</title>
//       </Helmet>
//       <h1 className="my-3">Preview Order</h1>
//       <Row>
//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Shipping</Card.Title>
//               <Card.Text>
//                 <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
//                 <strong>Address: </strong> {cart.shippingAddress.address},
//                 {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
//                 {cart.shippingAddress.country}
//               </Card.Text>
//               <Link to="/shipping">Edit</Link>
//             </Card.Body>
//           </Card>

//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Payment</Card.Title>
//               <Card.Text>
//                 <strong>Method:</strong> {cart.paymentMethod}
//               </Card.Text>
//               <Link to="/payment">Edit</Link>
//             </Card.Body>
//           </Card>

//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Items</Card.Title>
//               <ListGroup variant="flush">
//                 {cart.cartItems.map((item) => (
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
//               <Link to="/cart">Edit</Link>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Order Summary</Card.Title>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Items</Col>
//                     <Col>${cart.itemsPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Shipping</Col>
//                     <Col>${cart.shippingPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Tax</Col>
//                     <Col>${cart.taxPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>
//                       <strong> Order Total</strong>
//                     </Col>
//                     <Col>
//                       <strong>${cart.totalPrice.toFixed(2)}</strong>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <div className="d-grid">
//                     <Button
//                       type="button"
//                       onClick={placeOrderHandler}
//                       disabled={cart.cartItems.length === 0}
//                     >
//                       Place Order
//                     </Button>
//                   </div>
//                   {loading && <LoadingBox></LoadingBox>}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import './PlaceOrderScreen.css'; // We'll create this CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div className="place-order-screen">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order | Sweet Delights</title>
      </Helmet>
      
      <div className="pastry-shop-header">
        <h1 className="my-3">Almost There! Review Your Order</h1>
        <p className="subtitle">One last check before we prepare your sweet treats</p>
      </div>
      
      <Row>
        <Col md={8}>
          <Card className="mb-3 pastry-card">
            <Card.Body>
              <Card.Title className="card-title-pastry">
                <i className="fas fa-truck"></i> Shipping Details
              </Card.Title>
              <Card.Text className="pastry-text">
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping" className="pastry-edit-link">
                <i className="fas fa-edit"></i> Edit Shipping
              </Link>
            </Card.Body>
          </Card>

          <Card className="mb-3 pastry-card">
            <Card.Body>
              <Card.Title className="card-title-pastry">
                <i className="fas fa-credit-card"></i> Payment Method
              </Card.Title>
              <Card.Text className="pastry-text">
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment" className="pastry-edit-link">
                <i className="fas fa-edit"></i> Edit Payment
              </Link>
            </Card.Body>
          </Card>

          <Card className="mb-3 pastry-card">
            <Card.Body>
              <Card.Title className="card-title-pastry">
                <i className="fas fa-birthday-cake"></i> Your Sweet Selection
              </Card.Title>
              <ListGroup variant="flush" className="pastry-items">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id} className="pastry-item">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded pastry-img"
                        ></img>
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.slug}`} className="pastry-item-name">
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3} className="text-center">
                        <span className="pastry-quantity">Qty: {item.quantity}</span>
                      </Col>
                      <Col md={3} className="text-end">
                        <span className="pastry-price">${item.price}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart" className="pastry-edit-link">
                <i className="fas fa-edit"></i> Edit Cart
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="pastry-summary-card">
            <Card.Body>
              <Card.Title className="summary-title">
                <i className="fas fa-receipt"></i> Order Summary
              </Card.Title>
              <ListGroup variant="flush" className="summary-list">
                <ListGroup.Item className="summary-item">
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="summary-item">
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice === 0 ? 'FREE' : `$${cart.shippingPrice.toFixed(2)}`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="summary-item">
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="summary-total">
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="place-order-container">
                  <div className="d-grid">
                    <Button
                      className="place-order-btn"
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      {cart.cartItems.length === 0 
                        ? 'Cart is Empty' 
                        : 'Place Order & Enjoy Your Treats!'}
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}