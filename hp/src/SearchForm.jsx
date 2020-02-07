import React, {useState} from 'react';
import axios from 'axios';

function SearchForm() {
  const [house, setHouse] = useState('');
  const [houses, setHouses] = useState([]);

  function getHouse(e) {
    setHouse(e.target.value);  
  }

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
        <div key={index}
            className='characters'
        
        >
          <p className='charName'>{rep.name}</p>
          <img src={rep.image}
                alt={rep.name}
                className='char-pic'
          />
        </div>
      )
    })
  } else {
    houseReps = <p></p>
  }

  return (
    <div>
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
      <div>
      {houseReps}
      </div>
    </div>
  )

}

export default SearchForm;