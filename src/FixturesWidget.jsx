import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function FixturesWidget() {
    const [games, setGames] = useState([])

    useEffect(() => {
        async function fetchGames() {
            const { data, error } = await supabase
               .from('games')
               .select(`
                id,
                date,
                home_score,
                away_score,
                status,
                home_team:home_team_id (name),
                away_team:away_team_id (name)
                `)
                .order('date', { ascending: true})
                 
          setGames(data)
          console.log('games data:', data, 'error:', error)
        }
        fetchGames()
    }, [])
    
    return (
        <div className="fixtures-widget">
            <h3>Fixtures</h3>
            {games.map(game => (
              <div key={game.id} className="fixture-row">
                 <span className="fixture-team home">{game.home_team.name}</span>
                 <span className="fixture-score">{game.home_score?? '-'} : {game.away_score ?? '-'}</span>
                 <span className="fixture-team away">{game.away_team.name}</span>
              </div>
            ))}
        </div>
    )
}

export default FixturesWidget