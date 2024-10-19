import './App.css';
import Books from './components/books';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './components/book-details';
import { createContext, useState } from 'react';
import Wishlist from './components/wishlist';


export const BooksContext = createContext();

function App() {
  const [booksData, setBooksData] = useState([]);

  return (
    <div className="App">
      <BooksContext.Provider value={{ booksData, setBooksData }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/book/wishlist/" element= {<Wishlist/>}/>
            
          </Routes>
        </Router>
      </BooksContext.Provider>
    </div>
  );
}

export default App;
