import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Register} from "./Components/Register"
import {Login} from "./Components/Login"
import {Todo} from "./Components/Todo"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let user = false;
  const token = localStorage.getItem("token")
  if(token){
    user = true
  } else {
    user = false
  }

  return (
    <div className="App">

    <BrowserRouter>
      <Routes>

        <Route exact path="/" element = {  !user?<Login />:<Todo />}/>
        <Route exact path="/todo" element = {  user?<Todo />:<Login/>}/>
        <Route exact path="/register" element = {  user?<Todo />:<Register />}/>

      </Routes>
    </BrowserRouter>

    </div>
  );
}


export default App;
