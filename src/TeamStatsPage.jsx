import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function TeamStatsPage() {
  const [teamStats, setTeamStats] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [{ data: teams, error: teamsError }, { data: stats, error: statsError }] = await Promise.all([
        supabase.from('teams').select('id, name'),
        supabase.from('player_game_stats').select('score, player:player_id (team_id)')
      ])

      if (teamsError || statsError) {
        console.error('teams error:', teamsError, 'stats error:', statsError)
        return
      }

      const totals = {}
      teams.forEach(team => {
        totals[team.id] = { id: team.id, name: team.name, goals: 0 }
      })

      stats.forEach(row => {
        const teamId = row.player?.team_id
        if (teamId && totals[teamId]) {
          totals[teamId].goals += row.score ?? 0
        }
      })

      const sorted = Object.values(totals).sort((a, b) => b.goals - a.goals)
      setTeamStats(sorted)
    }
    fetchData()
  }, [])

  return (
    <div className="stats-page">
      <div className="stats-hero-stripe" />
      <h1>Team Goals</h1>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.map((team, i) => (
            <tr key={team.id}>
              <td>{i + 1}</td>
              <td className="stats-team-link">
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </td>
              <td className="stats-value">{team.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamStatsPage