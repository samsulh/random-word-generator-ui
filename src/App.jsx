import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [category, setCategory] = useState("");
  const [length, setLength] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  // Fetch a random word and its definition from the backend
  const fetchWord = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/random-word",
        {
          params: { category, length },
        }
      );
      setWord(response.data.word);
      setDefinition(response.data.definition || "Definition not available.");
    } catch (error) {
      setWord("No word found!");
      setDefinition("");
    }
  };

  return (
    <div className="container">
      <h1>Airah's Random Word Generator</h1>

      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any</option>
          <option value="N">Noun</option>
          <option value="V">Verb</option>
          <option value="A">Adjective</option>
        </select>
      </div>

      <div className="form-group">
        <label>Length:</label>
        <select value={length} onChange={(e) => setLength(e.target.value)}>
          <option value="">Any</option>
          {[...Array(9)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
          <option value="10+">10+</option>
        </select>
      </div>

      <button onClick={fetchWord}>Get Word</button>

      <div className="result">
        <h2>{word}</h2>
        <p className="definition">{definition}</p>
      </div>

      <footer>HoqueTech Industries ©{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
