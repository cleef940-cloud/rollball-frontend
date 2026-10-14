import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function PlayerProfile() {
    const { id } = useParams()
    const [player, setPlayer] = useState(null)
    const [stats, setStats] = useState([])

    useEffect(() => {
        async function fetchPlayer() {
            const { data: playerData, error: playerError } = await supabase
              .from('players')
              .select('*')
              .eq('id', id)
              .single()

           setPlayer(playerData)

           const { data: statsData, error: statsError } = await supabase
             .from('player_game_stats')
             .select('score, fouls, cards, game_id')
             .eq('player_id', id)
             .order('game_id', { ascending: true })

            setStats(statsData)
        }
    fetchPlayer()
    }, [id])

    if (!player) return <p>Loading...</p>

    return (
        <div className="player-profile">
            <h1>{player.name}</h1>
            <p>#{player.jersey_number} - {player.position}</p>
            <p>Age: {player.age_year}</p>
            <p>Height: {player.height} inches</p>
            <p>Status: {player.status}</p>
            <p>{player.bio}</p>

            {stats.length > 0 ? (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={stats} barSize={30}>
                    <XAxis dataKey="game_id" stroke="#f5f5f5" />
                    <YAxis stroke="#f5f5f5" allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey= "score" fill="#006644" name="Score" />
                    <Bar dataKey="fouls" fill="#bb0000" name="Fouls" />
                    <Bar dataKey="cards" fill="#f5c518" name="Cards" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>No game stats recorded yet.</p>
            )}
        </div>
    )
}

export default PlayerProfile