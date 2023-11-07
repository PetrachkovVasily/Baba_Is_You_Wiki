import React, { useRef, useState } from "react";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [inputBody, setInputBody] = useState('');

  function handleClick(event) {
    console.log(inputBody);
  }

  return (
    <div className="App">
      <MyButton onClick={handleClick}>
        Baton
      </MyButton>
      <MyInput value={inputBody} onChange={event => setInputBody(event.target.value)} type='text' placeholder='Input for texting'/>
    </div>
  );
}

export default App;
