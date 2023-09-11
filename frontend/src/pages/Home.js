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

    // const [inputText, setInputText] = useState("");
    // let inputHandler = (e) =>{
    // var lowerCase = e.target.value.toLowerCase();
    // setInputText(lowerCase);
    // }
    // const filteredData = data.filter((el) => {
    //     if (data.input === '') {
    //         return el;
    //     } else {
    //         return el.text.toLowerCase().includes(data.input)
    //     }
    // })

    axios.get('http://localhost:8000/showdoctor').then(res => {
        setData(res.data)
        
    })
    return <div>
        <div className="column is-center"><input type="text"/></div>
        <div className="columns is-multiline" >{data.map(user => (
            <div className="column is-4" key={user.pk}>
                <button className="button is-info">Name={user.fields.Name}     ID={user.fields.IdDoctor}</button>
            </div>
        ))}</div>
    </div>
  };
  
  export default Home;