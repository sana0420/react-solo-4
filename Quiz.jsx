import React from "react"
import { nanoid } from "nanoid"
export default function Quiz(props){
     const mcq=props.data
     const ch=props.check
     function check(s,c){
         if(!ch){
            const styles={
                backgroundColor: s ? "#8BE5E5" : "transparent"
            }
            return styles
         }else{
             let color
             if(s===true && c===true){
                 color="#C8E9A0"
             }else if(s===true && c===false){
                 color="#DC4151"
            }else if(s===false){
                 color="transparent"
             }
            const styles={
                backgroundColor: color
                }
            return styles
         }  
     }
     function isCorrect(c){
         //props.setCorrect(p=> p+1)
         if(c===true){
             props.handleIsCorrect()
         }
     }
     function handleClick(ans,id,select,iscorrect){
         props.handleUser(ans,id)
         props.handleMcq(ans,id,select)
         isCorrect(iscorrect)
     }//#8BE5E5
          const mcqEl=mcq.map(i=>{
          return <button  key={nanoid()} className="options" style={check(i.isSelected,i.isCorrect)} onClick={()=>handleClick(i.answer,i.id,i.isSelected,i.isCorrect)}>{i.answer}</button>
      })
    return <>{mcqEl}<hr/></>
}