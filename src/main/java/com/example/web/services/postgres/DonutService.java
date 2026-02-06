package com.example.web.services.postgres;

import com.example.web.models.Donut;
import com.example.web.repositories.postgres.DonutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonutService {
    private final DonutRepository donutRepository;
    @Autowired
    public DonutService(DonutRepository donutRepository) {
        this.donutRepository = donutRepository;
    }
    public List<Donut> findAll(){
        return donutRepository.findAll();
    }
    public Optional<Donut> findById(Integer id){
        return donutRepository.findById(id);
    }
    public Optional<Donut> findByName(String name){
        return donutRepository.findByName(name);
    }
    public List<Donut> findByCategory(String category){
        return donutRepository.findByCategory(category);
    }
    public List<Donut> findByPrice(Float price){
        return donutRepository.findByPrice(price);
    }
    public List<Donut> findByIsNew(Boolean isNew){
        return donutRepository.findByIsNew(isNew);
    }
}
