import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import CartPage from './components/cartPage';
import store from './components/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Provider store={store}>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Provider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
