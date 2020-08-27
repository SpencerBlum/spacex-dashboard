import React, { Component } from 'react'
import AboveStatsCard from './AboveStatsCard'
import Header from './Header'
import MapChart from './MapChart';
import CircleChart from './CircleChart';



class Dashboard extends Component  {

    state = {
        rocketsLaunched: 0,
        rocketsNotLaunched: 0,
        rocketFailures: 0,
        rocketSuccess: 0,
        nextRocketLaunch: {},
        reusedCount: 0,
        recovery_attemptCount: 0,
        recoveredCount: 0,
        chartData: [ 
            ['Task', 'Hours per Day'],
            ['Recovery Attempted ', 5],
            ['Recovered Not Reused', 5],
            ['Recovered and Reused', 5]
        ]

    }


    componentDidMount(){
        this.rocketsLaunched()
        this.rocketsNotLaunched()
        this.rocketFailures()
        // this.findFailures()
        this.nextLaunch()
        this.fearingStats()
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


    compare = (a,b) => {

    
    }

    nextLaunch = ()=> {

        let futureRocketsArray = []
        let d = new Date();
        let currentTime = d.getTime()* 0.001
        // console.log(currentTime)
        let position = 0

       let newList = this.props.allData.sort((a, b) => {
        return a.date_unix - b.date_unix
        });

        console.log(newList)

        newList.forEach(rocket => {
            position += 1
            //  console.log(`${rocket.date_unix} ${currentTime}` )
            if (rocket.date_unix > currentTime ){
                // console.log(true)
                futureRocketsArray.push(rocket)
                console.log(position)
            }
        })
        this.setState({nextRocketLaunch: futureRocketsArray[0]})
        
    }

    fearingStats = () => {
        let reusedCount = 0
        let recoveredCount = 0
        let recovery_attemptCount = 0

        this.props.allData.forEach(rocket => {
            
            if(rocket.fairings){
                if(rocket.fairings.reused === true) {
                    reusedCount += 1
                }
                if(rocket.fairings.recovered === true) {
                    recoveredCount += 1
                }
                if(rocket.fairings.recovery_attempt === true) {
                    recovery_attemptCount += 1
                }
            }

        })

        this.setState({
            reusedCount: reusedCount,
            recovery_attemptCount: recovery_attemptCount,
            recoveredCount: recoveredCount
        })

        this.getChartData(reusedCount, recovery_attemptCount, recoveredCount)


    }

    getChartData = (reusedCount, recovery_attemptCount, recoveredCount) => {

        console.log(recovery_attemptCount - recoveredCount)
        let data = [
            ['Task', 'Hours per Day'],
            ['Recovery Attempted Not Recovered or Reused ', recovery_attemptCount- recoveredCount],
            ['Recovered Not Reused', recoveredCount - reusedCount],
            ['Recovered and Reused', reusedCount],
        ]

        console.log(data)
        this.setState({chartData: data})
    }
    
    render(){
        console.log(this.state.nextRocketLaunch.date_unix*1000 - Date.now())
        return (
            <div >
                <Header nextLaunch ={this.state.nextRocketLaunch}/>
                {/* <h1 className= {"count-down"}> <Countdown date={Date.now() + (this.state.nextRocketLaunch.date_unix*1000 - Date.now()) } /> Till Next Launch </h1> */}
                <div className = "cards-container">
                    <div className = "stats-card bg-color-1">
                    <AboveStatsCard statNum = {this.state.rocketsLaunched} cardTitle = {"Rockets Launched"}/>
                    </div>
                    <div className = "stats-card bg-color-2">
                    <AboveStatsCard statNum = {this.state.rocketsNotLaunched} cardTitle = {"Up Coming Launches"}/>
                    </div>
                    <div className = "stats-card bg-color-3">
                    <AboveStatsCard statNum = {this.state.rocketSuccess} cardTitle = {"Rocket Success"}/>
                    </div>
                    <div className = "stats-card bg-color-4">
                    <AboveStatsCard statNum = {this.state.rocketFailures} cardTitle = {"Rocket Failures"}/>
                    </div>
                </div>
                <div className = "second-row-container">
                        <div className="map-container">

                    <h1 className = "map-card-header"> Rocket Launch Sites</h1>
                    <MapChart/>
                    </div>
                    <div className="piechart-div">
                    <h1 className = "map-card-header"> Fairing Recovery Stats</h1>
                    <CircleChart chartData = { this.state.chartData} />
                    </div>
                </div>
            </div>
            )
    }  
}

export default Dashboard