import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function HeroCarousel() {
  const [slides, setSlides] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    async function fetchSlides() {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('carousel fetch error:', error)
        return
      }

      if (data && data.length > 0) {
        setSlides(data.map(article => ({
          tag: article.tag ?? 'NEWS',
          title: article.title,
          subtitle: article.subtitle,
          action: null,
          photo_url: article.photo_url
        })))
      } else {
        setSlides([{
          tag: 'LIVE',
          title: 'Rollball Series Matches 2026/27',
          subtitle: 'Season highlights and news coming soon.',
          action: '📅 Add fixtures to calendar',
          photo_url: null
        }])
      }
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  if (slides.length === 0) return null

  const goTo = (i) => setIndex(i)
  const prev = () => setIndex((index - 1 + slides.length) % slides.length)
  const next = () => setIndex((index + 1) % slides.length)

  const slide = slides[index]

  return (
    <section
      className="hero"
      style={slide.photo_url ? { backgroundImage: `url(${slide.photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <button className="carousel-arrow left" onClick={prev}>‹</button>
      <button className="carousel-arrow right" onClick={next}>›</button>

      <div className="hero-overlay">
        <span className="hero-tag">{slide.tag}</span>
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
        {slide.action && <button className="banner-btn">{slide.action}</button>}
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel