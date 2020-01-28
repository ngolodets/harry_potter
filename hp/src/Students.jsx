import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Students() {
  const [students, setStudents] = useState([]);

  //function getStudents() {
  useEffect(function() {
    let url = 'http://hp-api.herokuapp.com/api/characters/students';
    axios.get(url)
      .then(function(response) {
        setStudents(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);
    
  //}

  let pupils;

  if (students.length > 0) {
    pupils = students.map(function(student, index) {
      return (
        <div key={index}>
          {student.name}
        </div>
      )
    })
  } else {
    pupils = <p></p>
  }
  return (
    <div>
      {pupils}
    </div>
  )
}

export default Students;