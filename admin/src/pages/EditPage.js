import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { ParamCard } from '../components/ParamCard'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const EditPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [param, setParam] = useState(null)
  const paramId = useParams().id

  const getParam = useCallback(async () => {
    try {
      const fetched = await request(`/api/param/${paramId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setParam(fetched)
    } catch (e) {}
  }, [token, paramId, request])

  useEffect(() => {
    getParam()
  }, [getParam])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1>Admin Edit Page</h1>
      { !loading && param && <ParamCard param={param} />}
    </>
  )
}