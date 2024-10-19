import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

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

  return (
    
      
      <Container className="wishlist-container text-center mt-5">
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <Row>
            {wishlist.map((book) => (
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
                    <div onClick={() => toggleWishlist(book)} className="wishlist-icon">
                      <FaHeart color="red" size={25} />
                    </div>
                  </Card.Body>
                  <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                    <Button className='btn btn-info btn-primary'>Details</Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    
  );
};

export default Wishlist;
