// UserProvider.js
import React, { useEffect, useState } from 'react';
import UserContext from './useContext';

const UserProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [user,setUser]=useState({})

  const updatePage = (newPage) => {
    setPage(newPage);
   // console.log("page",page)
  };
  useEffect(()=>{
    console.log(user)
  },[user])

  const updateUser = (user)=>{
    console.log("user in context",user)
    setUser(user)
  }

  return (
    <UserContext.Provider value={{ page, updatePage,user,updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
