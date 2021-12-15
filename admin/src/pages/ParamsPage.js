import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ParamsList } from '../components/ParamsList'

export const ParamsPage = () => {
  const [params, setParams] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchParams = useCallback(async() => {
    try {
      const fetched = await request('/api/params/', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setParams(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchParams()
  }, [fetchParams])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && <ParamsList params={params} /> }
    </>
  )
}