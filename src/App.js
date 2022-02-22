import { useState, useEffect } from "react";
import dice from "./images/icon-dice.svg";
import dividerDesktop from "./images/pattern-divider-desktop.svg";
import dividerMobile from "./images/pattern-divider-mobile.svg";

function App() {
  const [id, setId] = useState(0);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [willRoll, setWillRoll] = useState(false);
  const [divider, setDivider] = useState(dividerDesktop);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        const json = await response.json();
        setAdvice(json.slip.advice);
        setId(json.slip.id);
      } catch (error) {
        setError(true);
      }
      setWillRoll(false);
      setLoading(false);
    }
    fetchData();
  }, [willRoll]);
  useEffect(() => {
    // know the size of the screen
    const handleResize = () => {
      if (window.innerWidth < 548) {
        setDivider(dividerMobile);
      } else setDivider(dividerDesktop);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="container">
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <p className="id">Advice #{id}</p>
            <h3>"{advice}"</h3>
          </>
        )}
        {error ? `Error: ${error}` : null}
        <div>
          <img src={divider} alt="divider" className="divider" />
        </div>
      </div>
      <div className="dice-container" onClick={() => setWillRoll(true)}>
        <img src={dice} alt="dice" className="dice" />
      </div>
      <div className="attribution">
        Challenge by {""}
        <a
          href="https://www.frontendmentor.io"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by {""}
        <a href="https://www.frontendmentor.io/profile/genelorenzSarmiento0408">
          Gene Lorenz Sarmiento
        </a>
        .
      </div>
    </>
  );
}

export default App;
