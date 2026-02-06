package com.example.web.controllers.postgres;

import com.example.web.models.Box;
import com.example.web.services.postgres.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/web/php/router.php/boxes")
public class BoxController {
    private final BoxService boxService;
    @Autowired
    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }
    @GetMapping("")
    public List<Box> findAll(){
        return boxService.findAll();
    }
    @GetMapping("/id/{id}")
    public Optional<Box> findById(@PathVariable Integer id){
        return boxService.findById(id);
    }
    @GetMapping("/title/{title}")
    public List<Box> findByTitle(@PathVariable String title){
        return boxService.findByTitle(title);
    }
    @GetMapping("/quantity/{quantity}")
    public List<Box> findByQuantity(@PathVariable Integer quantity){
        return boxService.findByQuantity(quantity);
    }
    @GetMapping("/price/{price}")
    public List<Box> findByPrice(@PathVariable Float price){
        return boxService.findByPrice(price);
    }
}
