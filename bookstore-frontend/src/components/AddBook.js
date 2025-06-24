
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ 추가
import api from '../api';

const AddBook = () => {
  const [book, setBook] = useState({ author: '', quantity: '', title: '' });
  const navigate = useNavigate();  // ✅ 추가

  const handleChange = e => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/books', book)
      .then(() => {
        alert('도서가 추가되었습니다.');  // ✅ 알람
        setBook({ author: '', quantity: '', title: '' });  // 초기화
        navigate('/');  // ✅ 목록 페이지로 이동
      })
      .catch(err => {
        console.error(err);
        alert('도서 등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="container mt-3">
      <h2>도서 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>저자</label>
          <input className="form-control" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>재고</label>
          <input className="form-control" name="quantity" value={book.quantity} onChange={handleChange} required type="number" />
        </div>
        <div className="mb-2">
          <label>제목</label>
          <input className="form-control" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">추가</button>
      </form>
    </div>
  );
};

export default AddBook;

