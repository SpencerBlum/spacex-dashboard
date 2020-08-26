import React, { Component } from 'react'
import AboveStatsCard from './AboveStatsCard'
import Header from './Header'
import Countdown from 'react-countdown-now';
import MapChart from './MapChart';



class Dashboard extends Component  {

    state = {
        rocketsLaunched: 0,
        rocketsNotLaunched: 0,
        rocketFailures: 0,
        rocketSuccess: 0,
        nextRocketLaunch: {}

    }


    componentDidMount(){
        this.rocketsLaunched()
        this.rocketsNotLaunched()
        this.rocketFailures()
        // this.findFailures()
        this.nextLaunch()
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
        let total = 0
        let count = 0
            this.props.allData.forEach(rocket => {
                if (rocket.upcoming === false){
                    total += 1
                    if(rocket.failures.length === 0 && rocket.success === true )
                count += 1
                }
            })
            console.log(this.state.rocketsLaunched)
            this.setState({
                rocketFailures: count,
                rocketSuccess: total - count
            })
    }

    findFailures = () => {

        let dic = {}
        let count = 0

        this.props.allData.forEach(rocket => {
            
            console.log(rocket.details)
            console.log(count += 1)
            // dic.forEach(obj=> {
                
            // })
        })

    }

    nextLaunch = ()=> {

        let futureRocketsArray = []
        let d = new Date();
        let currentTime = d.getTime()* 0.001
        // console.log(currentTime)
        this.props.allData.forEach(rocket => {
            console.log(`${rocket.date_unix} ${currentTime}` )
            if (rocket.date_unix > currentTime ){
                console.log(true)
                futureRocketsArray.push(rocket)
            }
        })
        this.setState({nextRocketLaunch: futureRocketsArray[0]})
        
    }

    fearingStats = () => {

    }
    
    render(){
        console.log(this.state.nextRocketLaunch.date_unix*1000 - Date.now())
        return (
            <div >
                <Header nextLaunch ={this.state.nextRocketLaunch}/>
                {/* <h1 className= {"count-down"}> <Countdown date={Date.now() + (this.state.nextRocketLaunch.date_unix*1000 - Date.now()) } /> Till Next Launch </h1> */}
                <div className = "cards-container">
                    <AboveStatsCard statNum = {this.state.rocketsLaunched} cardTitle = {"Rockets Launched"}/>
                    <AboveStatsCard statNum = {this.state.rocketsNotLaunched} cardTitle = {"Up Coming Launches"}/>
                    <AboveStatsCard statNum = {this.state.rocketSuccess} cardTitle = {"Rocket Success"}/>
                    <AboveStatsCard statNum = {this.state.rocketFailures} cardTitle = {"Rocket Failures"}/>
                </div>
                <div className="map-container">
                    <h1 className = "map-card-header"> Rocket Launch Sites</h1>
                    <MapChart/>
                </div>
            </div>
            )
    }  
}

export default Dashboard