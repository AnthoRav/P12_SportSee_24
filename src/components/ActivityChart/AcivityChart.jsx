// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dataService from '../../service/globalService';
import { formatActivityData } from '../../mappers/userDataMapper';

const CustomTooltip = ({ active, payload }) => {
  return active && payload ? (
    <div className="tooltip">
      <span>{`${payload[0].value} Kg`}</span>
      <span>{`${payload[1].value} KCal`}</span>
    </div>
  ) : null;
};


const ActivityChart = ({ userId }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getUserActivity(userId)
      .then(data => {
        //console.log('ActivityChart response:', data);
        const formattedData = formatActivityData(data);
        //console.log('Formatted Activity Data:', formattedData);
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);

  const getYAxisDomain = (data) => {
    const kilograms = data.map(d => d.kilogram);
    const min = Math.min(...kilograms) - 1;
    const max = Math.max(...kilograms) + 1;
    return [min, max];
  };

  return (
    <div className='activity'>
      <div className='activity_title'>
        <h3>Activité quotidienne</h3>
        <div className='activity_title-infos'>
          <div>
            <span className='activity_title-infos1'></span>
            <span> Poids (kg)</span>
          </div>
          <div>
            <span className='activity_title-infos2'></span>
            <span> Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer aspect={4} max-width={800}>
        <BarChart data={data} margin={{ top: 45, right: 0, left: 0, bottom: 5 }} barCategoryGap={35}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" dx={-1} dy={16} axisLine={false} tickLine={false} 
          tick={{ fontSize: 14, fontWeight: 500, color: "#9B9EAC" }} />

          <YAxis yAxisId="left" dataKey="kilogram" axisLine={false} dx={18} tickLine={false} orientation="right" 
          domain={getYAxisDomain(data)} tick={{ fontSize: 14, fontWeight: 500, color: "#9B9EAC" }} allowDecimals={false} />

          <YAxis yAxisId="right" orientation="left" hide />
          <Tooltip content={CustomTooltip} />
          <Bar yAxisId="left" dataKey="kilogram" fill="#282D30" radius={[50, 50, 0, 0]} maxBarSize={8} name="Poids (kg)" />
          <Bar yAxisId="right" dataKey="calories" fill="#E60000" radius={[50, 50, 0, 0]} maxBarSize={8} name="Calories brûlées" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
};
ActivityChart.propTypes = {
  userId: PropTypes.number.isRequired
};

export default ActivityChart;