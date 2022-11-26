import React from "react"
import Start from "./Start"
import Questions from "./Questions"
import Quiz from "./Quiz"
import { nanoid } from "nanoid"
export default function App(){
const [start,setStart]=React.useState(true)
const [questions,setQuestions]=React.useState([])
const [userAnswers,setUserAnswers]=React.useState([])
const [mcqs,setMcqs]=React.useState([])
//const [correct,setCorrect]= React.useState([])
const [isCorrect,setIsCorrect]= React.useState(0)
const [check,setCheck]=React.useState(false)
const [newGame,setNewGame]=React.useState(false)
async function getTrivia(){
    let response=await fetch("https://opentdb.com/api.php?amount=5&category=29&difficulty=easy&type=multiple")
    let data= await response.json()
    return data
}
React.useEffect(()=>{
    getTrivia().then((data)=>{
    //const results=data.results
    //console.log(results)
     let results = data.results
     //Save Questions from the results
     results = results.map((item, index) => {
         let answeroptions = shuffle([...item.incorrect_answers, item.correct_answer])
         item = {
             id : index,
             ...item,
             answeroptions : answeroptions,
         }
         return item
      })
      setQuestions(results)
     //Save mcqs from the results 
    let results1 = results.map((item, index) => {
         let answeroptions = shuffle([...item.incorrect_answers, item.correct_answer])
         
          const k=answeroptions.map(i=>{
              let ic
             if(i===item.correct_answer)
                  { 
                      ic=true
                  }
                  else{
                      ic=false
                  }
               return {
             id : index,
              answer: i,
              isSelected:false,
              isCorrect: ic
         }
          })
         return k
      })
      //console.log(results1)
      setMcqs(results1)
      //correct state
    //     let results2 = results.map((item, index) => {
    //       return item.correct_answer
    //    })
    //    setCorrect(results2)
})
},[newGame])
function shuffle(ar){
    const arr=[]
    let i=0
    while(i<ar.length){
        const num=Math.floor(Math.random()*(ar.length))
        if(arr.every(i=> i!=num)){
            arr.push(num)
            i++
        }   
    }
    const newar=[]
    let j=0
    while(j<ar.length){
        newar.push(ar[arr[j]])
        j++
    }
    return newar
}
function handleUser(ans,id)
{
    if( userAnswers.length===0 && userAnswers.length<questions.length)
    {
        setUserAnswers([{id:id,answer:ans}])
    }
    else if(userAnswers.length>0 )
    {
        const checking= userAnswers.some(item => item.id === id && item.answer != ans)
        if(true)
        {
            setUserAnswers((current) =>current.filter((item) => item.id != id))
            setUserAnswers(p=> [...p,{id:id,answer:ans}])
        }else{
            setUserAnswers((current) =>current.filter((item) => item.id != id))
            setUserAnswers(p=> [...p,{id:id,answer:ans}])
        }
    }
}
//console.log(mcqs)
function handleMcq(ans,id,select){
    const res=mcqs
        const s=res.map(i=>{
            const l=i.map(j=>{
                    if(j.id === id && j.isSelected === true ){
                        j.isSelected=false
                    }
                    if(j.id === id && j.answer===ans){
                        j.isSelected=!select
                    }
            })
        })
    setMcqs(res)
}

//console.log(mcqs)

function checkAnswers(){
    setCheck(p=>!p)
    //console.log(correct)
    const numAscending = [...userAnswers].sort((a, b) => a.id - b.id)
    setUserAnswers(numAscending)
    //console.log(userAnswers)
}
function handleNewGame(){
    setNewGame(p=> !p)
    setCheck(false)
    setIsCorrect(0)
    console.log(questions)
}
function handleIsCorrect(){
    setIsCorrect(p=> p+1)
}
//mcqs component 
const aEl=mcqs.map(i=>{
    return <Quiz className="options" key={nanoid()} data={i} handleUser={handleUser} handleMcq={handleMcq} check={check} handleIsCorrect={handleIsCorrect}/>
 })
const qEl=questions.map((i,j)=>{
    return (
        <div key={nanoid()}>
            <Questions data={i.question} />
            {aEl[j]}
        </div>
        )
})
 
return (
    <div className="main">
        {start && <Start setStart={setStart} />}
        {!start && 
            <div>
                {qEl}
                {!check && <button type="submit" onClick={checkAnswers} className="buttonStart center">Check answers</button> }
                {check && (
                    <div className="contain">
                        <h5 className="h5-end">You scored {isCorrect}/{questions.length} correct answers</h5>
                        <button onClick={handleNewGame}className="buttonStart" >Play again</button>
                    </div>
                    )
                }
            </div>
        }
    </div>
    )
}