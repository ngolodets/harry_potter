import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Filter() {
  const [chars, setChars] = useState([]);
  const [filteredChars, setFilteredChars] = useState([]);
  const [isAlive] = useState(true);
  const [breathingStatus, setBreathingStatus] = useState('');

  useEffect(function() {
    let url = 'http://hp-api.herokuapp.com/api/characters';
    axios.get(url)
      .then(function(response) {
        setChars(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  let filteredContent;
  //let livingStatus;
  function filterChars(living) {
    if (chars.length > 0) {
      let arr = chars.slice();
      //console.log(arr)
      if (living === false) {
        setBreathingStatus('Dead Characters:');
        filteredContent = arr.filter((char) => {
          if (char.alive === false) {
            //console.log(char);
            if (filteredChars.indexOf(char) === -1) {
              filteredChars.push(char);
            }
            return char;
          }
      })
    } else if (living === true) {
      setBreathingStatus('Living Characters:');
      filteredContent = arr.filter((char) => {
        if (char.alive === true) {
          //console.log(char);
          if (filteredChars.indexOf(char) === -1) {
            filteredChars.push(char);
          }
          return char;
        }
      })
    }
    setFilteredChars(filteredContent);
    //console.log(filteredChars);
    }
  }

  let content;
  if (filteredChars.length > 0) {
    content = filteredChars.map((char, index) => {
      return (
        <div key={index}
              className='characters'
              id='filteredChars'
        >
          <p className='charName'>{char.name}</p>
          <img src={char.image} 
                alt={char.name}
                className='char-pic' 
          />
        </div>
      )
    })
  } else {
      content = <p>No Characters</p>
  }

  return (
    <div>
      <div id='filter'>
        <span onClick={() => filterChars(!isAlive)}>Dead</span>| 
        <span onClick={() => filterChars(isAlive)}>Alive</span>
      </div>
      <div id='livingAndDead'>
        <h1 className='title' id='living'>{breathingStatus}</h1>
        {content}
      </div>
    </div>
  )
}

export default Filter;