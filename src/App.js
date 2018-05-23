import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen';
import './App.css';

injectTapEventPlugin();

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      dashboard:[],
      menuIcon:false
    }
  }

  componentWillMount(){
    var loginPage = [];
    loginPage.push(<Loginscreen key="loginscreen" parentContext={this}/>);
    this.setState({loginPage:loginPage})
  }

  render(){
    return (
      <div className="App">
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar title={<img role='presentation' src="/images/schedlogo-white.png"/> } showMenuIconButton={this.state.menuIcon}/>
              {this.state.loginPage}
              {this.state.dashboard}
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
