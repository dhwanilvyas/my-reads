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
  }

  state = {
    query: '',
    loading: false,
    books: []
  };

  onSearch(event) {

    this.setState({
      loading: true
    });

    Api.search(event.target.value, 10)
      .then(response => {
        console.log(response);
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
  }

  moveBook(event, book) {
    Api.update(book, event.target.value)
      .then(response => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSearchResults() {
    if (this.state.loading) {
      return (<h1 className='has-text-centered'>Loading...</h1>)
    }

    if (!this.state.books.length) {
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
          <h1 className='title has-text-centered'>Search for books</h1>
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
