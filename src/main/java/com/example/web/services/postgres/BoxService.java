package com.example.web.services.postgres;

import com.example.web.models.Box;
import com.example.web.repositories.postgres.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoxService {
    private final BoxRepository boxRepository;
    @Autowired
    public BoxService(BoxRepository boxRepository){
        this.boxRepository = boxRepository;
    }
    public List<Box> findAll(){
        return boxRepository.findAll();
    }
    public Optional<Box> findById(Integer id){
        return boxRepository.findById(id);
    }
    public List<Box> findByTitle(String title){
        return boxRepository.findByTitle(title);
    }
    public List<Box> findByQuantity(Integer quantity){
        return boxRepository.findByQuantity(quantity);
    }
    public List<Box> findByPrice(Float price){
        return boxRepository.findByPrice(price);
    }
}
