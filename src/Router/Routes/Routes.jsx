import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import PreventLogIn from './../PreventLogin/PreventLogIn';
import Login from "../../pages/Login/Login";
import ImagesStories from "../../pages/Stories/Stories";
import Shorts from "../../pages/Shorts/Shorts";
import OffsiteLayout from "../../Layouts/Offsite/OffsiteLayout";
import OnsiteLayout from "../../Layouts/Onsite/OnsiteLayout";
import NonLogInHomePage from "../../pages/Offsite/NonLogInHomePage/NonLogInHomePage";
import NonLogInCityPage from "../../pages/Offsite/NonLogInCityPage/NonLogInCityPage";
import AllRestaurantOfTheCity from "../../pages/Others/AllRestaurantOfTheCity/AllRestaurantOfTheCity";
import LoginContainer from "../../pages/Login/LoginContainer";
import RestaurantHomePage from "../../pages/Shared/RestaurantHomePage/RestaurantHomePage";
import Home from "../../pages/Others/Home/Home";
import NearbyRestaurant from "../../pages/Offsite/NearbyRestaurant/NearbyRestaurant";
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import EditProfile from "../../pages/Shared/Profile/EditProfile/EditProfile";
import MyProfile from "../../pages/Shared/Profile/MyProfile/MyProfile";
import OnsiteRestaurantHomePage from "../../pages/Onsite/OnsiteRestaurantHomePage/OnsiteRestaurantHomePage";
import QRScanner from "../../pages/Others/QrScanner/QrScanner";
import OnsiteCart from "../../pages/Shared/Cart/Cart";
import ShowingOngoingOrders from "../../pages/Onsite/OnsiteRestaurantHomePage/ShowingOngoingOrders/ShowingOngoingOrders";
import Cart from "../../pages/Shared/Cart/Cart";
import Payment from "../../pages/Others/Payment/Payment";
import OffsiteAllOrders from "../../pages/Offsite/OffsiteAllOrders/OffsiteAllOrders";
import OnsiteCompletedOrder from "../../pages/Onsite/OnsiteRestaurantHomePage/OnsiteCompletedOrder/OnsiteCompletedOrder";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <OffsiteLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'story',
                element: <ImagesStories />
            },
            {
                path: 'shorts',
                element: <Shorts />
            },
            {
                path: '/city/:city',
                element: <AllRestaurantOfTheCity />
            },
            {
                path: '/nearby-restaurant',
                element: <PrivateRoute><NearbyRestaurant /></PrivateRoute>
            },
            {
                path: 'restaurant/:res_id/branch/:branchID',
                element: <RestaurantHomePage />
            },
            {
                path: '/pay-my-bill/:orderID',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: '/orders',
                element: <PrivateRoute><OffsiteAllOrders /></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                path: '/edit-profile',
                element: <PrivateRoute><EditProfile /></PrivateRoute>
            },
            {
                path: '/qr-scanner',
                element: <QRScanner />
            },



        ]

    },
    {
        path: '/onsite-order',
        element: <PrivateRoute><OnsiteLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'restaurant/:res_id/branch/:branchID/table/:tableID',
                element: <OnsiteRestaurantHomePage />
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/ongoing-orders/table/:tableID',
                element: <ShowingOngoingOrders />
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/ongoing-orders/table/:tableID/orderID/:orderID',
                element:<></>
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/recent-orders/table/:tableID',
                element:  <ShowingOngoingOrders />
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/recent-orders/table/:tableID/orderID/:orderID',
                element: <></>
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/cart/table/:tableID',
                element: <Cart/>
            },


        ]

    },

    {
        path: '/login',
        element: <PreventLogIn><LoginContainer /></PreventLogIn>
    },
    {
        path: '/home',
        element: <NonLogInHomePage />
    },
    


])
