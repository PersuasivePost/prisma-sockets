import { useState, useEffect, ChangeEvent } from "react";
import io, { Socket } from "socket.io-client";
import Input from "./components/Input";
import "./App.css";

interface Score {
  name?: string;
  score?: string;
}

function App() {
  //const [count, setCount] = useState(0);

  const [score, setScore] = useState<Score>({});

  const socket: Socket = io("localhost:3000");

  function connectSocket() {
    socket.on("connection", (socket: Socket) => {
      console.log(socket);
    });
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    let { name, value } = event.target;
    //console.log({ [name]: value });

    let currentObj: Score = { [name]: value };
  }

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      <Input
        name="name"
        className="input-field"
        placeholder="Enter your name"
        handleInput={handleInput}
      />
      <Input
        name="score"
        className="input-field"
        placeholder="Enter your score"
        handleInput={handleInput}
      />
    </>
  );
}

export default App;
