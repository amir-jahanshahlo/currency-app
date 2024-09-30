import "./App.css";
import CurrencyConverter from "./components/currency-con";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
