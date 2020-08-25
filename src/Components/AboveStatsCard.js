import React from 'react'
import CountUp from 'react-countup';

const AboveStatsCard = (props) => {

    return (
        <div className= "stats-card">
            <h2>
                {props.cardTitle}
            </h2>
            <p className = "stats-card-num-p">  
                <CountUp duration={4.75} end= {props.statNum}/>
            </p>
        </div>
    )
}

export default AboveStatsCard