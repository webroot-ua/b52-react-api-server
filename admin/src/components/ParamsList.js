import React from 'react'
import { Link } from 'react-router-dom'

export const ParamsList = ({ params }) => {
  if (!params.length) {
    return <p className='center'>No Params yet</p>
  }

  return (
    <table className='striped'>
        <thead>
          <tr>
              <th>#</th>
              <th>Param</th>
              <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          { params.map((param, index) => {
            return (
              <tr key={param._id}>
                <td>{index + 1}</td>
                <td>{param.text}</td>
                <td>
                  <Link to={`/detail/${param.id}`}>Edit</Link>
                </td>
            </tr>
            )
          }) }
        </tbody>
      </table>
  )
}