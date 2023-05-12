import './App.css';
import { Home,Landing,Detail,Form} from "./views";
import { Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path="/" render={() => <Landing/>} />
      <Route path="/home" render={() => <Home/>} />
      <Route exact path="/detail" render={() => <Detail/>} />
      <Route exact path="/create" render={() => <Form/>} />
      
        

      
      
    </div>
  );
}

export default App;
