import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import Signup from './Signup';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Sign up',
      errorMessage:[],
      isLogin:true
    }
  }

  componentWillMount(){
    var loginscreen = [];
    loginscreen.push(<Login parentContext={this} key="login" appContext={this.props.parentContext}/>);
    var loginmessage = "Don't have an account? Sign up by clicking ";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage
    })
  }

  handleClick(event){
    var loginmessage;
    var loginscreen = [];
    if(this.state.isLogin){
      loginscreen.push(<Signup key="signup" parentContext={this}/>);
      loginmessage = "Already have an account? Sign in by clicking ";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        errorMessage:[],
        buttonLabel:"Login",
        isLogin:false
      })
    }else{
      loginscreen.push(<Login key="login" parentContext={this}/>);
      loginmessage = "Don't have an account? Sign up by clicking ";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        errorMessage:[],
        buttonLabel:"Sign up",
        isLogin:true
      })
    }
  }

  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div className="small-text margin-sm error-color">{this.state.errorMessage[0]}</div>
        <div className="small-text margin-sm error-color">{this.state.errorMessage[1]}</div>
        <div className="small-text margin-sm">
          {this.state.loginmessage} <a href='#' onClick={(event) => this.handleClick(event)}>here</a>!
        </div>
      </div>
    );
  }
}

export default Loginscreen;
