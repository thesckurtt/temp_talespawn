import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const Home = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/game" replace />;
  }
  return (
    <main className="main-site-home vh-100 vw-100 d-flex justify-content-center align-items-center flex-column">
      <div className="logo-xxl mb-5">
        <img src="./img/logo-xxl.png" alt="" />
      </div>
      <div className="d-flex flex-column">
        <Link className="btn-rpg mb-3" to="/login">Login</Link>
        <Link className="btn-rpg" to="/register">Register</Link>
      </div>
    </main>
  )
}

export default Home
