import React from 'react';
import ClassTable from './ClassTable';
import StudentTable from './StudentTable';

const admin = () => {
    return (
        <div>
            <ClassTable/>
            <StudentTable/>
        </div>
    );
}

export default admin;
