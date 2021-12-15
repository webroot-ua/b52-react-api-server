import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { EditPage } from './pages/EditPage'
import { LogPage } from './pages/LogPage'
import { ParamsPage } from './pages/ParamsPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/params" element={<ParamsPage />} />
        {/* <Redirect to="log" /> */}
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {/* <Redirect to="/" /> */}
    </Routes>
  )
}