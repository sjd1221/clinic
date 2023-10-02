import { Outlet, Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import '../css/Home.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ReactSearchBox from "react-search-box";


const Home = () => {
    const [data, setData] = useState([]);
    const [temp, setTemp] = useState([]);
    const [filter, setFilter] = useState("enter");
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState([]);
    const [toggle, setToggle] = useState("");
    const [active, setActive] = useState(false);
    const [isloaded, setIsloaded] = useState(true);

    const onOptionChange = e => {
        setFilter(e.target.value)
      }

    const onIsActive = e => {
        setActive(false)
    }
    
    if(isloaded == true){ 
        axios.get('http://localhost:8000/showdoctor').then(res => {
            setData(res.data)
            setIsloaded(false)
        })
    }
    // data.filter(user => {
    //     if (query === '') {
    //         setTemp(user);
    //     } else if (user.fields.Name.toLowerCase().includes(query.toLowerCase())) {
    //         setTemp(user);
    //     }
    // })
    const listcheck = data.filter((item) => item.fields.DelayDoctor !== null).map(item => item)

    
    return <div>
        <div className="column is-center">
            <div className="column " >
                <input type="text"  onChange={event => setQuery(event.target.value)}/>
                <label className="radio"><input type="radio" name="filter" value="all" onChange={onOptionChange} checked={filter === "all"} />همه پزشکان</label>
                <label className="radio"><input type="radio" name="filter" value="enter" onChange={onOptionChange} checked={filter === "enter"} />پزشکان(ورود)</label>
            </div>
            </div>
            
            <table className="table">
                <thead>
                    <th className="">نام پزشک</th>
                    <th className="">نظام</th>
                </thead>
                <tbody >
                    {data.map(user => (
                     <tr onClick={() => axios.post('http://localhost:8000/adddelay', user.fields.IdDoctor).then(res => setActive(true))} key={user.pk}>
                         <td>{user.fields.Name}</td>
                         <td>{user.fields.IdDoctor}</td>
                     </tr>
                     ))}
                </tbody>
                {/* { (() => {if (filter == "enter"){
                    console.log("sjd1221");
                }
                // <tbody >
                // {data.filter((item) => item.fields.DelayDoctor != null).map(user => (
                //     <tr key={user.pk}>
                //         <td>{user.fields.Name}</td>
                //         <td>{user.fields.IdDoctor}</td>
                //         <td>{user.fields.DelayDoctor}</td>
                //     </tr>
                //     ))}
                // </tbody>
                else if (filter == "all"){
                    console.log("sajad");
                }
                // <tbody >
                // {data.map(user => (
                //     <tr key={user.pk}>
                //         <td>{user.fields.Name}</td>
                //         <td>{user.fields.IdDoctor}</td>
                //         <td>{user.fields.DelayDoctor}</td>
                //     </tr>
                //     ))}
                // </tbody>
                })
            } */}
            </table>
            <div className={"modal" + (active ? "is-active" : "")}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button onClick={onIsActive} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div>IdDoctor</div>
                        <div>Name</div>
                        <input className="input" type="text"></input>
                        <input className="input" type="text"></input>
                        <input className="input" type="text"></input>
                        <input className="input" type="text"></input>
                    </section>
                        <footer className="modal-card-foot">
                            <button onClick={onIsActive} className="button is-success">Save changes</button>
                            <button onClick={onIsActive} className="button">Cancel</button>
                        </footer>
                </div>
            </div>
        
        </div>
    };
  
  export default Home;