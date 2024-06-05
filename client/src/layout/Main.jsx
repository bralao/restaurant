import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footer from '../components/Footer'

const Main = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen">
        <Outlet/> {/* This is where the child routes will be rendered */}
      </div>
      <Footer/>
    </>
  )
}

export default Main
