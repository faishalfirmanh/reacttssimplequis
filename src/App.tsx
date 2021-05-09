import React, {useState} from 'react';
import Question from './components/Questions'

import {fetchQuis} from './Api';
import {QuestionState,Dificulty} from './Api';
import {GlobalStyle, Wrapper} from './App.styles';

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnserwer:string;
}

const TOTAL_QUESTIONS  = 10;
const  App =()=> {

  const [loading, setLoading] = useState(false);
  const [question, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [scor, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

   console.log(question);
  

  const StartQuis = async ()=>{
      setLoading(true);
      setGameover(false);

      const  newQuestion = await fetchQuis(
         TOTAL_QUESTIONS,
         Dificulty.EASY,
      );

      setQuestions(newQuestion);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoading(false);

  }

  const CheckAnswer =(e: any)=>{
    if(!gameOver)
    { 
      //User answwer
      const answer = e.currentTarget.value;
      //check anserwer currect 
      const correct = question[number].correct_answer === answer;
      //add scrore
      if(correct) setScore(prev => prev + 1)
      //save user answer
      const answerObj = {
        question: question[number].question,
        answer,
        correct,
        correctAnserwer: question[number].correct_answer,

      };
      setUserAnswer(prev => [...prev, answerObj])

    }
  }

  const nextQuestions =()=>{
    const NextQuestion = number+1;
    if(NextQuestion === TOTAL_QUESTIONS)
    {
      setGameover(true)
    }
    else
    {
      setNumber(NextQuestion);
    }
  }

  return (
    <> 
       <GlobalStyle/>
       <Wrapper className="App">
        <h1>React Quist</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
             <button className="start" onClick={StartQuis}>
                Start
             </button>
        ) : null }
        {!gameOver ? <p className="score">Score: {scor}</p> : null }
        {loading && <p>Loading Questions...</p>  }
        {!loading && !gameOver && (

            <Question 
            questionNumber={number+1}
            totalQuestion={TOTAL_QUESTIONS}
            question={question[number].question}
            answers={question[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={CheckAnswer}
            />

        )}
        {  !gameOver && 
           !loading && 
           userAnswer.length === number + 1 
           && number !== TOTAL_QUESTIONS - 1 ? (

          <button className="next" onClick={nextQuestions}>
              Next Questions
          </button>

        ): null }
        
       </Wrapper>
    </>
  );
}

export default App;
