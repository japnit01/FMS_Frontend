import authContext from "./authContext";

const AuthState = (props) => {
    const host = "https://fest-manage-api.herokuapp.com/";
    
    const signupuser = async(jsonData) => {
      console.log(jsonData)
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
        // history("/");
      } 
      else {
        alert("Invalid Credentials");
      }
    };
  
    const loginuser = async(jsonData) => {
      const url = `${host}/api/auth/login`;
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
        // history("/");
      } 
      else {
        alert("Invalid Credentials");
      }
    }
  
    return (
      <authContext.Provider value={{signupuser,loginuser}}>
        {props.children}
      </authContext.Provider>
    );
  };

  export default AuthState;