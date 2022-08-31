import axios from 'axios';

const API_URL = '/api/trails/';

//Create trail
export const createTrail = async (trailData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL , trailData, config);

  return response.data;
};



// Get all trails
const getTrails = async (token) => {

  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}
// // Get user trails
// const getUserTrails = async (token) => {


//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL, config)

//   return response.data
// }

//Delete Trail
export const deleteTrail = async (trailId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + trailId, config);

  return response.data;
};

export const trailService = {
  createTrail,
  deleteTrail,
  // getUserTrails,
  getTrails
};

export default trailService;
