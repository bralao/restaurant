import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footer from '../components/Footer'

const Main = () => {
  return (
    <>
      <Navbar/>
      <Outlet/> {/* This is where the child routes will be rendered */}
      <Footer/>
    </>
  )
}

export default Main
