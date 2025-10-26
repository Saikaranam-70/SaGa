import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from './User'
import Admin from './Admin'
import Login from './components/Login/Login'

const All = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/admin' element={<Login />} />
      </Routes>
    </div>
  )
}

export default All
