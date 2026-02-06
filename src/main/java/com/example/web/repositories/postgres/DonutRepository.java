package com.example.web.repositories.postgres;

import com.example.web.models.Donut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonutRepository extends JpaRepository<Donut, Integer> {
    @Query("SELECT d FROM Donut d WHERE LOWER(d.name)=LOWER(:name)")
    Optional<Donut> findByName(String name);
    @Query(value = "SELECT d FROM Donut d WHERE ANY(d.categories)=:category", nativeQuery = true)
    List<Donut> findByCategory(String category);
    @Query("SELECT d FROM Donut d WHERE d.price=:price")
    List<Donut> findByPrice(Float price);
    @Query("SELECT d FROM Donut d WHERE d.isNew=:isNew")
    List<Donut> findByIsNew(Boolean isNew);
}
