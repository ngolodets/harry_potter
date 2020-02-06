import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AllCharacters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [hidePic, setHidePic] = useState(false);

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

  function showCharInfo() {
    if (isHidden === true) {
      setIsHidden(false);
      setHidePic(true);
    } else {
      setIsHidden(true);
      setHidePic(false);
    }
  };

  let content;
  if (allCharacters.length > 0) {
    content = allCharacters.map(function(character, index) {
      let wand = character.wand;
      
      return (
        <div key={index} className='characters' onClick={showCharInfo}>
          {hidePic && 
          <div>
            <h3 className='charName'>{character.name}</h3>
            <img src={character.image} 
                alt={character.name}
                id='char-pic'
            />
          </div>
          }
          {isHidden && 
          <div>
            <p className='actor'>Played by {character.actor}</p>
            <div style={{display: wand.wood ? 'block' : 'none'}}>
              <h4>Wand Information</h4>
              <p>Material: {wand.wood}</p>
              <p>Core: {wand.core}</p>
              <p>Length: {wand.length} inches</p>
            </div>
          </div>}
        </div>
      )
    })
  } else {
    content = <h1>There Are No Characters!</h1>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default AllCharacters;