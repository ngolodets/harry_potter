import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AllCharacters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [hidePic, setHidePic] = useState(true);

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
      setHidePic(true);
      setIsHidden(false);
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
        <div key={index} 
              className='characters' 
              onClick={showCharInfo}
              style={{width:  isHidden ? '50%' : '120px',
                      height: isHidden ? '90%' : '150px',
                      border: isHidden ? '4px solid silver' : '1px solid silver',
                      borderStyle: isHidden ? 'outset' : 'groove'
                    }}
        >
          {hidePic && 
          <div>
            <h3 className='charName'>{character.name}</h3>
            <img src={character.image} 
                alt={character.name}
                className='char-pic'
            />
          </div>
          }
          {isHidden && 
          <div className='description'>
            <img src={character.image} 
                alt={character.name}
                id='charPic1'
                style={{filter: character.alive ? 'grayscale(0%)' : 'grayscale(100%)'}}
            />
            <h3>{character.name}</h3>
            <p className='actor'>(Played by {character.actor})</p>
            <p>{character.ancestry}</p>
            <p style={{display: character.house ? 'block' : 'none'}}
            >
              <span>House:</span> {character.house}</p>
            <p style={{display: character.dateOfBirth ? 'block' : 'none'}}
            >
              <span>Born:</span> {character.dateOfBirth}</p>
            <p style={{display: character.eyeColour ? 'block' : 'none'}}
            >
              <span>Eye Color:</span> {character.eyeColour}</p>
            <p><span>Hair Color:</span> {character.hairColour}</p>
            <p style={{display: character.patronus ? 'block' : 'none'}}
            >
              <span>Patronus:</span> {character.patronus}</p>
            <div style={{display: wand.wood ? 'block' : 'none'}}>
              <p><span>Wand Material:</span> {wand.wood}</p>
              <p style={{display: wand.core ? 'block' : 'none'}}
              >
                <span>Wand Core:</span> {wand.core}</p>
              <p><span>Wand Length:</span> {wand.length} inches</p>
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
      <h1 className='title'>Harry Potter Characters:</h1>
      {content}
    </div>
  )
}

export default AllCharacters;