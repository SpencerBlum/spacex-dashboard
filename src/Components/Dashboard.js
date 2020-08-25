import React, { Component } from 'react'
import AboveStatsCard from './AboveStatsCard'

class Dashboard extends Component  {

    state = {
        rocketsLaunched: 0,
        rocketsNotLaunched: 0,
        rocketFailures: 0
    }


    componentDidMount(){
        this.rocketsLaunched()
        this.rocketsNotLaunched()
        this.rocketFailures()
    }

    rocketsLaunched = () => {
        let count = 0
            this.props.allData.forEach(rocket => {
                if (rocket.upcoming === false){
                count += 1
                }
            })
            this.setState({rocketsLaunched: count})
    }

    rocketsNotLaunched = () => {
        let count = 0
            this.props.allData.forEach(rocket => {
                if (rocket.upcoming === true){
                count += 1
                }
            })
            this.setState({rocketsNotLaunched: count})
    }

    rocketFailures = () => {
        let count = 0
            this.props.allData.forEach(rocket => {
                if (rocket.upcoming === false){
                    if(rocket.failures.length === 0 && rocket.success === true )
                count += 1
                }
            })
            this.setState({rocketFailures: count})
    }

    
    render(){
        return (
            <div >
                <h2>rockets launched {this.state.rocketsLaunched}</h2> 
                <h2>rockets soon to launch {this.state.rocketsNotLaunched}</h2> 
                <h2>rocket failures {this.state.rocketFailures}</h2> 
                <div className = "cards-container">
                    <AboveStatsCard statNum = {this.state.rocketsLaunched} cardTitle = {"Rockets Launched"}/>
                    <AboveStatsCard statNum = {this.state.rocketsNotLaunched} cardTitle = {"Up Coming Launches"}/>
                    <AboveStatsCard statNum = {this.state.rocketFailures} cardTitle = {"Rocket Failures"}/>
                </div>
               
            </div>
            )
    }  
}

export default Dashboard