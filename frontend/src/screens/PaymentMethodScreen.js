// import React, { useContext, useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { Store } from '../Store';

// export default function PaymentMethodScreen() {
//   const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { shippingAddress, paymentMethod },
//   } = state;

//   const [paymentMethodName, setPaymentMethod] = useState(
//     paymentMethod || 'PayPal'
//   );

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate('/shipping');
//     }
//   }, [shippingAddress, navigate]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
//     localStorage.setItem('paymentMethod', paymentMethodName);
//     navigate('/placeorder');
//   };
//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3></CheckoutSteps>
//       <div className="container small-container">
//         <Helmet>
//           <title>Payment Method</title>
//         </Helmet>
//         <h1 className="my-3">Payment Method</h1>
//         <Form onSubmit={submitHandler}>
//           <div className="mb-3">
//             <Form.Check
//               type="radio"
//               id="PayPal"
//               label="PayPal"
//               value="PayPal"
//               checked={paymentMethodName === 'PayPal'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <Form.Check
//               type="radio"
//               id="Stripe"
//               label="Stripe"
//               value="Stripe"
//               checked={paymentMethodName === 'Stripe'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <Button type="submit">Continue</Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import './PaymentMethodScreen.css'; // Import the CSS file

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  
  return (
    <div className="payment-container">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="payment-content">
        <Helmet>
          <title>Payment Method - Sweet Delights Bakery</title>
        </Helmet>
        <h1 className="payment-title">Payment Method</h1>
        <Form onSubmit={submitHandler} className="payment-form">
          <div className="payment-option">
            <Form.Check
              type="radio"
              id="PayPal"
              label={
                <span>
                  <i className="fab fa-paypal payment-icon"></i>
                  PayPal
                </span>
              }
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="payment-option">
            <Form.Check
              type="radio"
              id="Stripe"
              label={
                <span>
                  <i className="fab fa-cc-stripe payment-icon"></i>
                  Stripe
                </span>
              }
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit" className="continue-btn">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}