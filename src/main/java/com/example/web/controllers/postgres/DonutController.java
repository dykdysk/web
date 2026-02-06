package com.example.web.controllers.postgres;

import com.example.web.models.Donut;
import com.example.web.services.postgres.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/web/php/router.php/donuts")
public class DonutController {
    private final DonutService donutService;
    @Autowired
    public DonutController(DonutService donutService) {
        this.donutService = donutService;
    }
    @GetMapping("")
    public List<Donut> findAll(){
        return donutService.findAll();
    }
    @GetMapping("/id/{id}")
    public Optional<Donut> findById(@PathVariable Integer id){
        return donutService.findById(id);
    }
    @GetMapping("/name/{name}")
    public Optional<Donut> findByName(@PathVariable String name){
        return donutService.findByName(name);
    }
    @GetMapping("/category/{category}")
    public List<Donut> findByCategory(@PathVariable String category){
        return donutService.findByCategory(category);
    }
    @GetMapping("/price/{price}")
    public List<Donut> findByPrice(@PathVariable Float price){
        return donutService.findByPrice(price);
    }
    @GetMapping("/isNew/{isNew}")
    public List<Donut> findByIsNew(@PathVariable Boolean isNew){
        return donutService.findByIsNew(isNew);
    }
}
