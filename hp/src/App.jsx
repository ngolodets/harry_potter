import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  // const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [house, setHouse] = useState('');
  const [houses, setHouses] = useState([]);

  useEffect(function() {
    let url = 'http://hp-api.herokuapp.com/api/characters';
    axios.get(url)
      .then(function(response) {
        setAllCharacters(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  function handleSubmit(e, input) {
    e.preventDefault();
    input = house;
    input = input.toLowerCase();
    let url = `http://hp-api.herokuapp.com/api/characters/house/${input}`;
    axios.get(url)
      .then(function(response) {
        setHouses(response.data);
        setHouse('');
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  let houseReps;

  if (houses.length > 0) {
    houseReps = houses.map(function(rep, index) {
      return (
        <div key={index}>
          {rep.name}
        </div>
      )
    })
  } else {
    houseReps = <p></p>
  }

  function getHouse(e) {
    setHouse(e.target.value);  
  }

  function getStaff() {
    let url = 'http://hp-api.herokuapp.com/api/characters/staff';
    axios.get(url)
      .then(function(response) {
        setStaff(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  }

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

  // function getStudents() {
  //   let url = 'http://hp-api.herokuapp.com/api/characters/students';
  //   axios.get(url)
  //     .then(function(response) {
  //       setStudents(response.data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     })
  // }

  // let pupils;

  // if (students.length > 0) {
  //   pupils = students.map(function(student, index) {
  //     return (
  //       <div key={index}>
  //         {student.name}
  //       </div>
  //     )
  //   })
  // } else {
  //   pupils = <p></p>
  // }

  let content;

  if (allCharacters.length > 0) {
    content = allCharacters.map(function(character, index) {
      let wand = character.wand;
      
      return (
        <div key={index}>
          <h3>{character.name}</h3>
          <p>Played by {character.actor}</p>
          <img src={character.image} 
                alt={character.name}
                id='char-pic'
          />  
          <div style={{display: wand.wood ? 'block' : 'none'}}>
            <h4>Wand Information</h4>
            <p>Material: {wand.wood}</p>
            <p>Core: {wand.core}</p>
            <p>Length: {wand.length} inches</p>
          </div>
        </div>
      )
    })
  } else {
    content = <h1>There Are No Characters!</h1>
  }
  return (
    <div className="App">
      
      {/* <input type='submit'
              value='students'
              onClick={getStudents}
      /> */}
      <input type='submit'
              value='staff'
              onClick={getStaff}
      />
      <form onSubmit={handleSubmit}>
        <input type='text'
                value={house}
                onChange={getHouse}
        />
      </form>
      {/* <div>{pupils}</div> */}
      <div>{teachers}</div>
      <div>{houseReps}</div>
      {content}
    </div>
  );
}

export default App;
