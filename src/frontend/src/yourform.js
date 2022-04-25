import { useState } from "react";
import './yourform.css';

function YourForm() {
  const [pengguna, setPengguna] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nama Pengguna: ${pengguna}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="labelInput">Nama Pengguna: <br></br>
        <input className="inputfile"
          type="text" 
          value={pengguna}
          placeholder="<pengguna>"
          onChange={(e) => setPengguna(e.target.value)}
        />
      </label>
    </form>
  )
}
export default YourForm;