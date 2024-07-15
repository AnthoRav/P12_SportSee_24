import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import dataService from '../../service/globalService';
import { formatPerformanceData, kindTranslation } from '../../models/models';
import { useNavigate } from 'react-router-dom';


export default function PerformanceChart({ userId }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getUserPerformance(userId)
      .then(data => {
        //console.log('Fetched data:', data); // Ajout pour vérifier les données
        const formattedData = formatPerformanceData(data);
        //console.log('Formatted data:', formattedData); // Ajout pour vérifier les données formatées
        // Inverser les données pour obtenir l'ordre correct des labels
      const reorderedData = formattedData.reverse();
        setData(reorderedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);

  return (
    <div className='performanceContainer'>
      <ResponsiveContainer  >
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%" >
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: "white", fontSize: 12 }} dy={4} />
          <PolarRadiusAxis tick={false} axisLine={false} angle={30} domain={[0, 'auto']} />
          <Radar name="Performance" dataKey="value" stroke="none" fill="red" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
PerformanceChart.prototype = {
  userId: PropTypes.number.isRequired
}
