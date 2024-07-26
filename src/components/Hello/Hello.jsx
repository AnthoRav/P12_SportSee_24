import React, { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import dataService from '../../service/globalService';

 const Hello = ({ userId }) => {
  const [userInfos, setuserInfos] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    dataService.getUser(userId)
    .then(data => {
      setuserInfos(data.data.userInfos.firstName);
      })
      .catch(error => {
        console.error('Error fetching data userInfos:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);


  return (
    <div className="container-hello">
      <h1>
        Bonjour <span className="hello_name" >{userInfos}</span>
      </h1>
      <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏 </h2>
    </div>
  )
}
Hello.propTypes = {
  userId: PropTypes.number.isRequired
};

export default Hello