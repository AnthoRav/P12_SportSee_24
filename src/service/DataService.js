import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getUser = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.log(error)
        // Server responded with a status other than 200 range
        if (error.response.status === 404) {
          throw new Error('404');
        } 
      } else {
        throw new Error('500');
      }
    });
};

export const getUserActivity = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/activity`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('404');
        } 
      } else {
        throw new Error('500');
      }
    });
};

export const getUserAverageSessions = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/average-sessions`)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('404');
        } 
      } else {
        throw new Error('500');
      }
    });
};

export const getUserPerformance = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/performance`)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('404');
        }
      } else {
        throw new Error('500');
      }
    });
};

