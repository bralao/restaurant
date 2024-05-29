import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/> {/* This is where the child routes will be rendered */}
      <footer>Footer</footer>
    </div>
  )
}

export default Main
