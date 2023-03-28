import axios from 'axios';
import { useState,useEffect } from 'react';

function Recursion({props}){
    

    console.log(props);
    const [childData, setChildData] = useState([]);
    const [showupdatefield,setshowupdatefield]=useState(false)
const id = props.recid
console.log(id)

useEffect(() => {
    // console.log(item);
    getchilddata();
}, [])
    const getchilddata = async(e) =>{
        const res = await axios.get("http://localhost:8010/getchilddata",{
           id : id
        })
        console.log(res.data)
    }
    return(
        <>
        <div>
            <span>
                <button onClick={(e)=>{e.preventDefault();
                    setshowupdatefield(true)}}>Edit</button>
                    {props.category}
           </span>
            {showupdatefield?
            <span>
                
                <input type="text" placeholder="write to update data"/>
               <button onClick={(e)=>{e.preventDefault();
                    setshowupdatefield(false)}}>UPDATE</button>
              
            </span>
            :null}
             <button>DELETE</button>
        </div>
        </>
    )
}

export default Recursion
