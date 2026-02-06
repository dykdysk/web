package com.example.web.services.postgres;

import com.example.web.models.Promotion;
import com.example.web.repositories.postgres.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {
    private final PromotionRepository promotionRepository;
    @Autowired
    public PromotionService(PromotionRepository promotionRepository){
        this.promotionRepository = promotionRepository;
    }
    public List<Promotion> findAll(){
        return promotionRepository.findAll();
    }
    public Optional<Promotion> findById(Integer id){
        return promotionRepository.findById(id);
    }
}
