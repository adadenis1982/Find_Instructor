import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <div style={{ minHeight: '76.4vh' }} className="mb-5">
        <App />
      </div>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
