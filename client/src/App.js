import React, {Component} from 'react';
import './App.css';
import Signup from './Components/auth/signup'
import Login from './Components/auth/login'
import AuthServices from './service/auth-services'
import Navigation from './Components/navigation'
import { Switch, Route } from 'react-router-dom'
import Home from "./Components/home"
import NewProject from "./Components/newProject"
import AllProject from "./Components/allProject"
import ProjectDetail from './Components/projectDetail';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
  }
  setUser = userObj => this.setState({ loggedInUser: userObj})
  fetchUser = () =>{
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }
  render(){
    this.fetchUser()
    if(this.state.loggedInUser){
      return(
        <div>
          <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser}/>
          <Switch>
            <Route path="/newProject"exact component={NewProject} />
            <Route path="/" exact component={Home} ></Route>
            <Route path="/allProject"exact component={AllProject} />
            <Route path="/projectDetail/:id"component={ProjectDetail} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          <Navigation userInSession={this.state.loggedInUser} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" render={() => <Signup setTheUser={this.setUser} />} />
            <Route path="/login" render={() => <Login setTheUser={this.setUser} />} />
            <Route path="/allProject" exact component={AllProject} />
          </Switch>
        </div>
      )
    }
  }
}
export default App;
