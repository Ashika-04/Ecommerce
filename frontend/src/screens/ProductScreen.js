// import axios from 'axios';
// import { useContext, useEffect, useReducer, useRef, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Form from 'react-bootstrap/Form';
// import Badge from 'react-bootstrap/Badge';
// import Button from 'react-bootstrap/Button';
// import Rating from '../components/Rating';
// import { Helmet } from 'react-helmet-async';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { getError } from '../utils';
// import { Store } from '../Store';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { toast } from 'react-toastify';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REFRESH_PRODUCT':
//       return { ...state, product: action.payload };
//     case 'CREATE_REQUEST':
//       return { ...state, loadingCreateReview: true };
//     case 'CREATE_SUCCESS':
//       return { ...state, loadingCreateReview: false };
//     case 'CREATE_FAIL':
//       return { ...state, loadingCreateReview: false };
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, product: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// function ProductScreen() {
//   let reviewsRef = useRef();

//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');

//   const navigate = useNavigate();
//   const params = useParams();
//   const { slug } = params;

//   const [{ loading, error, product, loadingCreateReview }, dispatch] =
//     useReducer(reducer, {
//       product: [],
//       loading: true,
//       error: '',
//     });
//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });
//       try {
//         const result = await axios.get(`/api/products/slug/${slug}`);
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
//       }
//     };
//     fetchData();
//   }, [slug]);

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart, userInfo } = state;
//   const addToCartHandler = async () => {
//     const existItem = cart.cartItems.find((x) => x._id === product._id);
//     const quantity = existItem ? existItem.quantity + 1 : 1;
//     const { data } = await axios.get(`/api/products/${product._id}`);
//     if (data.countInStock < quantity) {
//       window.alert('Sorry. Product is out of stock');
//       return;
//     }
//     ctxDispatch({
//       type: 'CART_ADD_ITEM',
//       payload: { ...product, quantity },
//     });
//     navigate('/cart');
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!comment || !rating) {
//       toast.error('Please enter comment and rating');
//       return;
//     }
//     try {
//       const { data } = await axios.post(
//         `/api/products/${product._id}/reviews`,
//         { rating, comment, name: userInfo.name },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );

//       dispatch({
//         type: 'CREATE_SUCCESS',
//       });
//       toast.success('Review submitted successfully');
//       product.reviews.unshift(data.review);
//       product.numReviews = data.numReviews;
//       product.rating = data.rating;
//       dispatch({ type: 'REFRESH_PRODUCT', payload: product });
//       window.scrollTo({
//         behavior: 'smooth',
//         top: reviewsRef.current.offsetTop,
//       });
//     } catch (error) {
//       toast.error(getError(error));
//       dispatch({ type: 'CREATE_FAIL' });
//     }
//   };
//   return loading ? (
//     <LoadingBox />
//   ) : error ? (
//     <MessageBox variant="danger">{error}</MessageBox>
//   ) : (
//     <div>
//       <Row>
//         <Col md={6}>
//           <img
//             className="img-large"
//             src={selectedImage || product.image}
//             alt={product.name}
//           ></img>
//         </Col>
//         <Col md={3}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <Helmet>
//                 <title>{product.name}</title>
//               </Helmet>
//               <h1>{product.name}</h1>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Rating
//                 rating={product.rating}
//                 numReviews={product.numReviews}
//               ></Rating>
//             </ListGroup.Item>
//             <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
//             <ListGroup.Item>
//               <Row xs={1} md={2} className="g-2">
//                 {[product.image, ...product.images].map((x) => (
//                   <Col key={x}>
//                     <Card>
//                       <Button
//                         className="thumbnail"
//                         type="button"
//                         variant="light"
//                         onClick={() => setSelectedImage(x)}
//                       >
//                         <Card.Img variant="top" src={x} alt="product" />
//                       </Button>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               Description:
//               <p>{product.description}</p>
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Price:</Col>
//                     <Col>${product.price}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Status:</Col>
//                     <Col>
//                       {product.countInStock > 0 ? (
//                         <Badge bg="success">In Stock</Badge>
//                       ) : (
//                         <Badge bg="danger">Unavailable</Badge>
//                       )}
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>

//                 {product.countInStock > 0 && (
//                   <ListGroup.Item>
//                     <div className="d-grid">
//                       <Button onClick={addToCartHandler} variant="primary">
//                         Add to Cart
//                       </Button>
//                     </div>
//                   </ListGroup.Item>
//                 )}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <div className="my-3">
//         <h2 ref={reviewsRef}>Reviews</h2>
//         <div className="mb-3">
//           {product.reviews.length === 0 && (
//             <MessageBox>There is no review</MessageBox>
//           )}
//         </div>
//         <ListGroup>
//           {product.reviews.map((review) => (
//             <ListGroup.Item key={review._id}>
//               <strong>{review.name}</strong>
//               <Rating rating={review.rating} caption=" "></Rating>
//               <p>{review.createdAt.substring(0, 10)}</p>
//               <p>{review.comment}</p>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//         <div className="my-3">
//           {userInfo ? (
//             <form onSubmit={submitHandler}>
//               <h2>Write a customer review</h2>
//               <Form.Group className="mb-3" controlId="rating">
//                 <Form.Label>Rating</Form.Label>
//                 <Form.Select
//                   aria-label="Rating"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                 >
//                   <option value="">Select...</option>
//                   <option value="1">1- Poor</option>
//                   <option value="2">2- Fair</option>
//                   <option value="3">3- Good</option>
//                   <option value="4">4- Very good</option>
//                   <option value="5">5- Excelent</option>
//                 </Form.Select>
//               </Form.Group>
//               <FloatingLabel
//                 controlId="floatingTextarea"
//                 label="Comments"
//                 className="mb-3"
//               >
//                 <Form.Control
//                   as="textarea"
//                   placeholder="Leave a comment here"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//               </FloatingLabel>

//               <div className="mb-3">
//                 <Button disabled={loadingCreateReview} type="submit">
//                   Submit
//                 </Button>
//                 {loadingCreateReview && <LoadingBox></LoadingBox>}
//               </div>
//             </form>
//           ) : (
//             <MessageBox>
//               Please{' '}
//               <Link to={`/signin?redirect=/product/${product.slug}`}>
//                 Sign In
//               </Link>{' '}
//               to write a review
//             </MessageBox>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ProductScreen;
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import './ProductScreen.css'; // We'll create this CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pastry-product-screen">
      <Row>
        <Col md={6}>
          <div className="product-image-container">
            <img
              className="pastry-img-large"
              src={selectedImage || product.image}
              alt={product.name}
            ></img>
          </div>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush" className="pastry-product-info">
            <ListGroup.Item className="pastry-product-header">
              <Helmet>
                <title>{product.name} | Sweet Delights Bakery</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item className="price-item">
              <i className="fas fa-tag"></i> Price: <span>${product.price}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="thumbnail-section">
                <h3>Gallery</h3>
                <Row xs={1} md={2} className="g-2">
                  {[product.image, ...product.images].map((x) => (
                    <Col key={x}>
                      <Card className="thumbnail-card">
                        <Button
                          className={`thumbnail-btn ${selectedImage === x ? 'active' : ''}`}
                          type="button"
                          variant="light"
                          onClick={() => setSelectedImage(x)}
                        >
                          <Card.Img variant="top" src={x} alt="product" />
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="description-item">
              <h3>
                <i className="fas fa-align-left"></i> Description
              </h3>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className="pastry-order-card">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="order-summary-item">
                  <Row>
                    <Col>
                      <i className="fas fa-tag"></i> Price:
                    </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="order-summary-item">
                  <Row>
                    <Col>
                      <i className="fas fa-box"></i> Status:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success" className="stock-badge">
                          <i className="fas fa-check"></i> In Stock
                        </Badge>
                      ) : (
                        <Badge bg="danger" className="stock-badge">
                          <i className="fas fa-times"></i> Unavailable
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button 
                        onClick={addToCartHandler} 
                        className="add-to-cart-btn"
                      >
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <h2 ref={reviewsRef} className="reviews-title">
          <i className="fas fa-star"></i> Customer Reviews
        </h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox className="no-reviews-msg">
              <i className="fas fa-comment-slash"></i> There are no reviews yet for this delicious treat!
            </MessageBox>
          )}
        </div>
        <ListGroup className="reviews-list">
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id} className="review-item">
              <div className="review-header">
                <strong>{review.name}</strong>
                <span className="review-date">{review.createdAt.substring(0, 10)}</span>
              </div>
              <Rating rating={review.rating} caption=" "></Rating>
              <p className="review-comment">{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3 review-form-section">
          {userInfo ? (
            <form onSubmit={submitHandler} className="review-form">
              <h2>
                <i className="fas fa-pencil-alt"></i> Share Your Experience
              </h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>
                  <i className="fas fa-star"></i> Rating
                </Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="pastry-form-select"
                >
                  <option value="">Select your rating...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excellent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Your comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="pastry-textarea"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button 
                  disabled={loadingCreateReview} 
                  type="submit"
                  className="submit-review-btn"
                >
                  {loadingCreateReview ? 'Submitting...' : 'Submit Review'}
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox className="signin-prompt">
              <i className="fas fa-info-circle"></i> Please{' '}
              <Link to={`/signin?redirect=/product/${product.slug}`} className="signin-link">
                Sign In
              </Link>{' '}
              to share your thoughts about this treat
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;