import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app.js';
import AuthContext from './context/auth.js';
import SiteContext from './context/site.js';

const Main = () => {

  return (
    <AuthContext>
      <SiteContext>
        <App />
      </SiteContext>
    </AuthContext>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
