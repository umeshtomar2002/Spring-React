import fetch from 'unfetch';

export const getAllStudents = () => fetch('/students/allStudents');

export const addNewStudent = (student) => 
        fetch('/students/saveStudent',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify(student)
        });