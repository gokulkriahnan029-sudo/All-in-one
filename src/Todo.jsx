import { useEffect, useState } from 'react';
import React from 'react';
import './Todo.css'
import Confirm from './Confirm';

const Todo = () => {

    const [items, setItems] = useState([])
    const [name, setname] = useState("")
    const [isconfirm, setisconfirm] = useState(false)

    function handledel(id){
        const del = items.filter((i) => i.id !== id)
        setItems(del)
    }
    function handlesubmit(e){
        e.preventDefault()
        if(!name.trim()) return;
        setItems([...items,{id: Date.now(), content: name, bool: false}])
        setname('')
    }
    function handlecheckbox(id){
        const fil = items.map((item) => item.id == id ? {id: item.id, content: item.content,bool: !item.bool } : item)
        setItems(fil)
    }

    const styles = {
        textDecoration : "line-through",
        color : "lightblue",
    }
    useEffect(() => {
        const value = localStorage.getItem("todo")
        if(value){
            setItems(JSON.parse(value))
        }
    },[])
    useEffect(() =>{
        localStorage.setItem("todo",JSON.stringify(items))
    },[items])

    function handleformat(){
        localStorage.clear();
        setisconfirm(false)
        window.location.reload()
    }

return(
        <>
            <div className='div'>
                <div className='todo'>
                    <h1> 📝 Todo-List Application 📝</h1>

                    <form onSubmit={handlesubmit}>
                        <input type="text" required placeholder=" Add list here " value={name} onChange={(e) => setname(e.target.value)} />
                        <button type='submit'>+</button>
                    </form>
                    <button type="submit" onClick={() => setisconfirm(true)} style={{backgroundColor : "red",
                                                  padding : "5px",
                                                  margin : "6px",
                                                  marginRight : "70px",
                                                  borderRadius : "10px",
                                                  
                                                  }  }>format all data</button>
                    <input type="text" placeholder=" -- Search --" />
                    <br />
                    <br />
                </div>
                <div className='list'>
                    {!items.length && <br />}
                    {!items.length && <br />}
                    {!items.length && <br />}
                    {!items.length && <br />}
                    {!items.length && <span className='todo-text'>List is empty !!</span>}
                    {items.map((item) => (
                        <div className='todo-list' key={item.id}>
                            <input type="checkbox"  checked={item.bool} />
                            <span className="custom-checkbox" onClick={() => handlecheckbox(item.id)} ></span>
                            <span className='todo-text' style={item.bool ? styles : { textDecoration : "none"}}>{item.content}</span>
                            <button className='delete-btn' onClick={() => handledel(item.id)}> 🗑️ Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            {isconfirm && <Confirm setisconfirm ={setisconfirm}
                                   handleformat={handleformat}
                          />}
        </>
    )
};

export default Todo;