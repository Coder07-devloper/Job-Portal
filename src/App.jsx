import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import JobSearch from './components/JobSearch'
import JobList from './components/JobList'
import JobApplication from './components/JobApplication'
import MyApplications from './components/MyApplications'
import { Search, Briefcase, User, FileText, Trash2, Plus, Filter } from 'lucide-react'

function App() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [activeTab, setActiveTab] = useState('jobs')
  const [filterCategory, setFilterCategory] = useState('all')

  // Sample job data
  const sampleJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      category: 'Technology',
      description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-friendly web applications using React, JavaScript, and modern web technologies.',
      requirements: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio Pro',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$70,000 - $100,000',
      category: 'Design',
      description: 'Join our creative team as a UX/UI Designer. You will create beautiful and functional user interfaces for web and mobile applications.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      postedDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Solutions',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$90,000 - $130,000',
      category: 'Data',
      description: 'We are seeking a Data Scientist to analyze complex data sets and develop machine learning models to drive business decisions.',
      requirements: ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL'],
      postedDate: '2024-01-13'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'Growth Marketing Co.',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      category: 'Marketing',
      description: 'Lead our marketing initiatives and develop strategies to increase brand awareness and drive customer acquisition.',
      requirements: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
      postedDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$85,000 - $125,000',
      category: 'Technology',
      description: 'Join our DevOps team to manage cloud infrastructure, implement CI/CD pipelines, and ensure system reliability.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
      postedDate: '2024-01-11'
    }
  ]

  useEffect(() => {
    setJobs(sampleJobs)
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleApply = (job) => {
    setSelectedJob(job)
    setShowApplicationForm(true)
  }

  const handleApplicationSubmit = (applicationData) => {
    const newApplication = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      ...applicationData,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    }
    setApplications([...applications, newApplication])
    setShowApplicationForm(false)
    setSelectedJob(null)
  }

  const handleDeleteApplication = (applicationId) => {
    setApplications(applications.filter(app => app.id !== applicationId))
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', 'Technology', 'Design', 'Data', 'Marketing']

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <Filter size={20} />
              Filter by Category
            </h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              <Briefcase size={20} />
              Browse Jobs
            </button>
            <button
              className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              <FileText size={20} />
              My Applications ({applications.length})
            </button>
          </div>

          {activeTab === 'jobs' && (
            <div className="jobs-section">
              <JobSearch onSearch={handleSearch} />
              <JobList 
                jobs={filteredJobs} 
                onApply={handleApply}
                searchTerm={searchTerm}
              />
            </div>
          )}

          {activeTab === 'applications' && (
            <MyApplications 
              applications={applications}
              onDelete={handleDeleteApplication}
            />
          )}
        </div>
      </main>

      {showApplicationForm && selectedJob && (
        <JobApplication
          job={selectedJob}
          onSubmit={handleApplicationSubmit}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </div>
  )
}

export default App
