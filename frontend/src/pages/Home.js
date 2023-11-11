import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ReactSearchBox from "react-search-box";
import {
  DatePicker,
} from "react-advance-jalaali-datepicker";
import TimePicker from 'rc-time-picker';
import moment from 'moment';


import 'rc-time-picker/assets/index.css';
import 'bulma/css/bulma.css';
import '../css/Home.css';

const Home = () => {
    const [data, setData] = useState([]); //data show table
    const [value, setValue] = useState('10:00');
    const [temp, setTemp] = useState([]); // get all details
    const [filter, setFilter] = useState("all"); // status filter doctor
    const [query, setQuery] = useState(""); // search doctor
    const [index, setIndex] = useState([]); // filter doctor
    const [toggle, setToggle] = useState({name: "", id: "", DelayDoctor: "", EnterDoctor: "", HurryDoctor: "", ExitDoctor: "", DateDoctor: ""}); // modal card
    const [active, setActive] = useState(false); // modal is-active
    const [isloaded, setIsloaded] = useState(true); // axios control
    const [check, setCheck] = useState(false);


    const change = (unix, formatted) => {
        // console.log(unix); // returns timestamp of the selected value, for example.
        setToggle({...toggle, DateDoctor: formatted.replaceAll("/", "-")}) // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
      }
    const DatePickerInput =(props) => {
        return <input className="popo" {...props} />;
      }

    const onOptionChange = e => {
        setFilter(e.target.value)
        setCheck(false)
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
        // setTemp(res.data)
    })};
    
    axios.get('http://localhost:8000/testsite').then(res => {
        // console.log(res.data)
    })

    if(isloaded == true){ 
        axios.get('http://localhost:8000/showdoctor').then(res => {
            setTemp(res.data.detail)
            setData(res.data.detail)
            setIndex(res.data.detail)
            setIsloaded(false)
        })
    }

    const handlefilter = (event) => {
        const list = []
        console.log(query)
        setQuery(event.target.value)
        index.filter(user => {
            if (query === '') {
                setData(index)
            }
            else if (user.Doctor__Name.toLowerCase().includes(query.toLowerCase()) == true) {
                list.push(user)
                setData(list)
            }
            else if (user.Doctor__Name.toLowerCase().includes(query.toLowerCase()) == false) {
                console.log(query)
            }
        })
    }
    
    
    if(check == false){
        if(filter == "enter"){
            const listcheck = temp.filter((item) => item.DelayDoctor !== null).map(item => item)
            setData(listcheck)
            setIndex(listcheck)
            setCheck(true)
        }
        else if(filter == "all"){
            setData(temp)
            setIndex(temp)
            setCheck(true)
        }
    }
    

    return <div>
        <div className="column is-center">
            <div className="column " >
                <input type="text"  onChange={handlefilter}/>
                <label className="radio"><input type="radio" name="filter" value="all" onChange={onOptionChange} checked={filter === "all"} />همه پزشکان</label>
                <label className="radio"><input type="radio" name="filter" value="enter" onChange={onOptionChange} checked={filter === "enter"} />پزشکان(ورود)</label>
            </div>
        </div>
            <form onSubmit={handleSubmit}>
            <div className={"modal" + (active ? "is-active" : "")}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button onClick={onIsActive} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <label className="label">نظام پزشکی</label>
                        <input name="id" className="input" type="text" value={toggle.id} disabled />
                        <label className="label">نام پزشک</label>
                        <input name="name" className="input" type="text" value={toggle.name} disabled />
                        <label className="label">روز</label>
                        {/* <input name="DateDoctor" className="input" type="text" value={toggle.DateDoctor} onChange={handleInputChange}/> */}
                        <DatePicker
                            inputComponent={DatePickerInput}
                            placeholder="انتخاب تاریخ"
                            format="jYYYY/jMM/jDD"
                            onChange={change}
                            id="datePicker"
                            preSelected=""
                        />
                        <label className="label">ورود</label>
                        {/* <input name="EnterDoctor" className="input" type="text" value={toggle.EnterDoctor} onChange={handleInputChange}/> */}
                        <TimePicker
                            style={{ width: 100 }}
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={(value) => {setToggle({...toggle, EnterDoctor: value.format('HH:mm')})}}
                        />
                        <label className="label">تاخیر</label>
                        {/* <input name="DelayDoctor" className="input" type="text" value={toggle.DelayDoctor} onChange={handleInputChange}/> */}
                        <TimePicker
                            style={{ width: 100 }}
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={(value) => {setToggle({...toggle, DelayDoctor: value.format('HH:mm')})}}
                        />
                        <label className="label">خروج</label>
                        {/* <input name="ExitDoctor" className="input" type="text" value={toggle.ExitDoctor} onChange={handleInputChange}/> */}
                        <TimePicker
                            style={{ width: 100 }}
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={(value) => {setToggle({...toggle, ExitDoctor: value.format('HH:mm')})}}
                        />
                        <label className="label">تعجیل</label>
                        {/* <input name="HurryDoctor" className="input" type="text" value={toggle.HurryDoctor} onChange={handleInputChange}/> */}
                        <TimePicker
                            style={{ width: 100 }}
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={(value) => {setToggle({...toggle, HurryDoctor: value.format('HH:mm')})}}
                        />
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" onClick={onIsActive} className="button is-success">Save changes</button>
                        <button onClick={onIsActive} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
            </form>
            <table className="table">
                <thead>
                    <th></th>
                    <th className="">نام پزشک</th>
                    <th className="">نظام</th>
                    <th className="">روز</th>
                    <th className="">ورود</th>
                    <th className="">تاخیر</th>
                    <th className="">خروج</th>
                    <th className="">تعجیل</th>
                </thead>
                <tbody >
                    {data.map(user => (
                     <tr key={user.pk}>
                        <td><button onClick={() => (setToggle(() => ({name : user.Doctor__Name, id : user.Doctor__IdDoctor, DateDoctor : user.DateDoctor})), setActive(true))} className="button">افزودن</button></td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.Doctor__Name}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.Doctor__IdDoctor}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.DateDoctor}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.EnterDoctor}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.DelayDoctor}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.ExitDoctor}</td>
                        <td className="is-clickable" onClick={() => (setToggle(() => ({
                        name : user.Doctor__Name,
                        id : user.Doctor__IdDoctor,
                        DelayDoctor : user.DelayDoctor,
                        DateDoctor : user.DateDoctor,
                        EnterDoctor : user.EnterDoctor,
                        ExitDoctor : user.ExitDoctor,
                        HurryDoctor : user.HurryDoctor,
                    })), setActive(true))}>{user.HurryDoctor}</td>
                     </tr>
                     ))}
                </tbody>
            </table>
            
        
        </div>
    };
  
  export default Home;