import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json";
import { CSVLink, CSVDownload } from "react-csv";
const jsonexport = require('jsonexport');

const ClassWiseStudent = (props) => {

  let id=props.match.params.id;
  
   const [classes, setClasses] = useState([]); 
   const [students, setStudents] = useState([]);
   const [created, setCreated] = useState(false);
   const [csv, setCsv] = useState(undefined);

   useEffect(() => {
      
       dataFetch();
       
    },[]);
   const dataFetch = async ()=>{
           try{

                const res1=await axios.get(`/class/one/${id}`);
                if(res1.data)
                {
                    setClasses(res1.data);
                    
                }

                const res=await axios.get(`/class/students/${id}`);

                if(res.data)
                {
                    setStudents(res.data);
                    
                }
           }
           catch(error){
               console.log(error);
           }
       }
      
    const ResetStudent = async()=>{

      const secretkey= window.prompt("enter the secret key");
      if(secretkey!==config.secret)
      {
        window.alert("invalid key");
        return;

      }

      const res= await axios.put(`/student/reset/${config.secret}`);
      window.location.reload();

    }

    const getCSV= async ()=>{

      students.forEach((student)=>{
        delete student['_id'];
        delete student['__v'];
      })

      await jsonexport(students, function(err, csv){
      if (err) return console.error(err);
      setCsv(csv);
      
    }); 
    }

    if(created)
    {
        window.location.reload();
    }

  return (
    <div className="container">
      <h1>Attendence Details</h1>
      <h3>Course Id: {classes.courseId}</h3> 
      <h3>Couse Name: {classes.course}</h3> 
      <h3>Teacher: {classes.teacher}</h3> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>roll_no</th>
      <th>first name</th>
      <th>last name</th>
      <th>Mac Address</th>
      <th>Attendence</th>

    </tr>
  </thead>
  <tbody>
    {students.map((event)=>{
      return (<tr>
        <td>{event.rollno}</td>
        <td>{ event.firstname}  </td> 
        <td>{ event.lastname}  </td> 
        <td>{ event.mac}  </td> 
        <td>{ event.cnt}  </td> 
        
      </tr>)
      
    })

    }
  </tbody>
</Table>

             <Button onClick={ResetStudent}>Reset Students attendence</Button>  
             <br/>       
             <br/>       
             <Button onClick={getCSV}>Download As Csv</Button>     
             <br/>       
             <br/>       
             {
               (csv)?<CSVLink data={csv}>Download me</CSVLink>:""
             }
    </div>
  );
}

export default ClassWiseStudent;
