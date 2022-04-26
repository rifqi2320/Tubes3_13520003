import SearchBar from "./searchBar";
import MyForm from "./nameform";
import YourForm from "./yourform";
import FileUpload from "./fileUpload";
import PenyakitForm from "./penyakitform";
import "./App.css";

function App() {
  const handleSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <nav className="navigation">
        <h1 className="head">DNA Pattern Matching</h1>
      </nav>
      <header className="App-header">
        <SearchBar />
        <div className="firstPage">
          <h4>
            <strong>Tambahkan penyakit</strong>
          </h4>
          <div className="inputPenyakit">
            <MyForm />
            <FileUpload />
          </div>
          <br></br>
          <button className="submisi" onClick={handleSubmission}>
            Submit
          </button>
        </div>
        <div className="secondPage">
          <h4 className="juduldua">
            <strong>Tes DNA</strong>
          </h4>
          <div className="DNATES">
            <YourForm />
            <FileUpload />
            <PenyakitForm />
          </div>
          <br></br>
          <button className="submisi" onClick={handleSubmission}>
            Submit
          </button>
        </div>
      </header>
      <footer>
        <p>2022 Copyright Kelompok DNATrain. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
