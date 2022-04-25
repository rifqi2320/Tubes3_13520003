import { useState } from "react";
import './penyakitform.css';

function PenyakitForm() {
  const [penyakit, setPenyakit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Prediksi Penyakit: ${penyakit}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="labelInput">Prediksi Penyakit: <br></br>
        <input className="inputfile"
          type="text" 
          value={penyakit}
          placeholder="<penyakit>"
          onChange={(e) => setPenyakit(e.target.value)}
        />
      </label>
    </form>
  )
}

export default PenyakitForm;