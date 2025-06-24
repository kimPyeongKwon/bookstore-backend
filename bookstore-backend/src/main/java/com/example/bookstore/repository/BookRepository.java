
package com.example.bookstore.repository;

import com.example.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    // 제목 또는 저자에 검색어가 포함되는 도서를 페이징 처리하여 반환
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
        String titleKeyword, String authorKeyword, Pageable pageable
    );
}

