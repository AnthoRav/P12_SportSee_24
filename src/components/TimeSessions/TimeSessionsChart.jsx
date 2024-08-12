// @ts-nocheck
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatAverageSessionsData } from '../../mappers/userDataMapper';
import dataService from '../../service/globalService';
import { useNavigate } from 'react-router-dom';

function CustomTooltip({ active, payload }) {
  return active && payload ? (
    <div className="tooltip-time">
      <span>{`${payload[0].value} min`}</span>
    </div>
  ) : null;
};

const TimeSessionsChart = ({ userId }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    dataService.getUserAverageSessions(userId)
      .then(data => {
        const formattedData = formatAverageSessionsData(data);
        // Ajouter des points fictifs aux extrémités
      formattedData.unshift({ day: '', sessionLength: formattedData[0].sessionLength });
      formattedData.push({ day: '', sessionLength: formattedData[formattedData.length - 1].sessionLength });
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        navigate('/error', { state: { errorType: error.message } });
      });
  }, [userId, navigate]);

  return (
    <div className='timesession'>
      <h3>Durée moyenne des <br /> sessions</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}  margin={{ top: 65, right: 0, left: 0, bottom: 5 }} onMouseMove={(e) => {
            if (e.isTooltipActive) {
              setHoverIndex(e.activeTooltipIndex);
            } else {
              setHoverIndex(null);
            }
          }} >
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity={0.3} />
              <stop offset="100%" stopColor="white" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false}  stroke="white" opacity={0.5} tickLine={false} tick={{
              fontSize: 12,
              fontWeight: 500,
            }}  />
          <YAxis hide domain={['auto', 'auto']}
            padding={{ top: 40, bottom: 50 }} />
          <Tooltip content={CustomTooltip} cursor={{ stroke: hoverIndex !== null ? 'transparent' : 'rgba(255, 255, 255, 0.5)' }} />
          {/* <ReferenceLine x="L" ifOverflow="extendDomain" />
          <ReferenceLine x="D" ifOverflow="extendDomain" /> */}
          {/* <Area type="monotone" dataKey="sessionLength" stroke="none" fill="#FF0D0D" /> */}
          <Line type="monotone" dataKey="sessionLength" stroke="url(#colorUv)" strokeWidth={2} dot={false} activeDot={{
              stroke: 'rgba(255,255,255, 0.4)',
              strokeWidth: 8,
              r: 5,
            }} />
        </LineChart>
      </ResponsiveContainer >
      {hoverIndex !== null && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: `${(hoverIndex / (data.length - 1)) * 100}%`,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};

TimeSessionsChart.prototype = {
  userId: PropTypes.number.isRequired
}

export default TimeSessionsChart;