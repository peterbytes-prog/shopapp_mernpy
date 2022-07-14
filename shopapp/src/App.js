import logo from './logo.svg';
import ShopJumbotron from './component/shop_jumbotron';
import Navigation from './component/navigation';
import Home from './component/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <ShopJumbotron />
      <Home />
    </div>
  );
}

export default App;
