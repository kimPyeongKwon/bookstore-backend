
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ author: '', quantity: 0, title: '' });

  // 기존 도서 정보 불러오기
  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleQuantityAdjust = delta => {
    setBook(prev => ({
      ...prev,
      quantity: Math.max(0, parseInt(prev.quantity || 0) + delta)
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/books/${id}`, book)
      .then(() => {
        alert('도서 정보가 수정되었습니다.');
        navigate('/'); // 목록 페이지로 이동
      })
      .catch(err => {
        console.error(err);
        alert('수정 실패');
      });
  };

  return (
    <div className="container mt-3">
      <h2>도서 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>저자</label>
          <input
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label>재고</label>
          <div className="input-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityAdjust(-1)}
              disabled={book.quantity <= 0}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
              name="quantity"
              value={book.quantity}
              onChange={handleChange}
              required
              min="0"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityAdjust(1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-2">
          <label>제목</label>
          <input
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">저장</button>
      </form>
    </div>
  );
};

export default EditBook;

