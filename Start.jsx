import React from "react"
export default function Start(props){
    const setStart= props.setStart
    function start(){
        setStart(prev=> !prev)
    }
    return (
        <div className="front--page">
            <h5>Quizzical</h5>
            <p>Find out how much you know about Comics</p>
            <button onClick={start} className="buttonStart">Start quiz</button>
        </div>
    )
}