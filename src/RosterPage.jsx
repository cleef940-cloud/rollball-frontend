import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import './App.css'

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function RosterPage() {
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('All')
  const [clubFilter, setClubFilter] = useState('All')
  const [genderFilter, setGenderFilter] = useState('All')

  useEffect(() => {
    async function fetchPlayers() {
      const { data, error } = await supabase
        .from('players')
        .select(`
          id,
          name,
          jersey_number,
          position,
          photo_url,
          gender,
          team:team_id (name)
        `)

      setPlayers(data)
      console.log('players data:', data, 'error:', error)
    }
    fetchPlayers()
  }, [])

  const positions = ['All', ...new Set(players.map(p => p.position))]
  const clubs = ['All', ...new Set(players.map(p => p.team?.name).filter(Boolean))]
  const genders = ['All', ...new Set(players.map(p => p.gender).filter(Boolean))]

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter
    const matchesClub = clubFilter === 'All' || player.team?.name === clubFilter
    const matchesGender = genderFilter === 'All' || player.gender === genderFilter
    return matchesSearch && matchesPosition && matchesClub && matchesGender
  })

  return (
    <div className="roster-page">
      <h1>Rollball Series</h1>

      <div className="roster-controls">
        <input
          type="text"
          className="roster-search"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="roster-filter"
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
        >
          {clubs.map(club => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>

        <select
          className="roster-filter"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        >
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <select
          className="roster-filter"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>

        <button className="roster-reset" onClick={() => { setSearchTerm(''); setPositionFilter('All'); setClubFilter('All'); setGenderFilter('All') }}>
          Reset
        </button>
      </div>

      <table className="roster-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Club</th>
            <th>Position</th>
            <th>Gender</th>
            <th>Jersey #</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map(player => (
            <tr key={player.id}>
              <td>
                <Link to={`/players/${player.id}`} className="roster-row-link">
                  {player.photo_url ? (
                    <img src={player.photo_url} alt={player.name} className="roster-avatar" />
                  ) : (
                    <div className="roster-avatar-badge">{getInitials(player.name)}</div>
                  )}
                  <span>{player.name}</span>
                </Link>
              </td>
              <td>{player.team?.name ?? '-'}</td>
              <td>{player.position}</td>
              <td>{player.gender ?? '-'}</td>
              <td>#{player.jersey_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RosterPage