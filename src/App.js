import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
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
        <div className="flex flex-wrap my-5 space-x-2">
          {pokemons &&
            pokemons.map((pokemon, idx) => (
              <Link to={`/about/${idx}`}>
                <div
                  key={idx}
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="text-sm px-3 bg-gray-200 text-gray-800 rounded-full"
                >
                  {pokemon.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Switch>
        <Route path="/" exact="true">
          <Home />
        </Route>
        <Route path="/about/:id">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
