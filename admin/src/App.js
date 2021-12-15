import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  // const isAuthenticated = !!token  // to boolean
  const isAuthenticated = (true)
  const routes = useRoutes(isAuthenticated)

  // if (!ready) {        // wait checking authorization
  //   return <Loader />
  // }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
      <Navbar/>
        <div className="container">
          <p>Adminko started</p>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App