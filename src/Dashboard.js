import React, { Component } from 'react';
import Schedule from './Schedule';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      currentTab:[]
    }
  }

  componentWillMount(){
    var currentTab = [];
    currentTab.push(<Schedule parentContext={this} key="schedule" appContext={this.props.parentContext}/>);
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
