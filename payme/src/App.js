
import Homepage from "./components/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import "./index.css"
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div>
      {/* <Homepage></Homepage> */}
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='SignIn' element={<Login/>}></Route>
        <Route path='SignUp' element={<Signup/>}></Route>
        <Route path='wallet' element={<Layout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
