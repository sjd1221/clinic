import { Outlet, Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import '../css/Home.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ReactSearchBox from "react-search-box";


const Home = () => {
    const [data, setData] = useState([]); // get all doctor
    const [temp, setTemp] = useState([]); // get all details
    const [filter, setFilter] = useState("enter"); // filter doctor
    const [query, setQuery] = useState(""); // search doctor
    const [index, setIndex] = useState([]); //
    const [toggle, setToggle] = useState({name: "", id: "", DelayDoctor: "", EnterDoctor: "", HurryDoctor: "", ExitDoctor: "", DateDoctor: ""}); // modal card
    const [active, setActive] = useState(false); // modal is-active
    const [isloaded, setIsloaded] = useState(true); // axios control

    const onOptionChange = e => {
        setFilter(e.target.value)
      }

    const onIsActive = e => {
        setActive(false)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setToggle((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
      };

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/adddoctor', toggle)
    .then(res => {
        setTemp(res.data)
    })};
    
    axios.get('http://localhost:8000/testsite').then(res => {
        console.log(res.data)
    })

    if(isloaded == true){ 
        axios.get('http://localhost:8000/showdoctor').then(res => {
            setData(res.data.doct)
            setTemp(res.data.detail)
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
    // const listcheck = data.filter((item) => item.fields.DelayDoctor !== null).map(item => item)

    return <div>
        
        <div className="column is-center">
            <div className="column " >
                <input type="text"  onChange={event => setQuery(event.target.value)}/>
                <label className="radio"><input type="radio" name="filter" value="all" onChange={onOptionChange} checked={filter === "all"} />همه پزشکان</label>
                <label className="radio"><input type="radio" name="filter" value="enter" onChange={onOptionChange} checked={filter === "enter"} />پزشکان(ورود)</label>
            </div>
            </div>
            <div className={"modal" + (active ? "is-active" : "")}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button onClick={onIsActive} className="delete" aria-label="close"></button>
                    </header>
                    <form onSubmit={handleSubmit}>
                    <section className="modal-card-body">
                            <label className="label">نظام پزشکی</label>
                            <input name="id" className="input" type="text" value={toggle.id} onChange={handleInputChange} disabled />
                            <label className="label">نام پزشک</label>
                            <input name="name" className="input" type="text" value={toggle.name} onChange={handleInputChange} disabled />
                            <label className="label">روز</label>
                            <input name="DateDoctor" className="input" type="text" value={toggle.DateDoctor} onChange={handleInputChange}/>
                            <label className="label">ورود</label>
                            <input name="EnterDoctor" className="input" type="text" value={toggle.EnterDoctor} onChange={handleInputChange}/>
                            <label className="label">تعجیل</label>
                            <input name="DelayDoctor" className="input" type="text" value={toggle.DelayDoctor} onChange={handleInputChange}/>
                            <label className="label">خروج</label>
                            <input name="ExitDoctor" className="input" type="text" value={toggle.ExitDoctor} onChange={handleInputChange}/>
                            <label className="label">تاخیر</label>
                            <input name="HurryDoctor" className="input" type="text" value={toggle.HurryDoctor} onChange={handleInputChange}/>
                    </section>
                        <footer className="modal-card-foot">
                            <button type="submit" onClick={onIsActive} className="button is-success">Save changes</button>
                            <button onClick={onIsActive} className="button">Cancel</button>
                        </footer>
                    </form>
                </div>
            </div>
            
            <table className="table">
                <thead>
                    <th className="">نام پزشک</th>
                    <th className="">نظام</th>
                    <th className="">نظام</th>
                    <th className="">نظام</th>
                    <th className="">نظام</th>
                    <th className="">نظام</th>
                </thead>
                <tbody >
                    {temp.map(user => (
                     <tr className="is-clickable" onClick={() => (setToggle((pervprops) => ({
                        ...pervprops,
                        name : user.Doctor,
                        id : user.Doctor,
                    })), setActive(true))} key={user.pk}>
                         <td>{user.DateDoctor}</td>
                         <td>{user.DelayDoctor}</td>
                         <td>{user.EnterDoctor}</td>
                         <td>{user.HurryDoctor}</td>
                         <td>{user.ExitDoctor}</td>
                         {/* <td>{data.filter(doc => doc.id == user.Doctor_id).map()}</td> */}
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
            
        
        </div>
    };
  
  export default Home;