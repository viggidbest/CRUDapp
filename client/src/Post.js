import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function Post() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updatedPost,setUpdatedPost] = useState({})
    const navigate= useNavigate()
    const [post,setPost] = useState([])
    useEffect(()=>{
       axios.get("/posts").then(
        (res)=>{console.log(res)
        setPost(res.data)
        }
       ).catch(err=>console.log(err)).then((res)=>{
        
       })
      
    },[])

    function deletePost (id) {
        axios.delete(`/delete/${id}`).then(
            res=> console.log(res)
        ).catch(err => console.log(err))
        window.location.reload()
    }
    const updatePost=(id, title, description)=>{
      setUpdatedPost((prev) => {
        return {
          ...prev,
          id: id,
          title: title,
          description: description,
        };
      });
      
        handleShow()
        
    }
    function handleChange(e){
      
      const { name, value } = e.target;
      console.log(name)
      console.log(value)
      setUpdatedPost((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };
    function saveUpdatedPost () {
        axios.put(`/update/${updatedPost.id}`,updatedPost).then(res=>console.log(res)).catch(err=>console.log(err))
        window.location.reload()
    }
  return (
    <div style={{width:"90%", textAlign:"center",margin:"auto auto"}}>
        <h1>Posts Made</h1>
        <Button style={{width:"100%",marginBottom:"1rem"}}variant="outline-dark" onClick={()=>{navigate(-1)}}>Back</Button> 
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Control name="title" value={updatedPost.title ? updatedPost.title : ""}placeholder="Title" style={{marginBottom:"1rem"}} onChange={handleChange} />

                    <Form.Control name="description" onChange={handleChange} value={updatedPost.description ? updatedPost.description : ""}placeholder="Description"/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        { post && post.map((item)=>{
            return(
                <div key={item._id} style={{border:"solid lightgrey 1px", borderRadius:"8px",marginBottom:"1rem", padding:"1rem"}}>
                    <h2>{item.title}</h2> 
                    <p>{item.description}</p>
                    <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                    <Button variant='outline-info'  onClick={()=>{updatePost(item._id, item.title, item.description)}}>Update</Button>
                    <Button onClick={()=>deletePost(item._id)}variant='outline-danger'>Delete</Button>
                    </div>
                           
            </div>
            
            )
             
            })}
    </div>
  )
}

export default Post