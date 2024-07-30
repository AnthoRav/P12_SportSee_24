import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Loader = ({ loader, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    loader()
      .then(responseData => {
        setData(responseData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [loader]);

  if (loading) {
    return <div className='loader'>Chargement...</div>;
  }

  if (!data) {
    navigate('/error');
  }

  return children(data);
};

Loader.propTypes = {
  loader: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default Loader;