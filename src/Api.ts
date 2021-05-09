
import {shuffelArray} from './utils'

export type Question ={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {
    answers: string[]
}

export enum Dificulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
export const fetchQuis  = async(amount:number, difficulty: Dificulty)=>{
    const endpoint  = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question)=>(
        {
            ...question,
            answers: shuffelArray([
                ...question.incorrect_answers, 
                question.correct_answer])
        }
    ))
    
}