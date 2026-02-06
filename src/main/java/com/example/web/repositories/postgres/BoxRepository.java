package com.example.web.repositories.postgres;

import com.example.web.models.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoxRepository extends JpaRepository<Box, Integer> {
    @Query("SELECT b FROM Box b WHERE LOWER(b.title)=LOWER(:title)")
    List<Box> findByTitle(String title);
    @Query("SELECT b FROM Box b WHERE b.quantity=:quantity")
    List<Box> findByQuantity(Integer quantity);
    @Query("SELECT b FROM Box b WHERE b.price=:price")
    List<Box> findByPrice(Float price);
}
