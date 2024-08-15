import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const { errorType } = location.state || { errorType: 'generic' };

  let errorMessage;
  switch (errorType) {
    case '404':
      errorMessage = "Page non trouvée. Il semble que la page que vous recherchez n'existe pas.";
      break;
    case '500':
      errorMessage = "Erreur du serveur. Un problème est survenu de notre côté. Veuillez réessayer plus tard.";
      break;
    case 'mock':
      errorMessage = "Mock Data Issue";
      break;
    default:
      errorMessage = "Quelque chose s'est mal passé. Veuillez vérifier votre connexion ou réessayer plus tard.";
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