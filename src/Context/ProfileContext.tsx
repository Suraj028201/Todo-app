import { createContext, useState, useContext } from 'react';

interface User {
  username: string;
  password: string,
  mobile: string;
  image: string;
  otherData: any;
}

interface UserContextType {
  users: User[];
  isLoggedIn: boolean;
  setIsLoggedIn:any
}

const initialUsers: User[] = [
  {
    username: 'John Doe',
    password: 'abcde',
    mobile: '123-456-7890',
    image: 'https://t3.ftcdn.net/jpg/02/05/50/68/360_F_205506807_yOIjKhGr2DTRVDwDPJHTqTKQvIGGyuVm.jpg',
    otherData: { age: 30, email: 'john.doe@example.com' },
  },
  {
    username: 'Jane Smith',
    password: '12345',
    mobile: '555-123-4567',
    image: 'https://i.pinimg.com/236x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9--drawings-of-girls-anime-drawings-girl.jpg',
    otherData: { age: 25, email: 'jane.smith@example.com' },
  },
  {
    username: 'Bob Johnson',
    password: 'abc123',
    mobile: '555-555-5555',
    image: 'https://img.freepik.com/free-vector/terrified-girl-anime-character-poster_603843-3016.jpg?w=2000',
    otherData: { age: 40, email: 'bob.johnson@example.com' },
  },
];

export const UserContext = createContext<UserContextType>({
  users: initialUsers,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const UserProvider = ({ children }:any) => {
  const users = initialUsers;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ users, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useProfile = () => {
    const context = useContext(UserContext);
  
    if (context === undefined) {
      throw new Error('useTodos must be used within a TodoProvider');
    }
  
    return context;
  };

export default UserProvider;
