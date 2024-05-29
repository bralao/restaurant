import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet/> {/* This is where the child routes will be rendered */}
      <footer>Footer</footer>
    </div>
  )
}

export default Main
