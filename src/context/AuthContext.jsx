import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true" ? true : false
  });

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user")
    if (user) return JSON.parse(user)
  })

  const defUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setUser(user);
  };

  const login = (email, password) => {
    try {
      if (JSON.parse(localStorage.getItem("user"))) {
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (email == localUser.email && password == localUser.password) {
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          setUser(JSON.parse(localStorage.getItem("user")));
          navigate('/game', { replace: true })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const verifyLogin() 

  const logout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, defUser, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)