import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import logo from './assets/Logo.png'

function TopBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
 

  return (
    <>
      {/* Utility bar */}
      <div className="utility-bar">
        <nav className="utility-links">
          <Link to="/" className="utility-active">Rollball Series</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/community">Rollball & Community</Link>
          <Link to="/events">Events</Link>
          <Link to="/media">Media</Link>
          <Link to="/archive">The Archive</Link>
          <Link to="/clubs">Clubs</Link>
        </nav>
      </div>

      {/* Main nav */}
      <div className="main-nav">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
        <div className="main-nav-logo">
          <img src={logo} alt="Rollball Series" className="logo-img" />
          <span>Rollball<br />Series</span>
        </div>
        <nav className="main-nav-links">
          <Link to="/matches">Matches</Link>
          <Link to="/table">Table</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/fantasy">Fantasy</Link>
          <Link to="/news">News</Link>
          <Link to="/games">Games & Trivia</Link>
        </nav>
      </div>

      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default TopBar