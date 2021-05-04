import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddressPage from './pages/AddressPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VotePage from './pages/VotePage';
import useToken from './components/token';
import Results from './pages/Results'

function App() {
    return (
        <div className="App">
            <Router >
                <Navbar />
                <Switch>
                    <Route exact path='/'>
                        <Login useToken={useToken} />
                    </Route>
                    <Route exact path='/Signup'>
                        <Signup />
                    </Route>
                    <Route exact path='/Address'>
                        <AddressPage useToken={useToken}/>
                    </Route>
                    <Route exact path='/Vote'>
                      <VotePage />
                    </Route>
                    <Route exact path='/Results'>
                        <Results />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
