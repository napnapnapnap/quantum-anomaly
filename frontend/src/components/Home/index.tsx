import LayoutClient from '../../layouts/Client';
import './Home.scss';
import home from './home.json';

const Home = () => (
  <LayoutClient>
    <article className="home">
      <h1>Quantum Anomaly Gaming Community</h1>
      <p>
        Quantum Anomaly is gaming community originating from playing EVE Online together. In time we started also
        playing other games and we use this website as source of information. We have decided to share some of that
        information publicly with other gamers.
      </p>
      <h2 className="h4">EVE Online</h2>
      {home.items.eve.map(({ url, cover, label, content }) => (
        <a href={url} className="home__link" key={url}>
          <div className="home__header">
            <img src={cover} alt={url} />
          </div>
          <div className="home__content">
            <h4 className="home__title">{label}</h4>
            <p>{content}</p>
          </div>
        </a>
      ))}
      <h2 className="h4">X4 Foundations</h2>
      {home.items.x4.map(({ url, cover, label, content }) => (
        <a href={url} className="home__link" key={url}>
          <div className="home__header">
            <img src={cover} alt={url} />
          </div>
          <div className="home__content">
            <h4 className="home__title">{label}</h4>
            <p>{content}</p>
          </div>
        </a>
      ))}
    </article>
  </LayoutClient>
);

export default Home;
