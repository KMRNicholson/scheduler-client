import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Dashboard from './Dashboard';

const STYLE = {
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

  login(event){
    var apiBaseUrl = "http://localhost:5000/api/";
    var self = this;
    var payload={
      "email":this.state.email.toLowerCase(),
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'users/login', payload)
     .then(function (response) {
       console.log(response);
       self.props.parentContext.setState({errorMessage:[]});
       var dashboard=[];
       dashboard.push(<Dashboard key="dashboard" appContext={self.props.appContext} parentContext={self.props.appContext}/>);
       self.props.appContext.setState({loginPage:[],dashboard:dashboard, menuIcon:true});
     })
    .catch(function (error) {
      console.log(error);
      self.props.parentContext.setState({errorMessage:["* Invalid Email/Password. Please try again."]});
    });
  }

  render(){
    return (
      <div className="card-1 card-shadow-1">
        <TextField
          hintText="Enter your Email"
          floatingLabelText="Email"
          onChange={(event,newValue) => this.setState({email:newValue})}
        />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange={(event,newValue) => this.setState({password:newValue})}
        />
        <RaisedButton label="Sign In" primary={true} style={STYLE} onClick={(event) => this.login(event)}/>
      </div>
    );
  }
}

export default Login;
