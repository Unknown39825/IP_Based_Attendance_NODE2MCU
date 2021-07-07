
import axios from 'axios';
import React, {  useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"
var MAC_ADDRESS = require("is-mac-address");

// import config from "../config.json";
export default function UpdateStudent(props) 
{
    let id=props.match.params.id;
   
    const [studentPost, setStudent] = useState({
        firstname:'',
        lastname:'',
        rollno:'',
        macaddress:''
    });

    const [created, setCreated] = useState(false);

    const handleChange = (e) => {
        setStudent({
            ...studentPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {

            console.log("hello");
             try{
            const res= await axios.post(`/student/register` , studentPost );
            console.log("result");
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
            window.alert(err.error);
            return;
        }
        window.alert('Student created');
        
    }

    const onSubmit =(e) => {
        e.preventDefault();
        if(studentPost.rollno.trim() !== "" && studentPost.macaddress.trim!=="" )
        {
            console.log("submitteind");
            postEvent();
        }
        else
        {
            window.alert("Roll no and mac details are empty");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    console.log(studentPost);

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded"> Create Student </h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>FristName</b></Form.Label> 
                    <Form.Control className="input" type="text" name="firstname" value={studentPost.firstname} onChange={handleChange} placeholder="" />
                </Form.Group>
                 <Form.Group controlId="">
                <Form.Label><b>lastname</b></Form.Label> 
                    <Form.Control className="input" type="text" name="lastname" value={studentPost.lastname} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Roll no</b></Form.Label>
                <Form.Control className="input"type="text" name="rollno" value={studentPost.rollno} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>MacAddress</b></Form.Label>

                <span>{!(MAC_ADDRESS.isMACAddress(studentPost.macaddress))?"    invalid":"    mac address valid"} </span>
                <Form.Control className="input"type="text" name="macaddress" value={studentPost.macaddress} onChange={handleChange}  placeholder="" />
    
            </Form.Group>

            <Button variant="primary" onClick={onSubmit}>Submit</Button>
            
            </Form>
        </div>
        </Container>
    )
}
