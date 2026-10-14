function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-hero-stripe" />

      <section className="about-hero">
        <p className="about-eyebrow">ROLLBALL SERIES KENYA</p>
        <h1>Growing rollball, together.</h1>
        <p className="about-hero-lead">
          A competition built by people who play - and believe Kenyan rollball can go further.
        </p>
      </section>

      <div className="about-content">
        <section className="about-intro">
          <p className="about-eyebrow">WHAT WE DO</p>
          <h2>The Rollball Series</h2>
          <p>
            Hosted in the Nairobi region, the three-month series welcomes rollball teams and
            clubs from every county.
          </p>
          <p>
            Teams compete in organised fixtures with clear rules, prizes, sponsorship
            opportunities, and open communication between organisers and players.
          </p>
        </section>

        <section className="about-vision">
          <p className="about-eyebrow">BUILT BY PLAYERS</p>
          <h2>A bigger future for Kenyan rollball.</h2>
          <p>
            Hosted by alumni and current players, the series is built on a shared belief:
            rollball can grow far beyond its achievements today. We are creating a stronger
            platform to give athletes and clubs more visibility and help the next generation
            take the sport further.
          </p>
        </section>

        <section className="about-commitments">
          <p className="about-eyebrow">OUR COMMITMENTS</p>
          <h2>A fairer, stronger game.</h2>
          <div className="about-commitment-grid">
            <article className="about-card">
              <span className="about-card-number">01</span>
              <h3>Fair play</h3>
              <p>Clear rules, fixtures, and results for every team.</p>
            </article>
            <article className="about-card">
              <span className="about-card-number">02</span>
              <h3>Accountability</h3>
              <p>Transparent handling of fees, prizes, and communication.</p>
            </article>
            <article className="about-card">
              <span className="about-card-number">03</span>
              <h3>Growth</h3>
              <p>More visibility and support for athletes and clubs.</p>
            </article>
          </div>
        </section>

        <section className="about-registration">
          <p className="about-eyebrow">OPEN TO ALL</p>
          <h2>Every county. Every club.</h2>
          <p>Registration is open, with no deadline.</p>
        </section>

        <section className="about-contact">
          <p className="about-eyebrow">CONTACT</p>
          <h2>Be part of the game.</h2>
          <p>Questions? Email <a href="mailto:rollballseries6@gmail.com">rollballseries6@gmail.com</a>.</p>
        </section>
      </div>
    </main>
  )
}

export default AboutPage
