import React from 'react';
import Students from './Students';
import Staff from './Staff';
import AllCharacters from './AllCharacters';
import SearchForm from './SearchForm';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

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
          <Link to='/searchForm'
                style={{textDecoration: 'none',
                color: 'white',
                padding: '2em'
                }}
          >
            Search Houses
          </Link>
          
          {/* <form onSubmit={handleSubmit}
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
          </form> */}
        </nav>
        
        <Switch>
          <Route exact path='/' component={AllCharacters} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/staff' component={Staff} />
          <Route path='/searchForm' component={SearchForm} />
        </Switch>
        
        {/* <div>
          {content}
        </div> */}
      </div>
    </Router>
  );
}

export default App;
