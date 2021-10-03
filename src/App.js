import './App.css';
import FormInput from './FormInput';
import Template from './Template';
import { useEffect, useState } from 'react';


function App() {
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [madLibTitle, setMadLibTitle] = useState('');
  const [madLibResult, setMadLibResult] = useState('');
  const [inputList, setInputList] = useState([{ 
    prompt: "", 
    value: "" 
  }]);



  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=14`)
      .then(res => res.json())
      .then(jsonRes => {
        setInputList(jsonRes.blanks.map((blank) => {
          return {prompt: blank, value: ""};
        }));
        setMadLibTemplate(jsonRes.value);
        setMadLibTitle(jsonRes.title);
      })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // firebase code if time

    let combinedArray = [];
    for (let i = 0; i < madLibTemplate.length - 1; i++) {
      combinedArray.push(madLibTemplate[i]);
      const word = inputList[i] ? inputList[i].value : "";
      combinedArray.push(word);
    }

    const madLibString = combinedArray.join('');
    setMadLibResult(madLibString);
  }

  

  const handleChange = (e, index) => {
    const updatedInputList = [...inputList];
    updatedInputList[index].value = e.target.value;
    setInputList(updatedInputList);
  }

  return (
    <div className="App">
      <header>
        <h1>Mad-Libs!</h1>
      </header>
      <main>
        <div className="wrapper"> 
          <form onSubmit={handleSubmit}>
            <ul>
              {
                inputList.map((input, index) => {
                  return (
                    <FormInput
                      key={index}
                      prompt={input.prompt}
                      change={(e) => {handleChange(e, index)}}
                      value={input.value}
                      required
                    />
                  )
                })
              }
              {/* <label htmlFor="userName">Pseudonym <span>How would you like to be credited?</span></label>
              <input type="text" id="userName" /> */}
            </ul>

            {/* disable button until all fields filled */}
            <button>Get Mad-Lib</button>
          </form>

          <Template
            title={madLibTitle}
            madLib={madLibResult}
          />
        </div>
      </main>
      <footer>
        <p>Made by Cal Akler at <a href="https://junocollege.com/">Juno College</a>, 2021. Data courtesy of the <a href="https://madlibz.herokuapp.com/api">Madlibz API</a>.</p>
      </footer>
    </div>
  )
}

export default App;