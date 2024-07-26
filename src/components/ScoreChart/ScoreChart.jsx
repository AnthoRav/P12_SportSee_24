import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import dataService from '../../service/globalService';
import { useNavigate } from 'react-router-dom';

const ScoreChart = ({ userId }) => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getUser(userId)
      .then(data => {
        setScore(data.data.todayScore || data.data.score || 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 1 - score }
  ];

  const COLORS = ['#FF0000', '#FBFBFB'];

  return (
    <div className='scoreContainer'>
      <h3>Score</h3>
      <ResponsiveContainer className='scoreContainer_chart' width="100%" height="100%" >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            paddingAngle={5}
            dataKey="value"
            cornerRadius="50%"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='label'>
        {`${(score * 100).toFixed(0)}%`}
        <span>de votre objectif</span>
      </div>
    </div>
  );
};

ScoreChart.prototype = {
  userId: PropTypes.number.isRequired
}

export default ScoreChart;