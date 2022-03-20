import React, { createContext } from "react";

const authContext = createContext();
const host = "http://localhost:5000";

const ContextProvider = ({ children }) => {
  const signup_user = () => {
    const url = `${host}/api/auth/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    const newuser = await response.json();

    if (newuser.success) {
      localStorage.setItem("token", newuser.token);
      history("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <authContext.Provider value={{ msgtopython, dronedata }}>
      {children}
    </authContext.Provider>
  );
};

export {ContextProvider,authContext};