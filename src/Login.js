import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Profile from './Profile';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './Login.css';

const style = {
  margin: 15,
};

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }

  handleClick(event){
    var apiBaseUrl = "http://localhost:5000/api/";
    var self = this;
    var payload={
      "name":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'users/login', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.status == 200){
         console.log("Login successfull");
         var profile=[];
         profile.push(<Profile appContext={self.props.appContext}/>)
         self.props.appContext.setState({loginPage:[],profile:profile})
       }
       else if(response.data.status == 401){
         console.log("Username password do not match");
         alert("username password do not match")
       }
       else if(response.data.status == 404){
         console.log("Username does not exists");
         alert("Username does not exist");
       }
     })
    .catch(function (error) {
      console.log(error);
    });
   }

  render(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title={<img src="/images/schedlogo-white.png"/> }/>
            <i class="far fa-calendar-alt"></i>
            <div class="card card-3">
              <TextField
                hintText="Enter your Email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
              />
              <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
              />
              <br/>
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
