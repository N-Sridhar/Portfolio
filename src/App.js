import './App.css';

export default function App() {
  const navigateToNewSite = () => {
    window.location = 'https://sridhar-nallasamy.vercel.app';
  };

  return (
    <div className="App">
      <div className="banner">
        <h3 className="bannerHeading">
          <span role="img">😊</span>
          Please navigate yourself to the new site by clicking the below button
          / link
          <span role="img">🙏🏻</span>
        </h3>
        <button className="bannerButton" onClick={navigateToNewSite}>
          Navigate to New Site!
          <span role="img" className="bannerButtonSpan">
            🔗
          </span>
        </button>
        <h4 className="bannerNewLink">
          <span role="img">📍</span>New Site link:{' '}
          <span onClick={navigateToNewSite}>
            https://sridhar-nallasamy.vercel.app
          </span>
        </h4>
      </div>
      <div className="thankYou">
        <h6>
          Thank You!<span role="img">💚</span>,
        </h6>
        <h6>Sridhar.</h6>
      </div>
    </div>
  );
}
