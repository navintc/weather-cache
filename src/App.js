import './App.css';
import Weather from './pages/weather/weather';

function App() {
  return (
    <div className="App">
      <Weather/>


      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin='true'></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossOrigin='true'></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossoOigin='true'></script>

      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;
