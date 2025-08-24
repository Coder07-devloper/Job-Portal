import { useState } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'

const JobSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="job-search">
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-group">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="search-input-wrapper">
              <MapPin className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input"
              />
            </div>
            
            <button type="submit" className="search-button">
              <Search size={20} />
              Search Jobs
            </button>
          </div>
        </form>
        
        <div className="search-filters">
          <button className="filter-button">
            <Filter size={16} />
            Advanced Filters
          </button>
        </div>
      </div>
      
      <div className="search-stats">
        <p>Find your dream job from thousands of opportunities</p>
      </div>
    </div>
  )
}

export default JobSearch
