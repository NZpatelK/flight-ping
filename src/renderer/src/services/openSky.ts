import axios from 'axios';

const USERNAME = import.meta.env.VITE_OPENSKY_USER;
const PASSWORD = import.meta.env.VITE_OPENSKY_PASSWORD;

export const getLiveFlights = async () => {
  const res = await axios.get('https://opensky-network.org/api/states/all', {
    auth: {
      username: USERNAME,
      password: PASSWORD
    }
  });
  return res.data.states;
};
