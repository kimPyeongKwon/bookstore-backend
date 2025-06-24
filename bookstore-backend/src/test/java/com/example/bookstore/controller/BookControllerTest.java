
package com.example.bookstore.controller;

import com.example.bookstore.entity.Book;
import com.example.bookstore.repository.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateBook() throws Exception {
        // given
        Book book = new Book();
        book.setTitle("JUnit 책");
        book.setAuthor("김테스터");
        book.setQuantity(7);

        // when
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk());

        // then
        Book saved = bookRepository.findAll()
                .stream()
                .filter(b -> "JUnit 책".equals(b.getTitle()))
                .findFirst()
                .orElse(null);

        assertThat(saved).isNotNull();
        assertThat(saved.getAuthor()).isEqualTo("김테스터");
        assertThat(saved.getQuantity()).isEqualTo(7);
    }
}

