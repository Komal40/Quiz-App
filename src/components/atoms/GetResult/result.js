import React from 'react'
import style from './result.module.css'

function Result({score, totalScore, tryAgain, passingMarks}) {

    const percentage=(score/totalScore)*100
    const actualPassingPercentage = (passingMarks/totalScore)*100

    if(percentage>=actualPassingPercentage){
        return(
            <>
                <div>
                    <h1>Congratulations!!!</h1>
                    <h2>You Scored {score} out of {totalScore}</h2>
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div>
                    <h2>You got {score} out of {totalScore} !</h2>
                    <button className={style.btn} onClick={tryAgain}>Start Again</button>
                </div>
            </>
        )
    }
}

export default Result