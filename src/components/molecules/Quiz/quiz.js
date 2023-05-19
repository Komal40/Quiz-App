import React, { useEffect, useState } from 'react'
import style from './quiz.module.css';
import { question } from '../../atoms/Getquestion/question';
import Result from '../../atoms/GetResult/result';

export function Quiz() {

  const [currentQues, setCurrentQues] = useState(0)
  const [score, setScore] = useState(0)
  const [clicked, setClicked] = useState(0)
  const [showresult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(600)
  const passingMarks = 12

  function handleNextQuestion() {
    updateScore()
    if (currentQues < question.length - 1) {
      setCurrentQues(currentQues + 1)
      setClicked(0)
    }
    else {
      setShowResult(true)
    }
  }

  function updateScore() {
    if (clicked === question[currentQues].correctAnswer) {
      setScore(score + 2)
    }
  }

  function resetAll() {
    setCurrentQues(0)
    setClicked(0)
    setScore(0)
    setShowResult(false)
    setTimer(600)
  }

  function submitTest() {
    setShowResult(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      submitTest();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);


  return (
    <>
      <h1>Quiz App</h1>
      <h3>Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
      <div className={style.container}>
        {showresult ?
          <Result score={score} totalScore={(question.length) * 2} tryAgain={resetAll}
            passingMarks={passingMarks}
          />
          :
          (
            <>
              <div className={style.question}>
                <span id={style.number}>{currentQues + 1}.</span>
                <span id={style.quesNum}>{question[currentQues].question}</span>
              </div>

              <div className={style.options}>
                {question[currentQues].answers.map((opt, idx) => {
                  return (
                    <button
                      // className={style.btn}
                      className={`${style.btn} ${clicked == idx + 1 ? `${style.checked}` : "null"
                        }`}
                      key={idx}
                      onClick={() => setClicked(idx + 1)}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {(currentQues == question.length - 1)
                ?
                <button className={style.selectbtn} onClick={submitTest}>Submit</button>
                :
                <button className={style.selectbtn}
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              }

            </>

          )}
      </div>
    </>
  )
}


