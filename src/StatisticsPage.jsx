import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function StatisticsPage() {
  const [activeTab, setActiveTab] = useState('scorers')
  const [scorers, setScorers] = useState([])
  const [assisters, setAssisters] = useState([])
  const [keepers, setKeepers] = useState([])
  const [teamGoals, setTeamGoals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [{ data: stats, error: statsError }, { data: teams, error: teamsError }] = await Promise.all([
        supabase
          .from('player_game_stats')
          .select(`
            score,
            assists,
            goals_conceded,
            clean_sheet,
            player:player_id (id, name, jersey_number, position, team_id, team:team_id (name))
          `),
        supabase.from('teams').select('id, name')
      ])

      if (statsError || teamsError) {
        console.error('stats error:', statsError, 'teams error:', teamsError)
        return
      }

      const scorerTotals = {}
      const assistTotals = {}
      const keeperTotals = {}
      const teamTotals = {}

      teams.forEach(team => {
        teamTotals[team.id] = { id: team.id, name: team.name, goals: 0 }
      })

      stats.forEach(row => {
        const player = row.player
        if (!player) return

        if (!scorerTotals[player.id]) {
          scorerTotals[player.id] = {
            id: player.id, name: player.name, jersey_number: player.jersey_number,
            club: player.team?.name ?? '-', goals: 0
          }
        }
        scorerTotals[player.id].goals += row.score ?? 0

        if (!assistTotals[player.id]) {
          assistTotals[player.id] = {
            id: player.id, name: player.name, jersey_number: player.jersey_number,
            club: player.team?.name ?? '-', assists: 0
          }
        }
        assistTotals[player.id].assists += row.assists ?? 0

        if (player.position?.toLowerCase().includes('goal')) {
          if (!keeperTotals[player.id]) {
            keeperTotals[player.id] = {
              id: player.id, name: player.name, jersey_number: player.jersey_number,
              club: player.team?.name ?? '-', cleanSheets: 0, conceded: 0
            }
          }
          if (row.clean_sheet) keeperTotals[player.id].cleanSheets += 1
          keeperTotals[player.id].conceded += row.goals_conceded ?? 0
        }

        if (player.team_id && teamTotals[player.team_id]) {
          teamTotals[player.team_id].goals += row.score ?? 0
        }
      })

      setScorers(Object.values(scorerTotals).sort((a, b) => b.goals - a.goals).slice(0, 10))
      setAssisters(Object.values(assistTotals).sort((a, b) => b.assists - a.assists).slice(0, 10))
      setKeepers(Object.values(keeperTotals).sort((a, b) => b.cleanSheets - a.cleanSheets).slice(0, 10))
      setTeamGoals(Object.values(teamTotals).sort((a, b) => b.goals - a.goals))
    }
    fetchData()
  }, [])

  return (
    <div className="stats-page">
      <div className="stats-hero-stripe" />
      <h1>Statistics</h1>

      <div className="stats-tabs">
        <button className={activeTab === 'scorers' ? 'stats-tab active' : 'stats-tab'} onClick={() => setActiveTab('scorers')}>Top Scorers</button>
        <button className={activeTab === 'assists' ? 'stats-tab active' : 'stats-tab'} onClick={() => setActiveTab('assists')}>Top Assists</button>
        <button className={activeTab === 'keepers' ? 'stats-tab active' : 'stats-tab'} onClick={() => setActiveTab('keepers')}>Clean Sheets</button>
        <button className={activeTab === 'teams' ? 'stats-tab active' : 'stats-tab'} onClick={() => setActiveTab('teams')}>Team Goals</button>
      </div>

      {activeTab === 'scorers' && (
        <table className="stats-table">
          <thead>
            <tr><th>Pos</th><th>Player</th><th>Club</th><th>Goals</th></tr>
          </thead>
          <tbody>
            {scorers.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td className="stats-team-link"><Link to={`/players/${p.id}`}>{p.name}</Link></td>
                <td>{p.club}</td>
                <td className="stats-value">{p.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'assists' && (
        <table className="stats-table">
          <thead>
            <tr><th>Pos</th><th>Player</th><th>Club</th><th>Assists</th></tr>
          </thead>
          <tbody>
            {assisters.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td className="stats-team-link"><Link to={`/players/${p.id}`}>{p.name}</Link></td>
                <td>{p.club}</td>
                <td className="stats-value">{p.assists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'keepers' && (
        <table className="stats-table">
          <thead>
            <tr><th>Pos</th><th>Keeper</th><th>Club</th><th>Clean Sheets</th><th>Conceded</th></tr>
          </thead>
          <tbody>
            {keepers.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td className="stats-team-link"><Link to={`/players/${p.id}`}>{p.name}</Link></td>
                <td>{p.club}</td>
                <td className="stats-value">{p.cleanSheets}</td>
                <td>{p.conceded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'teams' && (
        <table className="stats-table">
          <thead>
            <tr><th>Pos</th><th>Team</th><th>Goals</th></tr>
          </thead>
          <tbody>
            {teamGoals.map((t, i) => (
              <tr key={t.id}>
                <td>{i + 1}</td>
                <td className="stats-team-link"><Link to={`/teams/${t.id}`}>{t.name}</Link></td>
                <td className="stats-value">{t.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StatisticsPage