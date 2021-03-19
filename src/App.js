import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./About";
const url = "https://pokeapi.co/api/v2/pokemon?offset=0";
function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(({ results }) => setPokemons(results))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Router>
      <div className="bg-gray-100">
        <h1 className="text-2xl bg-blue-100 border-2 border-solid border-purple-500 border-opacity-5">
          Pokemons
        </h1>
        <div>
          {pokemons.map((pokemon, idx) => (
            <p className="border border-purple-500" key={idx}>
              {pokemon.name}
            </p>
          ))}
        </div>
      </div>
      <Switch>
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
