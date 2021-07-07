
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import admin from './components/admin';
import CreateStudent from './components/CreateStudent';
import CreateClass from './components/CreateClass';
import addStudent from './components/addStudentToClass';
import ClassWiseStudent from './components/ClassWiseStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          
          <Route path="/student/register" component={CreateStudent} />
          <Route path="/class/register" component={CreateClass} />
          <Route path="/class/addstudent/:id" component={addStudent} />
          <Route path="/class/students/:id" component={ClassWiseStudent} />
         
          <Route path="/" component={admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;