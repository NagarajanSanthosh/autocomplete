"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(-1);
  const resultsRef = useRef([]);

  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResults(json?.recipes || []);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setIndex((prev) => (prev + 1) % results.length)
    }
    if (e.key === 'ArrowUp') {
      setIndex((prev) => (prev - 1 + results.length) % results.length)
    }
  }
  useEffect(() => {
    const timer = setTimeout(fetchData, 300)
  }, [input]);

  useEffect(() => {
    if (index >= 0 && index < results.length && resultsRef.current[index]) {
      resultsRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [index]);
  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <input
        type="text"
        className="input-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onKeyDown={handleKeyDown}
      />

      {show && (
        <div className="results-container">
          {results.map((r, idx) => (
            <span
              className="result"
              key={r.id}
              ref={el => resultsRef.current[idx] = el}
              style={{ backgroundColor: idx === index ? '#0a2a66' : 'transparent' }}
            >
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
