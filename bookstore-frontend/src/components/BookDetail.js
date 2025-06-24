
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();  // ✅ 추가

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      api.delete(`/books/${book.id}`)
        .then(() => {
          alert('도서가 삭제되었습니다.');
          navigate('/');
        })
        .catch(err => {
          console.error(err);
          alert('삭제 실패');
        });
    }
  };

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <div className="container mt-3">로딩 중...</div>;

  return (
    <div className="container mt-3">
      <h2>도서 상세 정보</h2>
      <table className="table table-bordered">
        <tbody>
          <tr><th>ID</th><td>{book.id}</td></tr>
          <tr><th>제목</th><td>{book.title}</td></tr>
          <tr><th>저자</th><td>{book.author}</td></tr>
          <tr><th>재고</th><td>{book.quantity}</td></tr>
        </tbody>
      </table>

      <Link to="/" className="btn btn-secondary me-2">목록으로</Link>
      <Link to={`/edit/${book.id}`} className="btn btn-primary">수정하기</Link>
      <button className="btn btn-danger me-2" onClick={handleDelete}>삭제하기</button>
    </div>

  );
};

export default BookDetail;

