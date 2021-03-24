import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
import Navbar from "./Navbar";
const url = "https://pokeapi.co/api/v2/pokemon?offset=0";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ results }) => {
        const data = results.map((data, idx) => ({ ...data, id: idx + 1 }));
        setPokemons(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useMemo(() => {
    if (!text) {
      return setFiltered([]);
    }
    setFiltered(() =>
      pokemons.filter((pokemon) => pokemon.name.includes(text))
    );
  }, [text, pokemons]);
  return (
    <Router>
      <Navbar />
      <div className="w-3/12 mx-auto">
        <div className="mb-3 pt-0 ">
          <input
            className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
            type="text"
            placeholder="enter pokemon's name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <Switch>
        <Route path="/" exact>
          <div className="mx-auto w-3/6 flex flex-wrap my-5">
            {text
              ? filtered.map((item) => (
                  <Link key={item.id} to={`/about/${item.id}`}>
                    {/* <div
                      style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                      className="text-sm px-3 bg-gray-200 text-gray-800 rounded-full"
                    >
                      {item.name}
                    </div> */}
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 last:mr-0 mr-1">
                      {item.name}
                    </span>
                  </Link>
                ))
              : pokemons &&
                pokemons.map((pokemon) => {
                  const { id, name } = pokemon;
                  return (
                    <Link key={id} to={`/about/${id}`}>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 last:mr-0 mr-1">
                        {name}
                      </span>
                      {/* <div
                        style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                        className="text-sm px-3 bg-gray-200 text-gray-800 rounded-full"
                      >
                        {name}
                      </div> */}
                    </Link>
                  );
                })}
          </div>
        </Route>
        <Route path="/about/:id">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
