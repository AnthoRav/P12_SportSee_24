import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const { errorType } = location.state || { errorType: 'generic' };

  let errorMessage;
  switch (errorType) {
    case '404':
      errorMessage = '404 - Page Not Found';
      break;
    case '500':
      errorMessage = '500 - Internal Server Error';
      break;
    case 'mock':
      errorMessage = 'Mock Data Issue';
      break;
    default:
      errorMessage = 'An unexpected error has occurred.';
  }

  return (
    <div className='errorpage'>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

ErrorPage.propTypes = {
  errorType: PropTypes.string
};

export default ErrorPage;