import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import Signup from './Signup';

const style = {
  margin: 15,
};

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Sign up',
      isLogin:true
    }
  }

  componentWillMount(){
    var loginscreen = [];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Don't have an account? Sign up by clicking ";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage
    })
  }

  handleClick(event){
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Signup parentContext={this}/>);
      loginmessage = "Already have an account? Sign in by clicking ";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Login",
        isLogin:false
      })
    }else{
      var loginscreen=[];
      loginscreen.push(<Login parentContext={this}/>);
      loginmessage = "Don't have an account? Sign up by clicking ";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Sign up",
        isLogin:true
      })
    }
  }

  render() {
    return (
      <div className="loginscreen">
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar title={<img src="/images/schedlogo-white.png"/> } showMenuIconButton={false}/>
              {this.state.loginscreen}
              <div class="small-text">
                {this.state.loginmessage} <a href='#' onClick={(event) => this.handleClick(event)}>here</a>!
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Loginscreen;
