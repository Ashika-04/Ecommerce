// // import React, { useContext, useEffect, useReducer } from 'react';
// // import Chart from 'react-google-charts';
// // import axios from 'axios';
// // import { Store } from '../Store';
// // import { getError } from '../utils';
// // import LoadingBox from '../components/LoadingBox';
// // import MessageBox from '../components/MessageBox';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import Card from 'react-bootstrap/Card';

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case 'FETCH_REQUEST':
// //       return { ...state, loading: true };
// //     case 'FETCH_SUCCESS':
// //       return {
// //         ...state,
// //         summary: action.payload,
// //         loading: false,
// //       };
// //     case 'FETCH_FAIL':
// //       return { ...state, loading: false, error: action.payload };
// //     default:
// //       return state;
// //   }
// // };
// // export default function DashboardScreen() {
// //   const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
// //     loading: true,
// //     error: '',
// //   });
// //   const { state } = useContext(Store);
// //   const { userInfo } = state;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const { data } = await axios.get('/api/orders/summary', {
// //           headers: { Authorization: `Bearer ${userInfo.token}` },
// //         });
// //         dispatch({ type: 'FETCH_SUCCESS', payload: data });
// //       } catch (err) {
// //         dispatch({
// //           type: 'FETCH_FAIL',
// //           payload: getError(err),
// //         });
// //       }
// //     };
// //     fetchData();
// //   }, [userInfo]);

