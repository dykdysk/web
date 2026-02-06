package com.example.web.repositories.postgres;

import com.example.web.models.Donut;
import com.example.web.models.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> { }
