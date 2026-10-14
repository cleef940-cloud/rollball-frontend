const newsItems = [
    { id: 1, title: "JKUAT Hunters edge kursa in thriller", tag: "Match Report" },
    { id: 2, title: "Season Week 6 preview: who's in form?", tag: "Preview" },
    { id: 3, title: "Player spotlight:Trump Onyango's rise", tag: "Feature" },
    { id: 4, title: "League standings tighten ahead of derby", tag: "News" },
 ]

 function NewsGrid() {
    return (
     <div className="news-grid">
       {newsItems.map(item => (
         <div key={item.id} className="news-card">
           <span className="news-tag">{item.tag}</span>
           <h4>{item.title}</h4> 
        </div>
       ))}
     </div>
   )  
 }


 export default NewsGrid