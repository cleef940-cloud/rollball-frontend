import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function TeamDetailPage() {
  const { id } = useParams()
  const [teamName, setTeamName] = useState('')
  const [scorers, setScorers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [{ data: team, error: teamError }, { data: stats, error: statsError }] = await Promise.all([
        supabase.from('teams').select('name').eq('id', id).single(),
        supabase
          .from('player_game_stats')
          .select('score, player:player_id (id, name, jersey_number, team_id)')
      ])

      if (teamError || statsError) {
        console.error('team error:', teamError, 'stats error:', statsError)
        return
      }

      setTeamName(team?.name ?? '')

      const totals = {}
      stats.forEach(row => {
        const player = row.player
        if (!player || String(player.team_id) !== String(id)) return
        if (!totals[player.id]) {
          totals[player.id] = { id: player.id, name: player.name, jersey_number: player.jersey_number, goals: 0 }
        }
        totals[player.id].goals += row.score ?? 0
      })

      setScorers(Object.values(totals).sort((a, b) => b.goals - a.goals))
    }
    fetchData()
  }, [id])

  return (
    <div className="stats-page">
      <div className="stats-hero-stripe" />
      <h1>{teamName} — Scorers</h1>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Player</th>
            <th>Jersey #</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((player, i) => (
            <tr key={player.id}>
              <td>{i + 1}</td>
              <td className="stats-team-link">
                <Link to={`/players/${player.id}`}>{player.name}</Link>
              </td>
              <td>#{player.jersey_number}</td>
              <td className="stats-value">{player.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamDetailPage