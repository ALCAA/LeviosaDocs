import React from 'react';
import './App.css';
import './pages/Editor';
import Editor from './pages/Editor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <title>Realtime Editor/Collaboration</title>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Editor/>
      </header>
    </div>
  );
}

export default App;
