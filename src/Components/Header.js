import React from "react"
import { render } from "@testing-library/react"
import Countdown from 'react-countdown-now';

const  Header = (props) => {

    return(
        <div className= "header">
            <span className = "logo"> SpaceX DashBoard </span>
             <span  className= "count-down"> <Countdown date={Date.now() + (props.nextLaunch.date_unix*1000 - Date.now()) } /> Next Launch </span>
        </div>
    )
}

export default Header