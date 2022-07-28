import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect hook to: 1-decrease {timeRemaining} by one each second.  2-reset {timeRemaining} to 10 seconds, pass "false" to onAnswered prop
  useEffect(() => {
    const setter = setTimeout(() => setTimeRemaining((timeRemaining => timeRemaining - 1)), 1000)

    if (timeRemaining === 0){
      setTimeRemaining(10)
      onAnswered(false)
    }

    //useEffect cleanup function
    return function(){
      clearTimeout(setter)
    }
  })

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
