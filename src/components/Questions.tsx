import React from 'react'
import {AnswerObject} from '../App';
import {Wrapper, ButtonWraper} from './QuestionCard.styles';

type Props  ={
    question:string;
    answers:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>) =>void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestion: number;
}

const Question: React.FC<Props> =({question,answers,callback,userAnswer,questionNumber,totalQuestion})=>(
    <Wrapper>
       <p className="number">
           Questions: {questionNumber} / {totalQuestion}
       </p>
       <p dangerouslySetInnerHTML={{ __html: question}}></p>
       <div>
            {answers.map((answer) => (                
                <ButtonWraper 
                correct={userAnswer?.correctAnserwer === answer}
                userClicked={userAnswer?.answer === answer}
                key={answer}>
                    <button disabled={userAnswer ? true:false} value={answer} onClick={callback}>
                        <span style={{color:'black'}} dangerouslySetInnerHTML={{ __html: answer }}/>
                    </button>
                </ButtonWraper>
            ))}
       </div>
    </Wrapper>
)

export default Question