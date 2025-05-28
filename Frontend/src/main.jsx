import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./Redux/authstore.jsx"; // ✅ Import Redux Store
import { Provider } from "react-redux";
import React from 'react';

createRoot(document.getElementById('root')).render(
  <Provider
  store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
)