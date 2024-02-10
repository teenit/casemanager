import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./event.module.css";
import settingImg from "./../../../img/icons/settings-50-black.png"
import EventModal from "./EventModal";
import GetUsers from "./GetUsers";
import GetPlans from "./GetPlans";
import GetDocs from "./GetDocs";
import BigPhoto from "./BigPhoto";
import Galery from "../../Galery/Galery";

const Event = ()=>{
    const [usersMemC, setUsersMemC] = useState([])
    const [plans,setPlans] = useState([])
    const [docs,setDocs] = useState([])
    const [mediaFile,setMediaFile] = useState([])
    const [lookPhoto,setLookPhoto] = useState({look:false,link:""})
    function getFiles(id,key){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            key:key,
            eventID:id
        }
        axios({
            url: serverAddres("event/get-files.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            
            if(!data.data?.docs) return;
            if(key == "docs"){
                setDocs(data.data.docs)
            }else{
                setMediaFile(data.data.docs)
            }
        })
        .catch((error)=>console.log(error)) 
    }
    function getUsers(id,key){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            key:key,
            eventID:id
        }
        axios({
            url: serverAddres("event/get-event-members.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
           if(key == "eventMemberUser"){
                setUsersMem(data.data)
           }else{
            setUsersMemC(data.data)
           }
        })
        .catch((error)=>console.log(error)) 
    }
    function getPlans(id,key){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            key:key,
            eventID:id
        }
        axios({
            url: serverAddres("event/get-plans.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setPlans(data.data)
        })
        .catch((error)=>console.log(error)) 
    }
    const link = useParams();
    function getEvent(){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            link:link.link,
        }
        axios({
            url: serverAddres("event/get-event.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setEvent(data.data) 
            if(data.data?.id)  {
                getUsers(data.data.id,"eventMemberUser")
                getUsers(data.data.id,"eventMemberCase")
                getPlans(data.data.id,"eventPlan")
                getFiles(data.data.id,"docs")
                getFiles(data.data.id,"media")
            }

        })
        .catch((error)=>console.log(error)) 
    }
    const [event,setEvent] = useState({})
    const [control, setControl] = useState(false)
    const [usersMem, setUsersMem] = useState([])
    useEffect(()=>{
        getEvent();
    },[])
    return !!event.id ? 
        (
        <div className={s.wrap}>
            <div className={s.control}>
                <div className={s.panel}>
                    <div className={s.panel__item}>
                        <img src={settingImg} className={s.panel__img} alt="" onClick={()=>{
                            setControl(!control)
                        }} />
                    </div>
                </div>
            </div>
            <div className={s.inner}>
                <div className={s.title__wrap}>
                    <div className={s.title}>
                        <h1 style={{color:event.color}}>{event.title}</h1>
                    </div>
                    <div className={s.desc}>
                        <p dangerouslySetInnerHTML={{__html:event.description}}></p>
                    </div>
                </div>
                <div className={s.members}>
                    <h2>Учасники івенту</h2>
                    <div className={s.members__inner}>
                    <div>
                        <p>Організатори</p>
                        <GetUsers users={usersMem} id={event.id}/>
                    </div>
                    <div>
                        <p>Учасники</p>
                        <GetUsers type = "case" users={usersMemC} id={event.id}/>
                    </div>
                    </div>
                </div>
                <div className={s.plans}>
                        <GetPlans id={event.id} plans = {plans}/>
                </div>
                <div className={s.docs}>
                        <GetDocs id={event.id} docs = {docs}/>
                </div>
                <div className={s.media}>
                        <Galery id={event.id} media = {mediaFile} title = "Завантажені медіа файли"/>
                        
                </div>
               
            </div>
            {lookPhoto.look?<BigPhoto link = {lookPhoto.link} close = {()=>{setLookPhoto({...lookPhoto,look:false})}}/>:null}
            {control ? <EventModal getPlans = {(id,key)=>{
                getPlans(id,key)
            }} getUsers = {(id,key)=>{
                getUsers(id,key)
            }} info={event} close={()=>{setControl(!control)}}/>:null}
        </div>
        
        ):(
        <h1>{event.message}</h1>
        )
}

export default Event;