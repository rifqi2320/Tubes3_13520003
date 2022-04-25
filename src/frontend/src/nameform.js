import { useState } from "react";
import './nameform.css';

function MyForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nama Penyakit: ${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="labelInput">Nama Penyakit: <br></br>
        <input className="inputfile"
          type="text" 
          value={name}
          placeholder="penyakit"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
  )
}
export default MyForm;