//formatage des données
export const formatActivityData = (data) => {
  if (!data ) {
    console.error('Invalid data format for activity:', data);
    return [];
  }
  return data.data.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories
  }));
};

export const kindTranslation = {
  1: 'Cardio',
  2: 'Energie',
  3: 'Endurance',
  4: 'Force',
  5: 'Vitesse',
  6: 'Intensité'
};

export const formatPerformanceData = (data) => {
  if (!data || !data.data || !Array.isArray(data.data.data)) {
    //console.error('Invalid data format:', data);
    return [];
  }
  return data.data.data.map(item => ({
    value: item.value,
    kind: kindTranslation[item.kind]
  }));
};

export const formatAverageSessionsData = (data) => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  return data.data.sessions.map((session, index) => ({
    day: days[index],
    sessionLength: session.sessionLength
  }));
};

export const formatCalories = (calories) => {
  return (calories / 1000).toFixed(3).replace('.', ',');
};