import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Row, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BooksContext } from '../App';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Books = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [searchedBook, setSearchedBook] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const { booksData, setBooksData } = useContext(BooksContext);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    fetchBooksData(pageNum, selectedTopic);
  }, [pageNum, selectedTopic]);

  const fetchBooksData = async (page, topic) => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://gutendex.com/books/?page=${page}`;
      if (topic) {
        url += `&topic=${topic}`;
      }

      const localStorageKey = `booksData_page_${page}_topic_${topic || ''}`;
      const cachedData = JSON.parse(localStorage.getItem(localStorageKey));

      if (cachedData) {
        setBooksData(cachedData);
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Cannot fetch the data');
      }
      const data = await response.json();
      setBooksData(data.results);
      localStorage.setItem(localStorageKey, JSON.stringify(data.results));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchBook = async () => {
    if (!searchedBook.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://gutendex.com/books/?search=${searchedBook}`);
      if (!response.ok) {
        throw new Error('Cannot fetch the data');
      }
      const data = await response.json();
      setBooksData(data.results);
      localStorage.setItem(`search_${searchedBook}`, JSON.stringify(data.results));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const toggleWishlist = (book) => {
    let updatedWishlist;
    if (wishlist.some((wishItem) => wishItem.id === book.id)) {
      updatedWishlist = wishlist.filter((wishItem) => wishItem.id !== book.id);
    } else {
      updatedWishlist = [...wishlist, book];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isWishlisted = (bookId) => {
    return wishlist.some((wishItem) => wishItem.id === bookId);
  };

  return (
    <Container className="books-container text-center mt-5">
      <div className="search-options d-flex justify-content-center align-items-center mb-4">
        <input
          type="text"
          placeholder="Search for a book..."
          className="search-input mr-2"
          value={searchedBook}
          onChange={(e) => setSearchedBook(e.target.value)}
        />
        <Button variant="primary" onClick={searchBook} className="mr-2">
          Search
        </Button>
        <Form.Control
          as="select"
          value={selectedTopic}
          onChange={handleTopicChange}
          className="w-auto"
        >
          <option value="">Filter by Topic</option>
          <option value="children">Children</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
          <option value="science">Science</option>
        </Form.Control>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Row>
            {booksData.length === 0 ? (
              <Col>
                <h4 className="no-results-msg">No data found based on search or filter.</h4>
              </Col>
            ) : (
              booksData.map((book) => (
                <Col md={3} sm={6} xs={12} key={book.id} className="mb-4 d-flex justify-content-center rounded">
                  <Card className="book-card shadow custom-card" style={{ width: '18rem' }}>
                    <div className="book-img-container">
                      <Card.Img
                        variant="top"
                        src={book['formats']['image/jpeg']}
                        alt="Book cover"
                        className="book-img"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="book-title">{book.title}</Card.Title>
                      <Card.Text className="book-authors">
                        <strong>Author(s): </strong> {book.authors.map((author) => author.name).join(', ')}
                      </Card.Text>

                     
                      <Card.Text className="book-genre">
                        <strong>ID: {book.id} </strong> 
                      </Card.Text>

                      <div onClick={() => toggleWishlist(book)} className="wishlist-icon">
                        {isWishlisted(book.id) ? (
                          <FaHeart color="red" size={25} />
                        ) : (
                          <FaRegHeart color="gray" size={25} />
                        )}
                      </div>
                    </Card.Body>
                    <Link to={`book/${book.id}`} style={{ textDecoration: 'none' }}>
                      <Button className='btn btn-info btn-primary'>Details</Button>
                    </Link>
                  </Card>
                </Col>
              ))
            )}
          </Row>

          {!searchedBook && booksData.length > 0 && (
            <div className="pagination mt-4">
              <Button
                className="btn btn-lg btn-info mr-2"
                disabled={pageNum === 1}
                onClick={() => setPageNum((prevPage) => prevPage - 1)}
              >
                Prev
              </Button>
              <Button className="btn btn-lg btn-info" onClick={() => setPageNum((prevPage) => prevPage + 1)}>
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Books;
