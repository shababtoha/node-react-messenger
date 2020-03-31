import { createContext } from 'react';

 const UserContext = createContext('anonymus');

 export const UserProvider = UserContext.Provider;
 export const UserConsumer = UserContext.Consumer;

 export default UserContext;