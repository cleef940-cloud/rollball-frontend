import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function NewsPage() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('news error:', error)
        return
      }
      setArticles(data)
    }
    fetchArticles()
  }, [])

  return (
    <div className="news-page">
      <div className="news-hero-stripe" />
      <h1>News</h1>

      <div className="news-grid">
        {articles.map(article => (
          <div key={article.id} className="news-card">
            {article.photo_url && (
              <img src={article.photo_url} alt={article.title} className="news-photo" />
            )}
            {article.tag && <span className="news-tag">{article.tag}</span>}
            <h4>{article.title}</h4>
            {article.subtitle && <p>{article.subtitle}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsPage