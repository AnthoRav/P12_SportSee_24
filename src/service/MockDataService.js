import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './dataMock';

// Simuler une promesse pour les données moquées
const mockFetch = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data) {
        reject(new Error('mock'));
      } else {
        resolve({ data });
      }
    }, 500); // Simule un délai de 500 ms
  });
};

export const getUser = (userId) => {
  const user = USER_MAIN_DATA.find((u) => u.id == userId);
  //console.log(user)
  return mockFetch(user);
};

export const getUserActivity = (userId) => {
  const activity = USER_ACTIVITY.find(activity => activity.userId == userId);
  return mockFetch(activity);
};

export const getUserAverageSessions = (userId) => {
  const sessions = USER_AVERAGE_SESSIONS.find(session => session.userId == userId);
  return mockFetch(sessions);
};

export const getUserPerformance = (userId) => {
  const performance = USER_PERFORMANCE.find(performance => performance.userId == userId);
  return mockFetch(performance);
};

export const formatActivityData = (data) => {
  return data.data.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories
  }));
};