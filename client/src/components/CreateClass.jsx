
import axios from 'axios';
import React, {  useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

export default function CreateClass(props) 
{
   
    const [classPost, setClass] = useState({
        teacher:'',
        course:'',
        courseId:''
    });

    const [created, setCreated] = useState(false);

    const handleChange = (e) => {
        setClass({
            ...classPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {

             try{
            const res= await axios.post(`/class/register` , classPost );
            
            setCreated(true);
        }catch(err){
            console.log(err);
            window.alert(err.error);
            return;
        }
        window.alert('class Created');
        
    }

    const onSubmit =(e) => {
        e.preventDefault();
        if(classPost.courseId.trim() !== "" && classPost.course.trim!=="" )
        {
            console.log("submitted");
            postEvent();
        }
        else
        {
            window.alert("Please fill the all details");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded"> Create Class</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Couse Id</b></Form.Label> 
                    <Form.Control className="input" type="text" name="courseId" value={classPost.courseId} onChange={handleChange} placeholder="" />
                </Form.Group>
                 <Form.Group controlId="">
                <Form.Label><b>course</b></Form.Label> 
                    <Form.Control className="input" type="text" name="course" value={classPost.course} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>teacher</b></Form.Label>
                <Form.Control className="input"type="text" name="teacher" value={classPost.teacher} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Button variant="primary" onClick={onSubmit}>Submit</Button>
            
            </Form>
        </div>
        </Container>
    )
}
