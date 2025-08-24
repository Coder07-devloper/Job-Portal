import { Trash2, Calendar, Building, FileText, AlertCircle } from 'lucide-react'

const MyApplications = ({ applications, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending'
      case 'reviewed':
        return 'status-reviewed'
      case 'accepted':
        return 'status-accepted'
      case 'rejected':
        return 'status-rejected'
      default:
        return 'status-pending'
    }
  }

  if (applications.length === 0) {
    return (
      <div className="no-applications">
        <div className="no-applications-content">
          <FileText size={64} className="no-applications-icon" />
          <h3>No Applications Yet</h3>
          <p>You haven't applied to any jobs yet. Start browsing and apply to your dream job!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-applications">
      <div className="applications-header">
        <h2>My Applications ({applications.length})</h2>
        <p>Track the status of your job applications</p>
      </div>

      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="application-title">
                <h3>{application.jobTitle}</h3>
                <div className="application-company">
                  <Building size={16} />
                  <span>{application.company}</span>
                </div>
              </div>
              <div className="application-status">
                <span className={`status-badge ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
            </div>

            <div className="application-details">
              <div className="application-info">
                <div className="info-item">
                  <strong>Applied:</strong> {application.appliedDate}
                </div>
                <div className="info-item">
                  <strong>Name:</strong> {application.firstName} {application.lastName}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {application.email}
                </div>
                {application.phone && (
                  <div className="info-item">
                    <strong>Phone:</strong> {application.phone}
                  </div>
                )}
                <div className="info-item">
                  <strong>Experience:</strong> {application.experience} years
                </div>
              </div>

              <div className="application-cover-letter">
                <h4>Cover Letter:</h4>
                <p>{application.coverLetter.substring(0, 200)}...</p>
              </div>
            </div>

            <div className="application-actions">
              <button 
                className="delete-button"
                onClick={() => onDelete(application.id)}
                title="Delete Application"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="applications-summary">
        <div className="summary-card">
          <h4>Application Summary</h4>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{applications.length}</span>
              <span className="stat-label">Total Applications</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {applications.filter(app => app.status === 'Pending').length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {applications.filter(app => app.status === 'Reviewed').length}
              </span>
              <span className="stat-label">Reviewed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApplications
