import logo from './logo.svg';
import './App.css';
import Tictactoe from './Tictactoe';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tictactoe />
        <p>
          メインサイトは<a href="https://shun-wordpress.com/reactjs/">こちら</a>
        </p>
      </header>
    </div>
  );
}

export default App;
