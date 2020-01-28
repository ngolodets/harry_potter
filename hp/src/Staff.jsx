import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(function() {
    let url = 'http://hp-api.herokuapp.com/api/characters/staff';
    axios.get(url)
      .then(function(response) {
        setStaff(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  let teachers;
  if (staff.length > 0) {
    teachers = staff.map(function(teacher, index) {
      return (
        <div key={index}>
          {teacher.name}
        </div>
      )
    })
  } else {
    teachers = <p></p>
  }

  return (
    <div>
      {teachers}
    </div>
  )
  

}

export default Staff;