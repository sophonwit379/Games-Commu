import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from "react-router-dom";
import { router } from './pages/router';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer/>
    </Provider>

)
