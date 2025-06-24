
import React, { useEffect, useState, FormEvent } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

// 도서 한 건 타입 정의 (필요한 필드만)
interface Book {
  id: number;
  author: string;
  quantity: number;
  title: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    api.get('/books', {
      params: {
        search: search.trim(),
        page,
        size: 10,
      },
    })
    .then(res => {
      setBooks(res.data.content);
      setTotalPages(res.data.totalPages);
    })
    .catch(err => console.error(err));
  }, [page, search]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearch(searchInput);
  };

  return (
    <div className="container mt-3">
      <h2>도서 목록</h2>

      <form onSubmit={handleSearch} className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="제목 또는 저자 검색"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">검색</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>저자</th>
            <th>재고</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>
                  <Link to={`/books/${book.id}`}>
                    {book.title}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={4}>도서가 없습니다.</td></tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(prev => prev - 1)}
        >
          이전
        </button>
        <span className="align-self-center">
          {page + 1} / {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default BookList;

