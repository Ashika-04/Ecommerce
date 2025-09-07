// import React, { useContext, useEffect, useReducer, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { Store } from '../Store';
// import { getError } from '../utils';
// import Container from 'react-bootstrap/Container';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Form from 'react-bootstrap/Form';
// import { Helmet } from 'react-helmet-async';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Button from 'react-bootstrap/Button';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false };
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };
//     case 'UPLOAD_REQUEST':
//       return { ...state, loadingUpload: true, errorUpload: '' };
//     case 'UPLOAD_SUCCESS':
//       return {
//         ...state,
//         loadingUpload: false,
//         errorUpload: '',
//       };
//     case 'UPLOAD_FAIL':
//       return { ...state, loadingUpload: false, errorUpload: action.payload };

//     default:
//       return state;
//   }
// };
// export default function ProductEditScreen() {
//   const navigate = useNavigate();
//   const params = useParams(); // /product/:id
//   const { id: productId } = params;

//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
//     useReducer(reducer, {
//       loading: true,
//       error: '',
//     });

//   const [name, setName] = useState('');
//   const [slug, setSlug] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState('');
//   const [brand, setBrand] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await axios.get(`/api/products/${productId}`);
//         setName(data.name);
//         setSlug(data.slug);
//         setPrice(data.price);
//         setImage(data.image);
//         setImages(data.images);
//         setCategory(data.category);
//         setCountInStock(data.countInStock);
//         setBrand(data.brand);
//         setDescription(data.description);
//         dispatch({ type: 'FETCH_SUCCESS' });
//       } catch (err) {
//         dispatch({
//           type: 'FETCH_FAIL',
//           payload: getError(err),
//         });
//       }
//     };
//     fetchData();
//   }, [productId]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'UPDATE_REQUEST' });
//       await axios.put(
//         `/api/products/${productId}`,
//         {
//           _id: productId,
//           name,
//           slug,
//           price,
//           image,
//           images,
//           category,
//           brand,
//           countInStock,
//           description,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({
//         type: 'UPDATE_SUCCESS',
//       });
//       toast.success('Product updated successfully');
//       navigate('/admin/products');
//     } catch (err) {
//       toast.error(getError(err));
//       dispatch({ type: 'UPDATE_FAIL' });
//     }
//   };
//   const uploadFileHandler = async (e, forImages) => {
//     const file = e.target.files[0];
//     const bodyFormData = new FormData();
//     bodyFormData.append('file', file);
//     try {
//       dispatch({ type: 'UPLOAD_REQUEST' });
//       const { data } = await axios.post('/api/upload', bodyFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           authorization: `Bearer ${userInfo.token}`,
//         },
//       });
//       dispatch({ type: 'UPLOAD_SUCCESS' });

//       if (forImages) {
//         setImages([...images, data.secure_url]);
//       } else {
//         setImage(data.secure_url);
//       }
//       toast.success('Image uploaded successfully. click Update to apply it');
//     } catch (err) {
//       toast.error(getError(err));
//       dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
//     }
//   };
//   const deleteFileHandler = async (fileName, f) => {
//     console.log(fileName, f);
//     console.log(images);
//     console.log(images.filter((x) => x !== fileName));
//     setImages(images.filter((x) => x !== fileName));
//     toast.success('Image removed successfully. click Update to apply it');
//   };
//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Edit Product ${productId}</title>
//       </Helmet>
//       <h1>Edit Product {productId}</h1>

