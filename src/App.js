import './App.css';
import Weather from './pages/weather/weather';
import React from 'react';
// import 'dotenv/config';

console.log(process.env);
// eslint-disable-next-line require-jsdoc
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
        crossOrigin='true'></script>

      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;
