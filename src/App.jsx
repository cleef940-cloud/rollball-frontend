import { BrowserRouter, Routes , Route } from 'react-router-dom'
import RosterPage from './RosterPage'
import PlayerProfile from './PlayerProfile'
import TopBar from './TopBar'
import HomePage from './HomePage'
import './App.css'
import TablePage from './TablePage'
import TeamStatsPage from './TeamStatsPage'
import TeamDetailPage from './TeamDetailPage'
import StatisticsPage from './StatisticsPage'
import ClubsPage from './ClubsPage'
import NewsPage from './NewsPage'
import AboutPage from './AboutPage'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/players/:id" element={<PlayerProfile />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/teams" element={<TeamStatsPage />}  />
        <Route path="/teams/:id" element={<TeamDetailPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App