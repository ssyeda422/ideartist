import { ToggleButtonGroup } from 'react-bootstrap';
import './App.css';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("scene")
  const [inputList, setInputList] = useState([]);
  const [catCount, setCatCount] = useState(1.0);

  const radios = [
    { name: 'scene', value: 'scene' },
    { name: 'character', value: 'character' },
    { name: 'object', value: 'object' },
    { name: 'creature', value: 'creature' },
    { name: 'situation', value: 'situation' }
  ];

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

  const handleClick = () => {

    setLoading(true)
    fetch('https://ideartist-server.netlify.app/.netlify/functions/server/data', requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData.answer.choices[0].message.content)
        setLoading(false);
        setResponse(responseData.answer.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

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
      margin: 7px;
    }
    .btn-outline-secondary {
      border-color: white;
      color: white;
    }
    `}</style>


      <header class="fullBg App-header">

        <Stack className="justify-content-center align-items-center">
          <h1 class="title display-5">Welcome to Ide<span>artist</span></h1>
          <p class="lead">Select a category to get started, or add your own!</p>

          <div>
            <ButtonGroup className="m-1 choices">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="flat"
                  name="radio"
                  value={radio.value}
                  checked={value === radio.value}
                  onChange={e => { setValue(e.target.value) }}
                >
                  {radio.name}
                </ToggleButton>
              ))}
              <ToggleButton onClick={addBtnClick} variant="flat" value="add">+</ToggleButton>
            </ButtonGroup>
          </div>
          <div className="addChoice">
          <Stack direction="horizontal" gap={2} className="choices">
          {inputList.map((item) => (
            <InputGroup key={item.id}>
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
          </div>

          <div className="d-grid p-4 mt-1">
            <Button onClick={handleClick} size="lg" variant="dark">generate prompt!</Button>
          </div>


            {loading ? (
              <Spinner animation="border" />
            ) : (
              <div className="answerTxt">
              <p class="lead"><em>{response}</em></p>
              </div>
            )}



        </Stack>

      </header>

    </div >
  );
}

export default App;
