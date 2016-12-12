function HeroTitle({title, subtitle}) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
        </div>
      </div>
    </section>
  );
}

export default HeroTitle;
