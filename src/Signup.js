import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

const STYLE = {
  margin: 15,
};

const ERROR_STYLE = {
  textSize:0
}

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      errors:{passwordMismatch:'',
        missingFirstName:'',
        missingLastName:'',
        missingEmail:'',
        missingPassword:'',
        missingConfirmPassword:'',
        invalidEmail:'',
        invalidPassword:''}
    }
  }

  //May use in future
  /*onChange(event){
    console.log(event.target.value)
    if (event.target.value == this.state.password) {
      this.setState({ errors: { passwordMismatch: '' } })
    } else {
      this.setState({ errors: { passwordMismatch: 'true' } })
      this.props.parentContext.setState({ errorMessage: '* Passwords do not match.' })
    }
  }*/

  handleClick(event){
    var apiBaseUrl = "http://localhost:5000/api/";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    var self = this;
    var payload={
      "firstName":this.state.firstName,
      "lastName":this.state.lastName,
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'users/create', payload)
    .then(function (response) {
      console.log(response);
      if(response.data.code === 200){
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this}/>);
        self.props.parentContext.setState({loginscreen:loginscreen,
          buttonLabel:"Login",
          isLogin:true
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="card-2 card-shadow-1">
        <TextField
          hintText="Enter your First Name"
          floatingLabelText="First Name"
          errorStyle={ERROR_STYLE}
          errorText={this.state.errors.missingFirstName}
          onChange={(event,newValue) => this.setState({firstName:newValue})}
        />
        <br/>
        <TextField
          hintText="Enter your Last Name"
          floatingLabelText="Last Name"
          errorStyle={ERROR_STYLE}
          errorText={this.state.errors.missingLastName}
          onChange={(event,newValue) => this.setState({lastName:newValue})}
        />
        <br/>
        <TextField
          hintText="Enter your Email"
          type="email"
          floatingLabelText="Email"
          errorStyle={ERROR_STYLE}
          errorText={this.state.errors.missingEmail}
          onChange={(event,newValue) => this.setState({email:newValue})}
        />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          errorStyle={ERROR_STYLE}
          errorText={this.state.errors.missingPassword}
          onChange={(event,newValue) => this.setState({password:newValue})}
        />
        <br/>
        <RaisedButton label="Sign Up" primary={true} style={STYLE} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}

export default Signup;
