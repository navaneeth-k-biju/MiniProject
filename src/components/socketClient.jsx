import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [credential, setCredential] = useState({})
  const [response, setResponse] = useState({
    login: null,
    home: [],
    profile: null,
    dashboard: null
  })
  useEffect(() => {
    console.log(response.home)
  }, [response])
  
  const url=""
  const signupServer = (cred) => {
    setCredential(cred)
    var form = new FormData()
    form.append('name', cred.name);
    form.append('password', cred.password)
    form.append('rationcard', cred.rationcard)
    console.log("creedntial", cred)
    axios.post(url + "/signup", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      setResponse({ ...response, login: res.data })
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {

  }, []);

  return (
    <SocketContext.Provider value={{ response, setResponse, signupServer }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
