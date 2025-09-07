// import { useContext } from 'react';
// import { Store } from '../Store';
// import { Helmet } from 'react-helmet-async';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import MessageBox from '../components/MessageBox';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function CartScreen() {
//   const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { cartItems },
//   } = state;

//   const updateCartHandler = async (item, quantity) => {
//     const { data } = await axios.get(`/api/products/${item._id}`);
//     if (data.countInStock < quantity) {
//       window.alert('Sorry. Product is out of stock');
//       return;
//     }
//     ctxDispatch({
//       type: 'CART_ADD_ITEM',
//       payload: { ...item, quantity },
//     });
//   };
//   const removeItemHandler = (item) => {
//     ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
//   };

//   const checkoutHandler = () => {
//     navigate('/signin?redirect=/shipping');
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Shopping Cart</title>
//       </Helmet>
//       <h1>Shopping Cart</h1>
//       <Row>
//         <Col md={8}>
//           {cartItems.length === 0 ? (
//             <MessageBox>
//               Cart is empty. <Link to="/">Go Shopping</Link>
//             </MessageBox>
//           ) : (
//             <ListGroup>
//               {cartItems.map((item) => (
//                 <ListGroup.Item key={item._id}>
//                   <Row className="align-items-center">
//                     <Col md={4}>
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="img-fluid rounded img-thumbnail"
//                       ></img>{' '}
//                       <Link to={`/product/${item.slug}`}>{item.name}</Link>
//                     </Col>
//                     <Col md={3}>
//                       <Button
//                         onClick={() =>
//                           updateCartHandler(item, item.quantity - 1)
//                         }
//                         variant="light"
//                         disabled={item.quantity === 1}
//                       >
//                         <i className="fas fa-minus-circle"></i>
//                       </Button>{' '}
//                       <span>{item.quantity}</span>{' '}
//                       <Button
//                         variant="light"
//                         onClick={() =>
//                           updateCartHandler(item, item.quantity + 1)
//                         }
//                         disabled={item.quantity === item.countInStock}
//                       >
//                         <i className="fas fa-plus-circle"></i>
//                       </Button>
//                     </Col>
//                     <Col md={3}>${item.price}</Col>
//                     <Col md={2}>
//                       <Button
//                         onClick={() => removeItemHandler(item)}
//                         variant="light"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </Button>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h3>
//                     Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
//                     items) : $
//                     {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
//                   </h3>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <div className="d-grid">
//                     <Button
//                       type="button"
//                       variant="primary"
//                       onClick={checkoutHandler}
//                       disabled={cartItems.length === 0}
//                     >
//                       Proceed to Checkout
//                     </Button>
//                   </div>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
import { useContext, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartScreen.css'; // We'll create this CSS file

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [removingItem, setRemovingItem] = useState(null);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. This delicious cake is out of stock!');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    setRemovingItem(item._id);
    setTimeout(() => {
      ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      setRemovingItem(null);
    }, 300);
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div className="cart-screen">
      <Helmet>
        <title>Sweet Cart | Sugar Delights Bakery</title>
      </Helmet>
      
      <div className="cart-header">
        <h1>Your Sweet Cart</h1>
        <p>Full of delicious treats waiting for you!</p>
      </div>
      
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              <div className="empty-cart">
                <div className="empty-cart-icon">🍰</div>
                <h3>Your cart feels lonely!</h3>
                <p>Add some sweet treats to make it happy</p>
                <Link to="/" className="btn btn-primary">Explore Our Cakes</Link>
              </div>
            </MessageBox>
          ) : (
            <ListGroup className="cart-items-list">
              {cartItems.map((item) => (
                <ListGroup.Item 
                  key={item._id} 
                  className={`cart-item ${removingItem === item._id ? 'removing' : ''}`}
                >
                  <Row className="align-items-center">
                    <Col md={4} className="item-info">
                      <div className="item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="item-details">
                        <Link to={`/product/${item.slug}`} className="item-name">{item.name}</Link>
                        <p className="item-description">{item.description?.substring(0, 60)}...</p>
                      </div>
                    </Col>
                    <Col md={3} className="quantity-controls">
                      <div className="quantity-adjuster">
                        <Button
                          onClick={() => updateCartHandler(item, item.quantity - 1)}
                          variant="outline-primary"
                          className="qty-btn"
                          disabled={item.quantity === 1}
                        >
                          −
                        </Button>
                        <span className="quantity">{item.quantity}</span>
                        <Button
                          variant="outline-primary"
                          onClick={() => updateCartHandler(item, item.quantity + 1)}
                          disabled={item.quantity === item.countInStock}
                          className="qty-btn"
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col md={3} className="price-col">
                      <div className="item-price">${item.price}</div>
                      <div className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</div>
                    </Col>
                    <Col md={2} className="remove-col">
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="outline-danger"
                        className="remove-btn"
                        title="Remove from cart"
                      >
                        🗑️
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="cart-summary">
            <Card.Body>
              <div className="summary-header">
                <h2>Order Summary</h2>
              </div>
              <ListGroup variant="flush" className="summary-details">
                <ListGroup.Item className="summary-item">
                  <span>Items ({cartItems.reduce((a, c) => a + c.quantity, 0)})</span>
                  <span>${cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="summary-item">
                  <span>Delivery</span>
                  <span className="free-shipping">FREE</span>
                </ListGroup.Item>
                <ListGroup.Item className="summary-item total">
                  <span>Total Amount</span>
                  <span>${cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="checkout-btn-container">
                  <div className="d-grid">
                    <Button
                      type="button"
                      className="checkout-btn"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Continue to Checkout
                    </Button>
                  </div>
                  <div className="continue-shopping">
                    <Link to="/">← Continue Shopping</Link>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}