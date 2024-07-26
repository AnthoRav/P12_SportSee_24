// @ts-nocheck
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import dataService from '../../service/globalService';
import IconCal from '../../assets/energy-icon.png';
import IconProt from '../../assets/protein-icon.png';
import IconCarb from '../../assets/carbs-icon.png';
import IconFat from '../../assets/fat-icon.png';
import { formatCalories } from '../../mappers/userDataMapper';
import { useNavigate } from 'react-router-dom';

const Macronutrients = ({ icon, amount, label }) => (
  <div className="nutrition">
    <div className="nutrition_icon-container">
      <img src={icon} alt={label} className="nutrition_icon" />
    </div>
    <div className="nutrition_info">
      <span className="nutrition_info-amount">{amount}</span>
      <span className="nutrition_info-label">{label}</span>
    </div>
  </div>
  );

const NutrientInfos = ({ userId }) => {
  const [keyData, setKeyData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getUser(userId)
      .then(data => {
        setKeyData(data.data.keyData);
        //console.log('Fetched data:', data.data.keyData)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);

  return (
      <div className="nutrientContainer">
        <Macronutrients icon={IconCal} amount={`${formatCalories(keyData.calorieCount)}kCal`} label="Calories" />
        <Macronutrients icon={IconProt} amount={`${keyData.proteinCount}g`} label="Proteines" />
        <Macronutrients icon={IconCarb} amount={`${keyData.carbohydrateCount}g`} label="Glucides" />
        <Macronutrients icon={IconFat} amount={`${keyData.lipidCount}g`} label="Lipides" />
    </div>
  )
}

Macronutrients.prototype = {
  icon: PropTypes.element.isRequired,
  amount: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
NutrientInfos.prototype = {
  userId: PropTypes.number.isRequired,
  keyData: PropTypes.shape({
    calorieCount: PropTypes.number.isRequired,
    proteinCount: PropTypes.number.isRequired,
    carbohydrateCount: PropTypes.number.isRequired,
    lipidCount: PropTypes.number.isRequired,
  }).isRequired
}

export default NutrientInfos