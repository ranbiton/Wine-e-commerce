import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <Link className="navbar-brand" to="/">
              <img alt="logo" src="/images/logo.png" style={{ maxWidth: '2000px' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SimpleHeader;
