import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/layout.jsx';
import Cetagory from './components/body/cetagorySection.jsx';
import FeshionSection from './components/body/feshionSecion.jsx';
import IndividualIntervalsExample from './components/body/cerasoleSilder.jsx';
import Login from './components/login&registration/loginPage.jsx';
import Register from './components/login&registration/registerPage.jsx';
import { Provider } from 'react-redux';
import store from './reduxToolKit/mainStore.js';
import BestOffer from './components/body/BestOfferSection.jsx';
import OrderPage from './components/body/orderPage.jsx';
import CardPage from './components/body/cardPage.jsx';
import Footer from './components/footer/Footer.jsx';
import MyProfile from './components/body/MyProfile.jsx';
import Message from './components/body/Message.jsx';
import MyorderPage from './components/body/MyorderPage.jsx';
import DashboardLogin from './dashboardComponent/DashboardLogin.jsx';
import DashboardLayout from './dashboardComponent/DashboardLayout.jsx';
import DashboardHoem from './dashboardComponent/DashboardHoem.jsx';
import Wishlist from './components/body/Wishlist.jsx';
import MyProfileHome from './components/body/MyProfileHome.jsx';
import AuthGuard from './components/auth/AuthGuard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Layout />),
    children: [
      {
        index: true,
        element: (<div>
          <IndividualIntervalsExample />
          <Cetagory />
          <FeshionSection />
          <BestOffer />

        </div>)

      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "product/:id",
        element: <OrderPage />
      },
      {
        path: "card/",
        element: <AuthGuard key="cart-guard"><CardPage key="cart-page" /></AuthGuard>
      },
      {
        path: "myprofile/",
        element: <AuthGuard><MyProfile /></AuthGuard>,
        children: [
          {
            path: 'home/',
            element: <MyProfileHome />
          },

          {
            path: 'wishlist/',
            element: <Wishlist />
          }
        ]

      },
      {
        path: "myorder/",
        element: <AuthGuard><MyorderPage /></AuthGuard>
      }
    ]
  },

  {
    path: "dashboard/",
    element: (<DashboardLayout />),
    children: [
      {
        index: true,
        path: 'home/',
        element: <DashboardHoem />,
      }
    ]
  },
  {
    path: "message/",
    element: <Message />
  },
  {

    path: 'dashboardlogin/',
    element: <DashboardLogin />
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>  <div className='w-100'>
    <RouterProvider router={router} />

    {/* <App /> */}
  </div>
  </Provider>

)
