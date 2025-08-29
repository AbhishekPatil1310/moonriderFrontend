import axios from 'axios';

export const getBikeData = () => {
  return axios.get('https://moonriderbackend.onrender.com/api/bikedata/data', { withCredentials: true });
};
  