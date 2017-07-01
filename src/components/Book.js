import React from 'react';
import './Book.css';

const Book = (props) => (
  <div className='box'>
    <div className='has-text-centered image-container'>
      <img src={props.book.imageLinks.thumbnail} alt={props.book.title} />
    </div>
    <hr />
    <p>
      <strong>{props.book.title}</strong>
    </p>
    <p>{props.book.authors ? props.book.authors[0] : 'No author specified'}</p>
    <br />
    <div className="field">
      <label className="label">Move to</label>
      <p className="control">
        <span className="select">
          <select onChange={(event) => props.moveBook(event, props.book)}>
            <option>Select from list</option>
            <option value='currentlyReading' disabled={props.type === 'currentlyReading'}>Currently reading</option>
            <option value='wantToRead' disabled={props.type === 'wantToRead'}>Want to read</option>
            <option value='read' disabled={props.type === 'read'}>Read</option>
          </select>
        </span>
      </p>
    </div>
  </div>
)

export default Book;
