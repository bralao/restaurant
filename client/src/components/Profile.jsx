import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext)

  const handleLogout = () => {
    logOut().then(() => {
      // Sign-out successful.
      alert("Logout successful")
    }).catch((error) => {
      // An error happened.
      console.error("Logout error", error);
    });
  }

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {
                user.photoURL ?
                <img alt="Tailwind CSS Navbar component" src={user.photoURL}/>
                :
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              }
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Profile</a></li>
            <li><a>Order</a></li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile