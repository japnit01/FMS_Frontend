import authContext from "./authContext";

const AuthState = (props) => {
    const host = "http://localhost:5000"; 

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
        window.location.reload();

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
        window.location.reload();

      } 
      else {
        alert("Invalid Credentials");
      }
    }

  const logout = async()=>{
    let url = `${host}/api/auth/logout`;

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userlogout = await response.json();
    console.log(userlogout);

    if (userlogout.success) {
      localStorage.clear();
      window.location.reload();

    } 
  }
    return (
      <authContext.Provider value={{signupuser,loginuser,logout}}>
        {props.children}
      </authContext.Provider>
    );
  };

  export default AuthState;