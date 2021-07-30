import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VotePage from './pages/VotePage'
import Results from './pages/Results'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import ServiceSignin from './pages/ServiceSignin'
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
                    </Switch>
                </Router>
            </div>
        </AuthProvider>
    )
}

export default App
