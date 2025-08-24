import { Briefcase, User, Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Briefcase className="logo-icon" size={32} />
          <h1 className="logo-text">CareerConnect</h1>
        </div>
        
        <nav className="nav-menu">
          <a href="#jobs" className="nav-link active">Jobs</a>
          <a href="#companies" className="nav-link">Companies</a>
          <a href="#resources" className="nav-link">Resources</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
        
        <div className="header-actions">
          <button className="notification-btn">
            <Bell size={20} />
          </button>
          <button className="profile-btn">
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
