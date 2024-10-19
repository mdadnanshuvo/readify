import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BooksContext } from '../App';

const BookDetails = () => {
  const { id } = useParams();
  const { booksData } = useContext(BooksContext);
  const [book, setBook] = useState(null);

  useEffect(() => {
    let foundBook = booksData.find((book) => book.id.toString() === id);
    
    if (!foundBook) {
      const allCachedBooks = Object.keys(localStorage)
        .filter((key) => key.startsWith('booksData_page_'))
        .flatMap((key) => JSON.parse(localStorage.getItem(key)));

      foundBook = allCachedBooks.find((book) => book.id.toString() === id);
    }

    if (foundBook) {
      setBook(foundBook);
    }
  }, [id, booksData]);

  if (!book) {
    return <p>Book not found!</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author(s): </strong>{book.authors.map(author => author.name).join(', ')}</p>
      <p><strong>Book ID: </strong>{book.id}</p>
      <p><strong>Subjects: </strong>{book.subjects.join(', ')}</p>
      <img src={book['formats']['image/jpeg']} alt="Book cover" />
    </div>
  );
};

export default BookDetails;
