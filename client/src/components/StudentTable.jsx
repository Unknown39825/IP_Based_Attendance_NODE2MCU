import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json"
const ContributorTables = () => {

   const [students, setStudents] = useState([]);
   const [created, setCreated] = useState(false);
     useEffect(() => {
       const dataFetch = async ()=>{
           try{
                const res=await axios.get(`/student/all`);

                if(res.data)
                {
                    setStudents(res.data);
                    console.log(res.data);
                  
                }
           }
           catch(error){
               console.log(error);
           }
       }
       dataFetch();

    },[]);
    
    if(created)
    {
        window.location.reload();
    }

  return (
    <div className="container">

      <h1>students</h1> 
      
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

    <Link to={{pathname:'/student/register'}}>            <Button>register Student</Button>          </Link>
      
    </div>
  );
}

export default ContributorTables;
