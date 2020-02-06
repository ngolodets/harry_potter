import React, {useState} from 'react';
import Students from './Students';
import Staff from './Staff';
import AllCharacters from './AllCharacters';
import SearchForm from './SearchForm';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  function changeColor() {
    if (isClicked === true) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
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
              onClick={changeColor}
        >
          <Link to='/'
                style={{textDecoration: 'none',
                        color: isClicked ? '#7f0909' : '#ffc500',
                        backgroundColor: !isClicked ? '#7f0909' : '#ffc500',
                        padding: '2em'
                }}
                
          >
            Home
          </Link>
          <Link to='/students'
                style={{textDecoration: 'none',
                color: isClicked ? '#0d6217' : '#aaaaaa',
                backgroundColor: !isClicked ? '#0d6217' : '#aaaaaa',
                padding: '2em'
                }}
          >
            Students
          </Link>
          <Link to='/staff'
                style={{textDecoration: 'none',
                color: isClicked ? '#eee117' : 'black',
                backgroundColor: !isClicked ? '#eee117' : 'black',
                padding: '2em'
                }}
          >
            Staff
          </Link>
          <Link to='/searchForm'
                style={{textDecoration: 'none',
                color: isClicked ? '#000a90' : '#946b2d',
                backgroundColor: !isClicked ? '#000a90' : '#946b2d',
                padding: '2em'
                }}
          >
            Search Houses
          </Link>
        </nav>
        
        <Switch>
          <Route exact path='/' component={AllCharacters} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/staff' component={Staff} />
          <Route path='/searchForm' component={SearchForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
