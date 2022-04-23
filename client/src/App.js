import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./views/main";
import { UserProvider } from "./context/userContext";
import Loginyregistro from "./views/LoginYregistro";
import Createpirate from "./views/createPirate";
import Detail from "./views/Detail";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/pirates" element={<Main></Main>} />
            <Route path="/" element={<Loginyregistro></Loginyregistro>} />
            <Route path="/pirates/new" element={<Createpirate></Createpirate>}></Route>
            <Route path="/pirates/:id" element={<Detail></Detail>}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
