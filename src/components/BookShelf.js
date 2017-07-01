import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as Api from '../BookAPI';
import './BookShelf.css';

class BookShelf extends Component {
  state = {
    loading: true,
    books: []
  };

  constructor(props) {
    super(props);

    this.moveBook = this.moveBook.bind(this);
    this.filterData = this.filterData.bind(this);
    this._getData = this._getData.bind(this);
  }

  _getData() {
    Api.getAll()
      .then(response => {
        this.setState({
          books: response,
          loading: false
        });
      });
  }

  componentDidMount() {
    this._getData();
  }

  moveBook(event, book) {
    Api.update(book, event.target.value)
      .then((response) => {
        this._getData();
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterData(book, type, moveBook) {
    if (book.shelf === type) {
      return (
        <div className='column is-4' key={book.id}>
          <Book
            book={book}
            type={type}
            moveBook={moveBook}
          />
        </div>
      )
    }

    return null;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='container'>
          <h1 className="has-text-centered title is-1">Loading shelf...</h1>
        </div>
      )
    }

    let books = this.state.books;
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="nav-center">
            <Link to='/' className="nav-item">
              My reads
            </Link>
          </div>
          <div className="nav-right">
            <Link to='/search' className="nav-item">
              <i className='fa fa-search'></i>
            </Link>
          </div>
        </nav>
        <div className='container'>
          <h4 className="title is-4">Currently reading</h4>
          <hr/>
          <div className="columns is-multiline">
            {books.map(book => {
              return this.filterData(book, 'currentlyReading', this.moveBook)
            })}
          </div>
          <br/>
          <h4 className="title is-4">Want to read</h4>
          <hr/>
          <div className="columns is-multiline">
            {books.map(book => {
              return this.filterData(book, 'wantToRead', this.moveBook)
            })}
          </div>

          <h4 className="title is-4">Read</h4>
          <hr/>
          <div className="columns is-multiline">
            {books.map(book => {
              return this.filterData(book, 'read', this.moveBook)
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf;
