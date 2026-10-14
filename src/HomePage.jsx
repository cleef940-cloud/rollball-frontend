import NewsGrid from'./NewsGrid'
import FixturesWidget from './FixturesWidget'
import HeroCarousel from './HeroCarousel'

function HomePage() {
    return (
     <div>
        <HeroCarousel />
        <FixturesWidget />
        <NewsGrid />
      </div>    
     
)
}

export default HomePage