import { Auth } from 'aws-amplify';

export const getUsernameFromToken = async () => {
    try {
      const session = await Auth.currentSession();
      const accessToken = session.getAccessToken().getJwtToken();
      const tokenPayload = accessToken.split('.')[1];
      const decodedToken = atob(tokenPayload);
      const parsedToken = JSON.parse(decodedToken);
      return parsedToken.username;
    } catch (error) {
      console.error('Error getting username from token:', error);
      return null;
    }
  };
  