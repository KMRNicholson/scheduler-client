import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

const STYLE = {
  margin: 15,
};

const ERROR_MESSAGE = {
  missingParams:'* Missing Required Fields.',
  formatInvalid:'* Email/Password Invalid Format.'
};

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      errors:{password:'',
        firstName:'',
        lastName:'',
        email:''},
      emailValid:false,
      passwordValid:false,
      formValid:false
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password){
    var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return re.test(password);
  }

  passwordCheck(newValue){
    var results;
    if(!this.validatePassword(newValue)){
      this.setState({password:newValue})
      this.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid] })
      results = false;
    }else{
      this.setState({password:newValue})
      this.props.parentContext.setState({errorMessage: [] })
      results = true;
    };
    return results;
  }

  emailCheck(newValue){
    var results;
    if(!this.validateEmail(newValue)){
      this.setState({email:newValue})
      this.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid] })
      results = false;
    }else{
      this.setState({email:newValue})
      this.props.parentContext.setState({errorMessage: [] })
      results = true;
    };
    return results;
  }

  paramsCheck(){
    var results;
    if(this.state.firstName.trim().length>0 && this.state.lastName.trim().length>0 && this.state.email.trim().length>0 && this.state.password.trim().length>0){
      results = true;
    }else{
      results = false;
    }
    return results;
  }

  handleClick(event){
    var apiBaseUrl = "http://localhost:5000/api/";
    var self = this;
    var validPass = this.passwordCheck(this.state.password);
    var validEmail = this.emailCheck(this.state.email);
    var validParams = this.paramsCheck();
    console.log(validPass);
    if(!validParams && (!validPass || !validEmail)){
      this.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid,
        ERROR_MESSAGE.missingParams] });
    }else if(!validParams){
      this.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.missingParams] });
    }else if(!validPass || !validEmail){
      this.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid] });
    }else{
      var payload={
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        "password":this.state.password
      }
      axios.post(apiBaseUrl+'users/create', payload)
      .then(function (response) {
        console.log(response);
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this}/>);
        self.props.parentContext.setState({loginscreen:loginscreen,
          buttonLabel:"Login",
          isLogin:true,
          errorMessage:[]
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.errors);
        var formatInvalid = false;
        var missingParams = false;
        for(var i = 0; i < error.response.data.errors.length; i++){
          if(error.response.data.errors[i] === "Missing Field.") missingParams = true;
          if(error.response.data.errors[i] === "Invalid Format.") formatInvalid = true;
        }
        if(missingParams && formatInvalid){
          self.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid,
            ERROR_MESSAGE.missingParams] });
        }else if(missingParams){
          self.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.missingParams] });
        }else if(formatInvalid){
          self.props.parentContext.setState({errorMessage: [ERROR_MESSAGE.formatInvalid] });
        }
      });
    }
  }

  render() {
    return (
      <div className="card-2 card-shadow-1">
        <TextField
          hintText="Enter your First Name"
          floatingLabelText="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={(event,newValue) => this.setState({firstName:newValue})}
        />
        <br/>
        <TextField
          hintText="Enter your Last Name"
          floatingLabelText="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={(event,newValue) => this.setState({lastName:newValue})}
        />
        <br/>
        <TextField
          hintText="Enter your Email"
          type="email"
          floatingLabelText="Email"
          name="email"
          onChange={(event,newValue) => this.setState({email:newValue})}
        />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          name="password"
          onChange={(event,newValue) => this.setState({password:newValue})}
        />
        <br/>
        <RaisedButton label="Sign Up" primary={true} style={STYLE} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}

export default Signup;
