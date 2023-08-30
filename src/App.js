// import logo from './logo.svg';
import { ToggleButtonGroup } from 'react-bootstrap';
import './App.css';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleClick = () => {

    const params = {
      messages: [{ "role": "user", "content": "Can you generate a random description of a scene in 5 words as a drawing prompt?" }],
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      temperature: 1,
    };

    axios({

      // Endpoint to send files
      url: 'https://api.openai.com/v1/chat/completions',
      method: "POST",
      headers: {
        'authorization': "Bearer " + apiKey,
        'Content-Type': "application/json",
      },
      data: params,
    })
      .then(response => {
        setResponse(response.data.choices[0].message.content);
        setLoading(false);
        console.log(response.data.choices[0].message.content)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <style type="text/css">
        {`
    .btn-flat {
      background-color: teal;
      color: white;
      border-radius: 1px;
      margin: 10px;

    }`}</style>


      <header className="App-header">

        <Stack className="justify-content-md-center align-items-center">
          <h1 class="display-6">Welcome to IdeArtist</h1>
          <p class="lead">Select a category to get started, or add your own!</p>
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton variant="flat" id="tbg-radio-1" value={1}>scene</ToggleButton>
            <ToggleButton variant="flat" id="tbg-radio-2" value={2}>character</ToggleButton>
            <ToggleButton variant="flat" id="tbg-radio-3" value={3}>object</ToggleButton>
            <ToggleButton variant="flat" id="tbg-radio-4" value={4}>creature</ToggleButton>
            <ToggleButton variant="flat" id="tbg-radio-5" value={5}>situation</ToggleButton>
            <ToggleButton variant="flat" id="tbg-radio-6" value={6}>+</ToggleButton>
          </ToggleButtonGroup>
          {/* <div class="mt-2 mb-2">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton variant="flat" id="tbg-radio-1" value={1}>category 1</ToggleButton>
              <ToggleButton variant="flat" id="tbg-radio-2" value={2}>category 2</ToggleButton>
              <ToggleButton variant="flat" id="tbg-radio-3" value={3}>category3</ToggleButton>
            </ToggleButtonGroup>
          </div> */}
          <div className="d-grid p-4">
            <Button onClick={handleClick} size="lg" variant="dark" style={{ borderRadius: '20px', }}>generate prompt!</Button>
          </div>

          <div>
            {loading ? (
              <p>Spinning wheels...</p>
            ) : (
              <>
                {response && <p>{response}</p>}
              </>
            )}
          </div>

        </Stack>

      </header>

    </div>
  );
}

export default App;
