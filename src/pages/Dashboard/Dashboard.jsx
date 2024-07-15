import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ActivityChart from '../../components/ActivityChart/AcivityChart';
import Hello from '../../components/Hello/Hello';
import TimeSessionsChart from '../../components/TimeSessions/TimeSessionsChart';
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart';
import ScoreChart from '../../components/ScoreChart/ScoreChart';
import NutrientInfos from '../../components/NutrientInfos/NutrientInfos';

export default function Dashboard() {
  const { userId } = useParams();
  const numericUserId = Number(userId);

  return (
    <section className='maincontainer'>
      <Hello userId={numericUserId} />
      <div className='maincontainer_dash'>
        <div className='maincontainer_chart'>
          <ActivityChart userId={numericUserId} />
          <div className='maincontainer_chart-details'>
            <TimeSessionsChart userId={numericUserId} />
            <PerformanceChart userId={numericUserId} />
            <ScoreChart userId={numericUserId} />
          </div>
        </div>
        <NutrientInfos userId={numericUserId} />
      </div>
    </section>
  )
}
Dashboard.propTypes = {
  numericUserId: PropTypes.number
};

