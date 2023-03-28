import axios from 'axios'
import { useState, useEffect } from 'react'
import Recursion from './Recursion'


function Category() {

    const [category, setcategory] = useState([])
    const [inputcategoryname, setinputcategoryname] = useState("")
    const [categorytype, setcategorytype] = useState("")
    const [chosencategory, setchosencategory] = useState(null);
    const [storeshowcategorydata,setstoreshowcategorydata]=useState([])
    

    // useEffect(() => {
    //     addcategory();
    // }, [])
    const addcategory = async (e) => {

        const res = await axios.get("http://localhost:8010/addcategory")
        try {
            setcategory(res.data)
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
        }

    }

    const clickonadd = async (e) => {
        e.preventDefault();
        try {
            if (inputcategoryname == "") {
                alert("enter category name");
            }
            // else if (chosencategory == "") {
            //     alert("select category");
            // } 
            else {

                const res = await axios.post("http://localhost:8010/clickonadd", {
                    inputcategoryname: inputcategoryname,
                    //input ma je enter kariye e upernama jase
                    //
                    id: chosencategory
                    //je category choose kariye ee category table mathi eni recid pass
                }
                )
                console.log(res.data)
            }
            // console.log("data added successfully")
        }
        catch (error) {
            console.log(error)
        }

    }

const showcategorydata = async(e) =>
{
e.preventDefault();
const res= await axios.get("http://localhost:8010/showcategorydata")
console.log(res.data)
setstoreshowcategorydata(res.data)

}


    console.log(chosencategory)
    console.log(inputcategoryname)
    return (
        <>
            <div>
                <form action="">
                    <div><label htmlFor="">Category Type</label>
                        <input type="radio" name="category"
                            value="parent"
                            id="parent"
                            onChange={() => { setcategorytype("parent") }} />
                        <label htmlFor="parent">parent</label>
                        <input type="radio" name="category"
                            value="child"
                            id="child"
                            onChange={() => { setcategorytype("child") }} /><label htmlFor="child"
onClick={addcategory}
                            >child</label></div>
                    <div>
                        <label htmlFor="">Category Name</label>
                        <input type="text" name="categoryname"
                            value={inputcategoryname}
                            onChange={(e) => setinputcategoryname(e.target.value)}
                          
                        />
                    </div>

                    <div>
                        {categorytype == "child" &&
                            <>
                                <label htmlFor="">Choose Category</label>
                                <select name="category" id="category" value={chosencategory}
                                    onChange={(e) => setchosencategory(e.target.value)} >

                                    {
                                        category.map((items, index) => (
                                            <option value={items.parent_id}>{items.category}</option>
                                        ))
                                    }</select></>
                        }
                    </div>
                    <div>
                        <button type="submit" onClick={clickonadd}>ADD</button>
                    </div>
                    <div>
                        <button onClick={showcategorydata}>Show Category</button>
                    </div>

<div>
    {storeshowcategorydata.map((items)=>(
        <>{console.log(items)}
        <Recursion 
        props={items}
        /></>
    ))}
</div>

                </form></div></>
    )
}

export default Category;
