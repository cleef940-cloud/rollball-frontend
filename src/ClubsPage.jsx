import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function ClubsPage() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, coach_name, founding_date, location')
        .order('name', { ascending: true })

      if (error) {
        console.error('teams error:', error)
        return
      }
      setTeams(data)
    }
    fetchTeams()
  }, [])

  return (
    <div className="clubs-page">
      <div className="clubs-hero-stripe" />
      <h1>Clubs</h1>

      <div className="clubs-grid">
        {teams.map(team => (
          <Link to={`/teams/${team.id}`} key={team.id} className="club-card-link">
            <div className="club-card">
              <div className="club-badge">{getInitials(team.name)}</div>
              <h3>{team.name}</h3>
              <p className="club-location">{team.location}</p>
              <p className="club-coach">Coach: {team.coach_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ClubsPage