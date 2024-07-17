import React from "react";
import "./App.css";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const Api_Key = import.meta.env.VITE_GIPHY_API_KEY;
  const [loading, setLoading] = useState("");
  const [gif, setGif] = useState("");
  const [tag, setTag] = useState("Random");
  async function fetchGif() {
    setLoading(true);
    try {
      const giphy = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${Api_Key}&tag=${tag}`
      );
      console.log(giphy);
      setGif(giphy.data.data.images.downsized_large.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchGif();
  }, []);
  return (
    <div className="App">
      <div className="container wavy-background">
        <h1 className="heading">Random GIFS</h1>
        <h2 className="random_head">A Random {tag} gif</h2>
        <div className="style_wala">
          {loading ? (
            <HashLoader className="loader" />
          ) : (
            <img src={gif} width={370} height={470} className="img-asli" />
          )}
          <div>
            {" "}
            <input
              type="text"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              className="input"
            />
            <button onClick={() => fetchGif()} className="btn">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
