import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Route path='/' exact component={BookShelf} />
          <Route path='/search' exact component={Search} />
        </div>
      </div>
    );
  }
}

export default App;
