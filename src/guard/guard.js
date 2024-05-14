import Cookies from 'js-cookie';
import { accessToken } from '../constant/constant'; // Adjust the import according to your setup

export const isLogined = () => {
  const getAccessToken = Cookies.get(accessToken);
  return !!getAccessToken;
};