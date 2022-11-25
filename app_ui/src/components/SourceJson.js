import React, { useState, useRef, useEffect } from 'react'

export default function SourceJson(props) {


  const [checked, setChecked] = useState(false);
  const [file_name, setFileName] = useState("A");
  const [file_names, setFileNames] = useState(['SBI', 'Kotak']);
  const [mapping, set_mapping] = useState(null);
  const [output_json, set_output] = useState(null);
  const textRef = useRef("");

  const prettyPrint = () => {
    var obj = JSON.parse(textRef.current.value);
    var pretty = JSON.stringify(obj, null, 4);
    textRef.current.value = pretty;

    console.log(textRef.current.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(file_name)

    try {

      const form_data = new FormData();
      form_data.append("json_mapping", mapping);
      // form_data.append("source", textRef.current.value);
      // form_data.append("inputName", file_name);
      console.log(form_data);

      fetch('http://localhost:3000/transform/json', { method: 'POST', body: form_data }).then((res) => {
        props.collectInput(res.data);
      }
      ).catch((err) => { console.log(err) });

      const files = await fetch('http://localhost:3000/file_names/fetch', { method: 'GET' });
      setFileNames(files);

    }
    catch (err) {
      console.log(err);
    }
    console.log(textRef.current.value);

    props.collectInput(textRef.current.value);


  }


  useEffect(() => {

    setFileNames(props.files)

  }, [props.files])

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

  // }, [checked]);


  const onCheckHandler = () => {


    setChecked(true)
    async function fetchfiles() {
      // You can await here
      try {
        console.log("api call to fetch list of maps");
        const files = await fetch('http://localhost:3000/file_names/fetch', {
          method: 'GET'
        });

        const data = await files.json()
        console.log(data);
        setFileNames(data);
      }
      catch (err) {
        console.log(err);
      }

    }
    fetchfiles();




  }



  return (
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h3>Source JSON:</h3>
          <hr />

          <form onSubmit={submitHandler}>
            <div class="form-group">
              <textarea className="form-control" style={{ height: "240px" }} ref={textRef} onChange={prettyPrint}></textarea>
            </div>

            <div className="checkBox-input">
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onCheckHandler}
                />
                &nbsp;Select from already existing Mapping Files
              </label>
            </div>

            <div className="mt-3">
              {checked ? (

                <select name="selectList" id="selectList" className="form-control" onChange={(e) => { setFileName(e.target.value) }}>
                  {file_names.length > 0 ? file_names.map((fn) => {
                    return (
                      <option value={fn}>{fn}</option>
                    );
                  }) : <option value="Nothing found">Nothing Found</option>}

                </select>

              ) : (
                <input type="file" className="form-control" id="myFile" name="filename" onChange={(e) => { setFileName(e.target.files[0].name); set_mapping(e.target.files[0]) }} />
              )}
            </div>

            <div class="form-group my-3">
              <button type="submit" id="submit-code" class="btn btn-success">Generate Target JSON</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
