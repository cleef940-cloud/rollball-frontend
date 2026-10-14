import { Link } from 'react-router-dom'

function getInitials(name) {
    return name
     .split(' ')
     .map(word => word[0])
     .join('')
     .toUpperCase()
     .slice(0,2)
}
function PlayerCard({ player }) {
  return (
    <Link to={`/players/${player.id}`} className="player-card-link"> 
      <div className="player-card">
        {player.photo_url ? (
           <img src={player.photo_url} alt={player.name} className="avatar-photo" />
         ) : (
           <div className="avatar-badge">{getInitials(player.name)}</div> 
        )}
        <p className="jersey-number">#{player.jersey_number}</p>
        <h3>{player.name}</h3>
        <p>{player.position}</p>
        </div>  
     </Link>   
    )
}

export default PlayerCard