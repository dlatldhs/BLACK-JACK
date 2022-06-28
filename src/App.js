import Header from "./components/Header";
import Blackjack from './components/Blackjack';
import "./header.css";
import "./background.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Blackjack />
    </div>
  );
}
