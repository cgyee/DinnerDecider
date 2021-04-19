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

function App() {
    return (
        <div className="App">
            <Router >
                <header className="App-header">
                    <Navbar />
                </header>
                <Switch>
                    <Route exact path='/'>
                        <Login />
                    </Route>
                    <Route exact path='/Signup'>
                        <Signup />
                    </Route>
                    <Route exact path='/Address'>
                        <AddressPage />
                    </Route>
                    <Route exact path='/Vote'>
                      <VotePage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
