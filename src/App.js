import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
const url = "https://pokeapi.co/api/v2/pokemon?offset=0";
function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => ({
          ...pokemon,
          idx: idx + 1,
        }));
        setPokemons(results);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Router>
      <div className="bg-gray-100">
        <h1 className="text-2xl bg-blue-100 border-2 border-solid border-purple-500 border-opacity-5">
          <Link to="/" exact="true">
            Pokemons
          </Link>
        </h1>
        <div className="w-full flex justify-center p-5 bg-blue-500 ">
          <input
            className="outline-none"
            type="text"
            placeholder="enter pokemon's name"
          />
        </div>
        {/* <div className="flex">
          {pokemons.map((pokemon) => (
            <Link
              to={`/about/${pokemon.idx}`}
              className="border border-purple-500"
              key={pokemon.idx}
            >
              {pokemon.name}
            </Link>
          ))}
        </div> */}
      </div>
      <Switch>
        <Route path="/about/:slug">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
