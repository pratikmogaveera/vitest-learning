import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const getUserByUserId = async (userId: number): Promise<User> => {
  const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response.data;
};
