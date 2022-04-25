import React from "react";
import axios from "axios";
import './fileUpload.css';

function UploadFile() {
    const [uploadFile, setUploadFile] = React.useState();
    
    const submitForm = (event) => {
      event.preventDefault();
  
      const dataArray = new FormData();
      dataArray.append("uploadFile", uploadFile);
  
      axios
        .post("api_url_here", dataArray, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
        })
        .catch((error) => {
        });
    };
  
    return (
      <div>
        <form onSubmit={submitForm}>
          <label>
              Sequence DNA: <br></br>
          </label>
          <input className="file"
              type="file" 
              onChange={(e) => setUploadFile(e.target.files)} 
              placeholder={"upload file"}
          />
        </form>
      </div> 
    );
  }
  export default UploadFile;