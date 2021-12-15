import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    id: '',
    password: ''
  })

  useEffect(() => {
    // console.log('Error: ', error)
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message) // hide
      auth.login(data.token, data.userId)
    } catch (e) {}
  }
  
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Auth Page</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input 
                  id='id' 
                  type='text'
                  name='id'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='id'>ID</label>
              </div>
              <div className='input-field'>
                <input 
                  id='password' 
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button 
              className='btn yellow darken-4' 
              style={{margin: 10}}
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button 
              className='btn yellow darken-4'
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}