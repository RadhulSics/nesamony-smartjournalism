import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../baseurl'

function ViewMediaNewsById() {
    const {id} = useParams()

    
  return (
    <div>ViewMediaNewsById {id}</div>
  )
}

export default ViewMediaNewsById