//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//         <Form onSubmit={submitHandler}>
//           <Form.Group className="mb-3" controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="slug">
//             <Form.Label>Slug</Form.Label>
//             <Form.Control
//               value={slug}
//               onChange={(e) => setSlug(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="name">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="image">
//             <Form.Label>Image File</Form.Label>
//             <Form.Control
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="imageFile">
//             <Form.Label>Upload Image</Form.Label>
//             <Form.Control type="file" onChange={uploadFileHandler} />
//             {loadingUpload && <LoadingBox></LoadingBox>}
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="additionalImage">
//             <Form.Label>Additional Images</Form.Label>
//             {images.length === 0 && <MessageBox>No image</MessageBox>}
//             <ListGroup variant="flush">
//               {images.map((x) => (
//                 <ListGroup.Item key={x}>
//                   {x}
//                   <Button variant="light" onClick={() => deleteFileHandler(x)}>
//                     <i className="fa fa-times-circle"></i>
//                   </Button>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="additionalImageFile">
//             <Form.Label>Upload Aditional Image</Form.Label>
//             <Form.Control
//               type="file"
//               onChange={(e) => uploadFileHandler(e, true)}
//             />
//             {loadingUpload && <LoadingBox></LoadingBox>}
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="category">
//             <Form.Label>Category</Form.Label>
//             <Form.Control
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="brand">
//             <Form.Label>Brand</Form.Label>
//             <Form.Control
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="countInStock">
//             <Form.Label>Count In Stock</Form.Label>
//             <Form.Control
//               value={countInStock}
//               onChange={(e) => setCountInStock(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <div className="mb-3">
//             <Button disabled={loadingUpdate} type="submit">
//               Update
//             </Button>
//             {loadingUpdate && <LoadingBox></LoadingBox>}
//           </div>
//         </Form>
//       )}
//     </Container>
//   );
// }
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ProductEditScreen.css'; // We'll create this CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };
  return (
    <div className="pastry-admin-screen">
      <Container className="small-container pastry-container">
        <Helmet>
          <title>Edit Product {productId} | Sweet Delights Bakery</title>
        </Helmet>
        
        <div className="pastry-admin-header">
          <h1>Edit Sweet Treat</h1>
          <p className="admin-subtitle">Update your delicious creation</p>
        </div>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Card className="pastry-form-card">
            <Card.Body>
              <Form onSubmit={submitHandler} className="pastry-form">
                <div className="form-row">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>
                      <i className="fas fa-cookie"></i> Treat Name
                    </Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="slug">
                    <Form.Label>
                      <i className="fas fa-link"></i> URL Slug
                    </Form.Label>
                    <Form.Control
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                </div>
                
                <div className="form-row">
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>
                      <i className="fas fa-tag"></i> Price
                    </Form.Label>
                    <Form.Control
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>
                      <i className="fas fa-box"></i> Quantity in Stock
                    </Form.Label>
                    <Form.Control
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                </div>
                
                <div className="form-row">
                  <Form.Group className="mb-3" controlId="category">
                    <Form.Label>
                      <i className="fas fa-layer-group"></i> Category
                    </Form.Label>
                    <Form.Control
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>
                      <i className="fas fa-store"></i> Brand
                    </Form.Label>
                    <Form.Control
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      className="pastry-input"
                    />
                  </Form.Group>
                </div>
                
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>
                    <i className="fas fa-image"></i> Main Image URL
                  </Form.Label>
                  <Form.Control
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="pastry-input"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label className="upload-label">
                    <i className="fas fa-cloud-upload-alt"></i> Upload Main Image
                  </Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={uploadFileHandler} 
                    className="pastry-upload"
                  />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="additionalImage">
                  <Form.Label>
                    <i className="fas fa-images"></i> Additional Images
                  </Form.Label>
                  {images.length === 0 && (
                    <div className="no-images-msg">No additional images added yet</div>
                  )}
                  <ListGroup variant="flush" className="images-list">
                    {images.map((x) => (
                      <ListGroup.Item key={x} className="image-item">
                        <div className="image-url">{x}</div>
                        <Button 
                          variant="light" 
                          onClick={() => deleteFileHandler(x)}
                          className="delete-image-btn"
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="additionalImageFile">
                  <Form.Label className="upload-label">
                    <i className="fas fa-cloud-upload-alt"></i> Upload Additional Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => uploadFileHandler(e, true)}
                    className="pastry-upload"
                  />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>
                    <i className="fas fa-align-left"></i> Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="pastry-textarea"
                  />
                </Form.Group>
                
                <div className="form-actions">
                  <Button 
                    disabled={loadingUpdate} 
                    type="submit"
                    className="update-btn"
                  >
                    {loadingUpdate ? 'Updating...' : 'Update Sweet Treat'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/admin/products')}
                    className="cancel-btn"
                  >
                    Cancel
                  </Button>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}