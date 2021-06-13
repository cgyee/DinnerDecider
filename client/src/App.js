import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddressPage from './pages/AddressPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VotePage from './pages/VotePage'
import Results from './pages/Results'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './auth'
/* Change my name! */
// import PollCountPage from './pages/PollCountPage'

// const context = React.createContext(isAuthenticated())
function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Navbar />
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/"
                            redirect="/Login"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/Dashboard"
                            redirect="/Login"
                            component={Dashboard}
                        />
                        {/* <Route exact path='/'><Dashboard /></Route> */}
                        {/* <PrivateRoute exact path='/Login' component={Login}/> */}
                        <Route exact path="/Login">
                            <Login />
                        </Route>
                        <Route exact path="/Signup">
                            <Signup />
                        </Route>
                        <Route exact path="/Address">
                            <AddressPage />
                        </Route>
                        <Route
                            path="/Vote"
                            render={(routeProps) => (
                                <VotePage {...routeProps} />
                            )}
                        ></Route>
                        <Route
                            path="/Results"
                            render={(routeProps) => <Results {...routeProps} />}
                        ></Route>
                        <Route path="/MS">
                            <div>
                                <h1>it workds!</h1>
                                {console.log('MS PATH')}
                            </div>
                        </Route>
                        {/* Update me when name is changed! */}
                        {/* <Route
                    path="/Callvotes"
                    render={(routeProps) => (
                        <PollCountPage {...routeProps} />
                    )}
                ></Route> */}
                    </Switch>
                </Router>
            </div>
        </AuthProvider>
    )
}

export default App
