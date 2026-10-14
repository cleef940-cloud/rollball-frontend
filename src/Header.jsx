import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'

function Header() {
   const [sidebarOpen, setSidebarOpen] = useState(false)


    return (
        <header className="site-header">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="logo">Rollball Series</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/roster">Roster</Link>
            </nav>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </header> 
    )
}

export default Header