import { ToggleButtonGroup } from 'react-bootstrap';
import './App.css';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("scene")
  const [inputList, setInputList] = useState([]);
  const [catCount, setCatCount] = useState(1.0);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      temperature: 1,
      messages: [{ role: "user", content: "Generate a random description of a " + value + " in 10 words as a drawing prompt" }]
    })

};
  //const apiKey = process.env.REACT_APP_API_KEY;

  const handleClick = () => {
    fetch('https://ideartist-server.netlify.app/.netlify/functions/server/data', requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData.answer.choices[0].message.content)
        setResponse(responseData.answer.choices[0].message.content); 
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleChange = (val) => {
    setValue(val);
  }

  const addBtnClick = event => {
    setCatCount(catCount + 1)
    let catID = catCount / 2;
    console.log(catID)
    const addList = inputList.concat({ id: catID });
    setInputList(addList)

  };

  const removeCat = (id) => {
    console.log(id)
    const newList = inputList.filter((item) => item.id !== id);
    setInputList(newList)
  }

  return (
    <div className="App">
      <style type="text/css">
        {`
    .btn-dark {
      border-color: darkslategray;
      background-color: darkslategray;
      border-radius: 20px;
    }
    .btn-dark:hover {
      background-color: rgb(20, 62, 62);
      font-size: 21px;
    }
    .btn-flat, unselect {
      background-color: teal;
      color: white;
      border-radius: 1px;
      margin: 10px;
    }
    .btn-outline-secondary {
      border-color: white;
      color: white;
    }
    `}</style>


      <header className="fullBg App-header">

        <Stack className="justify-content-md-center align-items-center">
          <h1 class="title display-5">Welcome to Ide<span>artist</span></h1>
          <p class="lead">Select a category to get started, or add your own!</p>
          <ToggleButtonGroup type="radio" name="options" defaultValue={value} onChange={handleChange} >
            <ToggleButton variant="flat" id="1" value="scene">scene</ToggleButton>
            <ToggleButton variant="flat" id="2" value="character">character</ToggleButton>
            <ToggleButton variant="flat" id="3" value="object">object</ToggleButton>
            <ToggleButton variant="flat" id="4" value="creature">creature</ToggleButton>
            <ToggleButton variant="flat" id="5" value="situation">situation</ToggleButton>
            <ToggleButton onClick={addBtnClick} variant="flat" value="add">+</ToggleButton>
          </ToggleButtonGroup>
          <Stack direction="horizontal" gap={2} className="mx-auto">
            {inputList.map((item) => (

              <InputGroup className="mb-3" key={item.id}>
                <Form.Control
                  placeholder="Add Category"
                  aria-label="Add Category"
                  onChange={e => { setValue(e.target.value) }}
                />
                <Button onClick={() => removeCat(item.id)} variant="outline-secondary">
                  x
                </Button>
              </InputGroup>
            ))}

          </Stack>
          {/* <div class="mt-2 mb-2">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton variant="flat" id="tbg-radio-1" value={1}>category 1</ToggleButton>
              <ToggleButton variant="flat" id="tbg-radio-2" value={2}>category 2</ToggleButton>
              <ToggleButton variant="flat" id="tbg-radio-3" value={3}>category3</ToggleButton>
            </ToggleButtonGroup>
          </div> */}

          <div className="d-grid p-4 mt-1">
            <Button onClick={handleClick} size="lg" variant="dark">generate prompt!</Button>
          </div>

          <div>

            {response ? (
              <p>{response}</p> // Conditionally render only when data is available
            ) : (
              <p></p> // Display a loading message while waiting for data
            )}
            
          </div>

        </Stack>

      </header>

    </div>
  );
}

export default App;
