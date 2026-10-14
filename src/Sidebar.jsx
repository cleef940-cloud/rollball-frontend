import { Link } from 'react-router-dom'

function Sidebar({ isOpen , onClose }) {
    return (
      <>
       <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button className="sidebar-close" onClick={onClose}>✕</button>

          <nav className="sidebar-links">
            <Link to="/" onClick={onClose}>Home</Link>
            <Link to="/roster" onClick={onClose}>Roster</Link>
            <Link to="/table" onClick={onClose}>Table</Link>
            <Link to="/statistics" onClick={onClose}>Statistics</Link>
            <Link to="/News" onClick={onClose}>News</Link>
            <Link to="/clubs" onClick={onClose}>Clubs</Link>
            <Link to="/about" onClick={onClose}>About Us</Link>
          </nav>
          
          <hr />

          <p className="sidebar-label">Follow Us</p>
          <nav className="sidebar-links secondary">
            <a href="https://www.instagram.com/kenyarollballxd/" target="_blank" rel="noopener noreferrer" onClick={onClose}>Instagram</a>
            <a href="https://www.tiktok.com/@kenyarollballxc" target="_blank" rel="noopener noreferrer" onClick={onClose}>TikTok</a>
            <a href="https://www.youtube.com/@kenyarollballxc" target="_blank" rel="noopener noreferrer" onClick={onClose}>YouTube</a>
          </nav>
        </div>
      </>      
    )
}

export default Sidebar