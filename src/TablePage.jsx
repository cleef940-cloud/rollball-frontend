import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function calculateStandings(teams, games) {
  const stats = {}

  teams.forEach(team => {
    stats[team.id] = {
      id: team.id,
      name: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      form: [],
      next: null
    }
  })

  const playedGames = [...games]
    .filter(g => g.home_score !== null && g.away_score !== null)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const upcomingGames = [...games]
    .filter(g => g.home_score === null || g.away_score === null)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  playedGames.forEach(game => {
    const home = stats[game.home_team_id]
    const away = stats[game.away_team_id]
    if (!home || !away) return

    home.played++
    away.played++
    home.goalsFor += game.home_score
    home.goalsAgainst += game.away_score
    away.goalsFor += game.away_score
    away.goalsAgainst += game.home_score

    if (game.home_score > game.away_score) {
      home.won++; home.points += 3; home.form.push('W')
      away.lost++; away.form.push('L')
    } else if (game.home_score < game.away_score) {
      away.won++; away.points += 3; away.form.push('W')
      home.lost++; home.form.push('L')
    } else {
      home.drawn++; home.points += 1; home.form.push('D')
      away.drawn++; away.points += 1; away.form.push('D')
    }
  })

  upcomingGames.forEach(game => {
    const home = stats[game.home_team_id]
    const away = stats[game.away_team_id]
    if (home && home.next === null) {
      home.next = { opponent: stats[game.away_team_id]?.name ?? '?', venue: 'H' }
    }
    if (away && away.next === null) {
      away.next = { opponent: stats[game.home_team_id]?.name ?? '?', venue: 'A' }
    }
  })

  return Object.values(stats)
    .map(team => ({
      ...team,
      goalDiff: team.goalsFor - team.goalsAgainst,
      form: team.form.slice(-5)
    }))
    .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor)
}

function TablePage() {
  const [standings, setStandings] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [{ data: teams, error: teamsError }, { data: games, error: gamesError }] = await Promise.all([
        supabase.from('teams').select('id, name'),
        supabase.from('games').select('home_team_id, away_team_id, home_score, away_score, date')
      ])

      if (teamsError || gamesError) {
        console.error('teams error:', teamsError, 'games error:', gamesError)
        return
      }

      setStandings(calculateStandings(teams, games))
    }
    fetchData()
  }, [])

  return (
    <div className="table-page">
      <div className="table-hero-stripe" />
      <h1>League Table</h1>

      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Pl</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
            <th>Form</th>
            <th>Next</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, i) => (
            <tr key={team.id}>
              <td>{i + 1}</td>
              <td className="standings-team">{team.name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDiff}</td>
              <td className="standings-pts">{team.points}</td>
              <td>
                <div className="form-badges">
                  {team.form.map((result, idx) => (
                    <span key={idx} className={`form-badge form-${result.toLowerCase()}`}>{result}</span>
                  ))}
                </div>
              </td>
              <td className="standings-next">
                {team.next ? `${team.next.venue} ${team.next.opponent}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablePage