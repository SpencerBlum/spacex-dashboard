import React, { Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard';



class App extends Component {

  state = {
    allData: [],
    rocketsLaunched: ""
  }
  

  componentDidMount() {
    this.fetchData() 
  }


  fetchData = () => {
    fetch("https://api.spacexdata.com/v4/launches")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({allData: data})
    })
  }


  render (){
    
    if(this.state.allData.length !== 0){
      return (
        <div >
        <Dashboard allData = {this.state.allData}/>
        </div>
      );
    } else {
      return(
        <div>
          
        </div>
      )
    }
   
  }
}

export default App;
