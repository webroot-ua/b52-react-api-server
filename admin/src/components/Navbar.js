import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <a href="/">API Server Adminko</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/edit/1">Edit</NavLink></li>
          <li><NavLink to="/log">Log</NavLink></li>
          <li><NavLink to="params">Params</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Exit</a></li>
        </ul>
      </div>
    </nav> 
  )

}