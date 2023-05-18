import './App.css';
import { Home,Landing,Detail,Form} from "./views";
import { Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" render={() => <Landing/>} />
      <Route path="/home" render={() => <Home/>} />
      <Route exact path="/dogs/detail/:id" render={(props) => <Detail {...props}/>} />
      <Route exact path="/create" render={() => <Form/>} />
      
        

      
      
    </div>
  );
}

export default App;