import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"

const Main = () => {
  return (
    <>
      <Navbar/>
      <Outlet/> {/* This is where the child routes will be rendered */}
 
    </>
  )
}

export default Main
