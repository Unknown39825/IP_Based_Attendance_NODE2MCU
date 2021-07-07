
import axios from 'axios';
import React, {  useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

export default function AddStudentToClass(props) 
{
    let id=props.match.params.id;
    
    const [data, setData] = useState({
       rollno:'',
    });

    const [created, setCreated] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {

             try{
            const res= await axios.put(`/class/addstudent/${id}` , data );
            console.log(res);
            
            setCreated(true);
        }catch(err){
            
            window.alert("Student not found");
            return;
        }
        window.alert('Student Added');
        
    }

    const onSubmit =(e) => {
        e.preventDefault();
        if(data.rollno.trim!=="")
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
             <h1 className="bg-dark m-2 text-white p-2 rounded"> Add Student</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Student Roll No</b></Form.Label> 
                    <Form.Control className="input" type="text" name="rollno" value={data.rollno} onChange={handleChange} placeholder="" />
                </Form.Group>
            <Button variant="primary" onClick={onSubmit}>Submit</Button>
            
            </Form>
        </div>
        </Container>
    )
}
