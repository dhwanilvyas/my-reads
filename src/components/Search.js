import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as Api from '../BookAPI';

class Search extends Component {

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.moveBook = this.moveBook.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);

  }

  state = {
    query: '',
    loading: false,
    bookAdded: false,
    books: []
  };

  onSearch(event) {
    if (event.target.value && event.target.value.length > 3) {
      this.setState({
        loading: true
      });

      Api.search(event.target.value, 10)
      .then(response => {
        this.setState({
          loading: false,
          books: response
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
    } else {
      this.setState({
        books: []
      });
    }
  }

  moveBook(event, book) {
    Api.update(book, event.target.value)
      .then(response => {
        this.setState({
          bookAdded: true
        });

        setTimeout(() => {
          this.toggleNotification();
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSearchResults() {
    if (this.state.loading) {
      return (<h1 className='has-text-centered'>Loading...</h1>)
    }

    if (this.state.books && !this.state.books.length) {
      return (<h1 className='has-text-centered'>No results</h1>)
    }

    let books = this.state.books.map(book => {
      return (
        <div className='column is-4' key={book.id}>
          <Book book={book} moveBook={this.moveBook} />
        </div>
      );
    });

    return books;
  }

  showNotification() {
    if (this.state.bookAdded) {
      return (
        <div className='columns'>
          <div className='column'>
            <div className="notification is-primary">
              <button className="delete" onClick={this.toggleNotification}></button>
              Book added to your shelf!
            </div>
          </div>
        </div>
      )
    }

    return null;
  }

  toggleNotification() {
    this.setState({
      bookAdded: false
    });
  }

  render() {

    return (
      <div>
        <nav className="nav navbar">
          <div className="nav-left">
            <Link to='/' className="nav-item">
              <i className='fa fa-arrow-left'></i>
            </Link>
          </div>
        </nav>
        <div className='container'>
          {this.showNotification()}
          <h1 className='title has-text-centered'>Search for books</h1>
          <span>Please write a minimum of 3 letters to get relevant results</span>
          <br />
          <div className="field">
            <label className="label">Your query goes here</label>
            <p className="control">
              <input className="input" type="text" placeholder="Harry potter" onChange={this.onSearch} />
            </p>
          </div>
          <div className='columns is-multiline'>
            {this.getSearchResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
