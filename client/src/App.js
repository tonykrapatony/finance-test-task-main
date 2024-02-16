import './App.css';
import Chart from './components/Chart/Chart';
import TickerList from './components/Tickers/TickerList';

function App() {

  return (
    <div className="App">
      <TickerList />
      <Chart />
    </div>
  );
}

export default App;
