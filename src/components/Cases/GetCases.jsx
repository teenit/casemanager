import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import s from "./Cases.module.css";
import CasesList from "./CasesList";
function sortMas(field,type){
    if(type == "number"){
        return(a,b) => +a[field] > +b[field] ? 1 : -1;
    }else{
        return(a,b) => a[field] > b[field] ? 1 : -1;
    } 
}
const GetCases = ({posts,postsChange})=>{
    const [cases,setCases] = useState({
      totalCount: posts.length,
      firstSlice: 0,
      lastSlice:20,
      step:10,
      button:true
    })
    const [likeShow,setLikeShow] = useState(true)
    const [masPost,setMasPost] = useState([]);
    useEffect(()=>{
      test()
    },[])
    function test(e){
      let countStart = cases.firstSlice;
      let countEnd = cases.lastSlice;
      
      setMasPost([...masPost,...posts.slice(countStart,countEnd)])
      if(countEnd > cases.totalCount) {
        setCases({...cases, button:false})
      }else{
        setCases({
          ...cases,
          firstSlice:countEnd,
          lastSlice:countEnd + cases.step
        })
      }
      
      console.log(posts)
    }
    return(
        <div className="wrap__cards">
          <div className={s.select__sort}><select name="" id="" onChange={(e)=>{
            console.log(e.target.value)
            let a = [];
            if(e.target.value !== 'id'){
              posts.sort(sortMas(e.target.value,'string'))
            }else{
            posts.sort(sortMas(e.target.value,'number'))
            }
            posts.forEach(element => {
              a.push(element)
            });
             postsChange(a)
          }}>
            <option value="default">Сортувати за</option>
            <option value="surname">Сортувати за прізвище</option>
            <option value="firstName">Сортувати за ім'ям</option>
            <option value="createdDate">Сортувати за датою створення</option>
            <option value="id">Сортувати за номером</option>
          </select>
          <button onClick={()=>setLikeShow(!likeShow)} className={s.like__btn}>{!likeShow ? "Як картки" : "Як список"}</button>
          </div>
          {likeShow ? <div className={s.like__cards}>
          
            <div className="inner__cards" id="inner__cards">
                  {masPost.map((elem,ind)=>{
                      return <Card info={elem} key={elem.id }/>
                  })}
              </div>
                  {cases.button ? <button className={s.look__more} onClick={test}>Показати ще...</button> : <h3 className={s.look__more__text}>
                    Немає більше доступних кейсів
              </h3>}
          
          </div>:<CasesList cases={posts} />}

            
        </div>
    )
}

export default GetCases;