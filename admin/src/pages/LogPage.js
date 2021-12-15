import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LogPage = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [log, setLog] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/log/view', 'POST', {from: log}, {
          Authorization: `Bearer ${auth.token}`  //Headers
        })
        console.log(data)
      } catch (e) {}
    }
  }

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
        <h1>Admin Log Page</h1>
        <div className='input-field'>
          <input 
            id='log'
            type='text'
            value={log}
            onChange={e => setLog(e.target.value)}
            onKeyPress={pressHandler} 
          />
        </div>
      </div>
    </div>
  )
}