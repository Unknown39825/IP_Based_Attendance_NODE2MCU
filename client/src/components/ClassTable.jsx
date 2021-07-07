import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json"
const ContributorTables = () => {

   const [classes, setClasses] = useState([]);
   const [created, setCreated] = useState(false);
     useEffect(() => {
       const dataFetch = async ()=>{
           try{
                const res=await axios.get(`/class/all`);

                if(res.data)
                {
                    setClasses(res.data);
                    
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

      <h1>Classes</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>Cousre</th>
      <th>couserId</th>
      <th>Teacher</th>
      <th>No of Students</th>
      <th>addstudent</th>
      <th>view attendence</th>
    </tr>
  </thead>
  <tbody>
    {classes.map((event)=>{
      return (<tr>
        <td>{event.course}</td>
        <td>{ event.courseId}  </td> 
        <td>{ event.teacher}  </td> 
        <td>{ event.students.length}  </td> 
        <td><Link to={{pathname:'/class/addstud/'+event._id}}>            <Button>Add Student</Button>          </Link></td>
        <td><Link to={{pathname:'/class/stud/'+event._id}}>            <Button>View Attendence</Button>          </Link></td>
       
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/class/register'}}>            <Button>Create Class</Button>          </Link>
      
    </div>
  );
}

export default ContributorTables;
