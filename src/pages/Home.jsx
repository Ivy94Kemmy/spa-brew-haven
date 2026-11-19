
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO BREW HAVEN</p>

          <h1>
            Every Cup Tells
            <br />
            a Beautiful Story.
          </h1>

          <p className="hero-description">
            Discover exceptional coffee from around the world.
            From smooth vanilla notes to bold espresso blends,
            find the perfect coffee for every moment.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-button">
              Explore Coffee
            </Link>

            <Link to="/products/new" className="secondary-button">
              Add New Product
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900"
            alt="Freshly roasted coffee beans"
          />
        </div>
      </section>

      <section className="home-about">
        <h2>Our Coffee Collection</h2>

        <p>
          We bring together carefully selected coffee varieties
          from Colombia, Vietnam, Ethiopia and Brazil.
          Quality, flavor and freshness in every cup.
        </p>

        <Link to="/products" className="text-link">
          View Our Products →
        </Link>
      </section>
    </div>
  );
}

export default Home;
