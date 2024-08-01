import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import dataService from '../../service/globalService';
import { useNavigate } from 'react-router-dom';

const ScoreRadialChart = ({ userId }) => {
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
    {  x: score * 10, fill: '#FF0000' }
  ];

  return (
    <div className='scoreContainer'>
      <h3>Score</h3>
      <ResponsiveContainer className='scoreContainer_chart' width="100%" aspect={1} id="radialChart" height="100%">
            <RadialBarChart data={data}
                innerRadius="62%"
                outerRadius="85%"
                startAngle={230}
                endAngle={-230}
                barSize={10}>
                <PolarAngleAxis
                    type="number"
                    domain={[0, 10]}
                    angleAxisId={0}
                    tick={false}
                />
                
                <RadialBar
                    background={false}
                    dataKey="x"
                    cornerRadius={30 / 2}
                    fill="#0BEFF2"
                />
            </RadialBarChart>
        </ResponsiveContainer>
                <div className='label'>
        {`${(score * 100).toFixed(0)}%`}
        <span>de votre objectif</span>
      </div>
      </div>
  );
};

ScoreRadialChart.prototype = {
  userId: PropTypes.number.isRequired
}

export default ScoreRadialChart;