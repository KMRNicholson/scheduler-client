import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen';
import './App.css';

injectTapEventPlugin();

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      profile:[]
    }
  }

  componentWillMount(){
    var loginPage = [];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({loginPage:loginPage})
  }

  render(){
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.profile}
      </div>
    );
  }
}

export default App;