// //   return (
// //     <div>
// //       <h1>Dashboard</h1>
// //       {loading ? (
// //         <LoadingBox />
// //       ) : error ? (
// //         <MessageBox variant="danger">{error}</MessageBox>
// //       ) : (
// //         <>
// //           <Row>
// //             <Col md={4}>
// //               <Card>
// //                 <Card.Body>
// //                   <Card.Title>
// //                     {summary.users && summary.users[0]
// //                       ? summary.users[0].numUsers
// //                       : 0}
// //                   </Card.Title>
// //                   <Card.Text> Users</Card.Text>
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //             <Col md={4}>
// //               <Card>
// //                 <Card.Body>
// //                   <Card.Title>
// //                     {summary.orders && summary.users[0]
// //                       ? summary.orders[0].numOrders
// //                       : 0}
// //                   </Card.Title>
// //                   <Card.Text> Orders</Card.Text>
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //             <Col md={4}>
// //               <Card>
// //                 <Card.Body>
// //                   <Card.Title>
// //                     $
// //                     {summary.orders && summary.users[0]
// //                       ? summary.orders[0].totalSales.toFixed(2)
// //                       : 0}
// //                   </Card.Title>
// //                   <Card.Text> Orders</Card.Text>
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //           </Row>
// //           <div className="my-3">
// //             <h2>Sales</h2>
// //             {summary.dailyOrders.length === 0 ? (
// //               <MessageBox>No Sale</MessageBox>
// //             ) : (
// //               <Chart
// //                 width="100%"
// //                 height="400px"
// //                 chartType="AreaChart"
// //                 loader={<div>Loading Chart...</div>}
// //                 data={[
// //                   ['Date', 'Sales'],
// //                   ...summary.dailyOrders.map((x) => [x._id, x.sales]),
// //                 ]}
// //               ></Chart>
// //             )}
// //           </div>
// //           <div className="my-3">
// //             <h2>Categories</h2>
// //             {summary.productCategories.length === 0 ? (
// //               <MessageBox>No Category</MessageBox>
// //             ) : (
// //               <Chart
// //                 width="100%"
// //                 height="400px"
// //                 chartType="PieChart"
// //                 loader={<div>Loading Chart...</div>}
// //                 data={[
// //                   ['Category', 'Products'],
// //                   ...summary.productCategories.map((x) => [x._id, x.count]),
// //                 ]}
// //               ></Chart>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useReducer } from 'react';
// import axios from 'axios';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, summary: action.payload };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default function DashboardScreen() {
//   const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
//     loading: true,
//     summary: {},
//     error: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await axios.get('/api/orders/summary');
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div className="error">{error}</div>
//       ) : (
//         <div className="dashboard">
//           <div className="card">
//             <h2>Orders</h2>
//             <p>{summary.orders?.[0]?.numOrders || 0}</p>
//           </div>
//           <div className="card">
//             <h2>Sales</h2>
//             <p>₹{summary.orders?.[0]?.totalSales?.toFixed(2) || '0.00'}</p>
//           </div>
//           <div className="card">
//             <h2>Users</h2>
//             <p>{summary.users?.[0]?.numUsers || 0}</p>
//           </div>
//           <div className="card">
//             <h2>Products</h2>
//             <p>{summary.products?.[0]?.numProducts || 0}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import './DashboardScreen.css'; // We'll create this CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: {},
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders/summary');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-screen">
      <Helmet>
        <title>Dashboard | Sugar Delights Admin</title>
      </Helmet>
      
      <div className="dashboard-header">
        <h1>Sweet Dashboard</h1>
        <p>Overview of your bakery's performance</p>
      </div>

      {loading ? (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading sweet data...</p>
        </div>
      ) : error ? (
        <div className="dashboard-error">
          <div className="error-icon">😢</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card orders-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h2>{summary.orders?.[0]?.numOrders || 0}</h2>
                <p>Total Orders</p>
              </div>
              <div className="stat-trend">↑ 12%</div>
            </div>

            <div className="stat-card sales-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h2>₹{summary.orders?.[0]?.totalSales?.toFixed(2) || '0.00'}</h2>
                <p>Total Sales</p>
              </div>
              <div className="stat-trend">↑ 18%</div>
            </div>

            <div className="stat-card users-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h2>{summary.users?.[0]?.numUsers || 0}</h2>
                <p>Happy Customers</p>
              </div>
              <div className="stat-trend">↑ 8%</div>
            </div>

            <div className="stat-card products-card">
              <div className="stat-icon">🍰</div>
              <div className="stat-info">
                <h2>{summary.products?.[0]?.numProducts || 0}</h2>
                <p>Delicious Products</p>
              </div>
              <div className="stat-trend">↑ 5%</div>
            </div>
          </div>

          <div className="charts-section">
            <div className="chart-container">
              <h3>Recent Orders</h3>
              <div className="placeholder-chart">
                <div className="chart-bars">
                  <div className="chart-bar" style={{height: '80%'}}>
                    <span className="bar-label">Mon</span>
                  </div>
                  <div className="chart-bar" style={{height: '60%'}}>
                    <span className="bar-label">Tue</span>
                  </div>
                  <div className="chart-bar" style={{height: '90%'}}>
                    <span className="bar-label">Wed</span>
                  </div>
                  <div className="chart-bar" style={{height: '75%'}}>
                    <span className="bar-label">Thu</span>
                  </div>
                  <div className="chart-bar" style={{height: '85%'}}>
                    <span className="bar-label">Fri</span>
                  </div>
                  <div className="chart-bar" style={{height: '95%'}}>
                    <span className="bar-label">Sat</span>
                  </div>
                  <div className="chart-bar" style={{height: '70%'}}>
                    <span className="bar-label">Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <h3>Popular Categories</h3>
              <div className="placeholder-pie">
                <div className="pie-chart">
                  <div className="pie-segment birthday" style={{'--percentage': '40%'}}>
                    <span>Birthday</span>
                  </div>
                  <div className="pie-segment wedding" style={{'--percentage': '25%'}}>
                    <span>Wedding</span>
                  </div>
                  <div className="pie-segment cupcakes" style={{'--percentage': '20%'}}>
                    <span>Cupcakes</span>
                  </div>
                  <div className="pie-segment other" style={{'--percentage': '15%'}}>
                    <span>Other</span>
                  </div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <span className="color-dot birthday-dot"></span>
                    <span>Birthday Cakes</span>
                  </div>
                  <div className="legend-item">
                    <span className="color-dot wedding-dot"></span>
                    <span>Wedding Cakes</span>
                  </div>
                  <div className="legend-item">
                    <span className="color-dot cupcakes-dot"></span>
                    <span>Cupcakes</span>
                  </div>
                  <div className="legend-item">
                    <span className="color-dot other-dot"></span>
                    <span>Other</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                <span className="action-icon">➕</span>
                <span>Add New Product</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span>View Reports</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📦</span>
                <span>Manage Orders</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">👥</span>
                <span>Customer List</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}