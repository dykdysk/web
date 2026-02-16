package com.example.web.controllers.postgres;

import com.example.web.models.Promotion;
import com.example.web.services.postgres.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/promotions")
public class PromotionController {
    private final PromotionService promotionService;
    @Autowired
    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }
    @GetMapping("")
    public List<Promotion> findAll(){
        return promotionService.findAll();
    }
    @GetMapping("/id/{id}")
    public Optional<Promotion> findById(@PathVariable Integer id){
        return promotionService.findById(id);
    }
}
