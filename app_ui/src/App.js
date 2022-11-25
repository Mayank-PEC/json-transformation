import React, { useState, useEffect } from "react";
import SourceJson from "./components/SourceJson";
import TargetJson from "./components/TargetJson";
import Nav from "./components/Nav";

function App() {
  const [inp, setinp] = useState("");
  const [fileNames, setFileNames] = useState([])


  const collectInput = (val) => {
    setinp(val);
  };

  // useEffect(() => {

  //   async function fetchfiles() {
  //     // You can await here
  //     try {
  //       console.log("api call to fetch list of maps");
  //       const files = await fetch('http://localhost:3000/file_names/fetch', {
  //         method: 'GET'
  //       });

  //       const data = await files.json()
  //       console.log(data);
  //       setFileNames(data);
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }

  //   }
  //   fetchfiles();

  // }, []);

  return (
    <div>
      <Nav />
      <SourceJson collectInput={collectInput} files={fileNames} />
      <TargetJson outputval={inp} />
    </div>
  );
}

export default App;
