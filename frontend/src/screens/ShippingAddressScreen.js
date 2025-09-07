// import React, { useContext, useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';
// import { Store } from '../Store';
// import CheckoutSteps from '../components/CheckoutSteps';

// export default function ShippingAddressScreen() {
//   const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     fullBox,
//     userInfo,
//     cart: { shippingAddress },
//   } = state;
//   const [fullName, setFullName] = useState(shippingAddress.fullName || '');
//   const [address, setAddress] = useState(shippingAddress.address || '');
//   const [city, setCity] = useState(shippingAddress.city || '');
//   const [postalCode, setPostalCode] = useState(
//     shippingAddress.postalCode || ''
//   );
//   useEffect(() => {
//     if (!userInfo) {
//       navigate('/signin?redirect=/shipping');
//     }
//   }, [userInfo, navigate]);
//   const [country, setCountry] = useState(shippingAddress.country || '');
//   const submitHandler = (e) => {
//     e.preventDefault();
//     ctxDispatch({
//       type: 'SAVE_SHIPPING_ADDRESS',
//       payload: {
//         fullName,
//         address,
//         city,
//         postalCode,
//         country,
//         location: shippingAddress.location,
//       },
//     });
//     localStorage.setItem(
//       'shippingAddress',
//       JSON.stringify({
//         fullName,
//         address,
//         city,
//         postalCode,
//         country,
//         location: shippingAddress.location,
//       })
//     );
//     navigate('/payment');
//   };

//   useEffect(() => {
//     ctxDispatch({ type: 'SET_FULLBOX_OFF' });
//   }, [ctxDispatch, fullBox]);

//   return (
//     <div>
//       <Helmet>
//         <title>Shipping Address</title>
//       </Helmet>

//       <CheckoutSteps step1 step2></CheckoutSteps>
//       <div className="container small-container">
//         <h1 className="my-3">Shipping Address</h1>
//         <Form onSubmit={submitHandler}>
//           <Form.Group className="mb-3" controlId="fullName">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="address">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="city">
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="postalCode">
//             <Form.Label>Postal Code</Form.Label>
//             <Form.Control
//               value={postalCode}
//               onChange={(e) => setPostalCode(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="country">
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <div className="mb-3">
//             <Button
//               id="chooseOnMap"
//               type="button"
//               variant="light"
//               onClick={() => navigate('/map')}
//             >
//               Choose Location On Map
//             </Button>
//             {shippingAddress.location && shippingAddress.location.lat ? (
//               <div>
//                 LAT: {shippingAddress.location.lat}
//                 LNG:{shippingAddress.location.lng}
//               </div>
//             ) : (
//               <div>No location</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <Button variant="primary" type="submit">
//               Continue
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import Card from 'react-bootstrap/Card';
import './ShippingAddressScreen.css'; // We'll create this CSS file

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  };

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);

  return (
    <div className="pastry-shipping-screen">
      <Helmet>
        <title>Shipping Address | Sweet Delights Bakery</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      
      <div className="container small-container pastry-container">
        <div className="pastry-shipping-header">
          <h1 className="my-3">Delivery Details</h1>
          <p className="shipping-subtitle">Where should we deliver your sweet treats?</p>
        </div>
        
        <Card className="pastry-shipping-card">
          <Card.Body>
            <Form onSubmit={submitHandler} className="pastry-shipping-form">
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>
                  <i className="fas fa-user"></i> Full Name
                </Form.Label>
                <Form.Control
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="pastry-form-input"
                  placeholder="Enter your full name"
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>
                  <i className="fas fa-home"></i> Address
                </Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="pastry-form-input"
                  placeholder="Enter your street address"
                />
              </Form.Group>
              
              <div className="form-row">
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>
                    <i className="fas fa-building"></i> City
                  </Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="pastry-form-input"
                    placeholder="Enter your city"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label>
                    <i className="fas fa-envelope"></i> Postal Code
                  </Form.Label>
                  <Form.Control
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="pastry-form-input"
                    placeholder="Enter postal code"
                  />
                </Form.Group>
              </div>
              
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>
                  <i className="fas fa-globe"></i> Country
                </Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="pastry-form-input"
                  placeholder="Enter your country"
                />
              </Form.Group>
              
              <Form.Group className="mb-3 map-section">
                <Form.Label>
                  <i className="fas fa-map-marker-alt"></i> Location
                </Form.Label>
                <div className="map-actions">
                  <Button
                    id="chooseOnMap"
                    type="button"
                    className="map-btn"
                    onClick={() => navigate('/map')}
                  >
                    <i className="fas fa-map"></i> Choose Location On Map
                  </Button>
                  
                  {shippingAddress.location && shippingAddress.location.lat ? (
                    <div className="location-info">
                      <i className="fas fa-check-circle"></i>
                      <span>Location Selected: </span>
                      LAT: {shippingAddress.location.lat.toFixed(4)}
                      {' '}LNG: {shippingAddress.location.lng.toFixed(4)}
                    </div>
                  ) : (
                    <div className="location-info no-location">
                      <i className="fas fa-info-circle"></i>
                      No location selected yet
                    </div>
                  )}
                </div>
              </Form.Group>

              <div className="form-actions">
                <Button variant="primary" type="submit" className="continue-btn">
                  <i className="fas fa-arrow-right"></i> Continue to Payment
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}