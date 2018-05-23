import React, { Component } from 'react';
import axios from 'axios';

const STYLE = {
  margin: 15,
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      currentTab:[]
    }
  }

  componentWillMount(){
    var currentTab = [];
    //currentTab.push(<Login parentContext={this} key="login" appContext={this.props.parentContext}/>);
    this.setState({
      currentTab:currentTab
    })
  }

  render(){
    return (
      <div className="dashboard">
        {this.state.currentTab}
      </div>
    );
  }
}

export default Dashboard;
