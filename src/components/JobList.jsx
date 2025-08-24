import { MapPin, Clock, DollarSign, Building, Calendar } from 'lucide-react'

const JobList = ({ jobs, onApply, searchTerm }) => {
  if (jobs.length === 0) {
    return (
      <div className="no-jobs">
        <div className="no-jobs-content">
          <h3>No jobs found</h3>
          <p>
            {searchTerm 
              ? `No jobs match your search for "${searchTerm}". Try different keywords or browse all jobs.`
              : 'No jobs available at the moment. Please check back later.'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="job-list">
      <div className="job-list-header">
        <h2>Available Jobs ({jobs.length})</h2>
        <p>Discover opportunities that match your skills and interests</p>
      </div>
      
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="job-title-section">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-category">{job.category}</span>
              </div>
              <div className="job-company">
                <Building size={16} />
                <span>{job.company}</span>
              </div>
            </div>
            
            <div className="job-details">
              <div className="job-detail">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="job-detail">
                <Clock size={16} />
                <span>{job.type}</span>
              </div>
              <div className="job-detail">
                <DollarSign size={16} />
                <span>{job.salary}</span>
              </div>
              <div className="job-detail">
                <Calendar size={16} />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>
            
            <div className="job-description">
              <p>{job.description.substring(0, 150)}...</p>
            </div>
            
            <div className="job-requirements">
              <h4>Key Requirements:</h4>
              <div className="requirements-tags">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <span key={index} className="requirement-tag">{req}</span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="requirement-tag">+{job.requirements.length - 3} more</span>
                )}
              </div>
            </div>
            
            <div className="job-card-actions">
              <button 
                className="apply-button"
                onClick={() => onApply(job)}
              >
                Apply Now
              </button>
              <button className="save-button">
                Save Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobList
