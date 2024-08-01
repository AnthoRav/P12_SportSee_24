// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ActivityChart from '../../components/ActivityChart/AcivityChart';
import Hello from '../../components/Hello/Hello';
import TimeSessionsChart from '../../components/TimeSessions/TimeSessionsChart';
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart';
import NutrientInfos from '../../components/NutrientInfos/NutrientInfos';
import Loader from '../../components/Loader/Loader';
import dataService from '../../service/globalService';
import ScoreRadialChart from '../../components/ScoreRadialChart/ScoreRadialChart';

const Dashboard = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);

  return (
    <Loader loader={() => dataService.getUser(userId)}>
      {userInfo => (
    <section className='maincontainer'>
      <Hello userId={numericUserId} />
      <div className='maincontainer_dash'>
        <div className='maincontainer_chart'>
          <ActivityChart userId={numericUserId} />
          <div className='maincontainer_chart-details'>
            <TimeSessionsChart userId={numericUserId} />
            <PerformanceChart userId={numericUserId} />
            <ScoreRadialChart userId={numericUserId} />
          </div>
        </div>
        <NutrientInfos userId={numericUserId} />
      </div>
    </section>
    )}
    </Loader>
  )
}
Dashboard.propTypes = {
  numericUserId: PropTypes.number
};

export default Dashboard