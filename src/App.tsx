import React, {useEffect} from 'react';
import './App.css';
import Main from "./Components/Main";

function App() {

  useEffect(() => {
    document.title = "ACC driver swap configurator - PS5 server"
  }, []);
  return (
    <Main />
  );
}

export default App;
