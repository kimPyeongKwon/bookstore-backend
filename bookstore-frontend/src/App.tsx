
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';  // 👈 이 줄 추가
import EditBook from './components/EditBook'; // 추가

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <h1>온라인 서점</h1>
        <nav>
          <Link to="/" className="btn btn-link">도서 목록</Link>
          <Link to="/add" className="btn btn-link">도서 추가</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetail />} />  {/* ✅ 상세 페이지 */}
          <Route path="/edit/:id" element={<EditBook />} /> {/* ✅ 수정 페이지 라우트 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

