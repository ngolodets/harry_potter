import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Students from './Students';
import Staff from './Staff';
import './App.css';
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from 'react-router-dom';

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
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
    <Router>
      <div className="App">
        <nav className='nav'
              style={{position: 'fixed',
                      top: '0',
                      width: '100%',
                      overflow: 'hidden',
                      backgroundColor: '#282c34'
                    }}
        >
          <Link to='/'
                style={{textDecoration: 'none',
                        color: 'white',
                        padding: '2em'
                }}
          >
            Home
          </Link>
          <Link to='/students'
                style={{textDecoration: 'none',
                color: 'white',
                padding: '2em'
                }}
          >
            Students
          </Link>
          <Link to='/staff'
                style={{textDecoration: 'none',
                color: 'white',
                padding: '2em'
                }}
          >
            Staff
          </Link>
          
          <form onSubmit={handleSubmit}
                style={{display: 'inline-block',
                        padding: '1em'
                }}
          >
            <label>Search House:
              <input type='text'
                      value={house}
                      onChange={getHouse}
                      id='search-house'
              />
            </label>
          </form>
        </nav>
        <Switch>
          <Route exact path='/students' component={Students} />
          <Route exact path='/staff' component={Staff} />
        </Switch>
        
        <div>
          {houseReps}
        </div>

        <div>
          {content}
        </div>
      </div>
    </Router>
  );
}

export default App;
