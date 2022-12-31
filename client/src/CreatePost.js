
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate} from "react-router-dom"
import axios from "axios"

function CreatePost() {
    const navigate = useNavigate()
    const [post ,setPost]= useState({
        title:"",
        description:""
    })
    const handleChange=(event)=>{
        const{name,value}= event.target;
      
        setPost((prev)=>{
           
            return{
                ...prev,[name]:value
            }
        })
    }
   

    // useEffect(()=>{
    //     console.log(post)
    // },[post])
    function handleClick(event){
        event.preventDefault()
        
        axios.post("/create",post).then(res =>console.log(res)).catch(err =>console.log(err))
        navigate("posts")

    }
  return (
    <div style={{width:"90%", margin:"auto auto" , textAlign:"center"}}>
        <h1>Create a Post</h1>
        <Form>
            <Form.Group>
                <Form.Control value={post.title} style={{marginBottom:"1rem"}}name="title" placeholder="Title" onChange={handleChange}/>
                

                <Form.Control  value={post.description} style={{marginBottom:"1rem"}} name="description" placeholder="Description"  onChange={handleChange} />


            </Form.Group>
            <Button style={{width:"100%", marginBottom:"1rem"}} variant="outline-success" onClick={handleClick}>Create Post</Button>
        </Form>
        <Button style={{width:"100%"}} variant="outline-dark" onClick={()=>{
            navigate(-1)
        }}>Back</Button>
    </div>
  )
}

export default CreatePost