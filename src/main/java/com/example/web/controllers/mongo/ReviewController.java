package com.example.web.controllers.mongo;

import com.example.web.models.Review;
import com.example.web.services.mongo.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }
    @GetMapping("")
    public List<Review> findAll(){
        return reviewService.findAll();
    }
    public Optional<Review> findById(@PathVariable String id){
        return reviewService.findById(id);
    }
    @GetMapping("/rating/{rating}")
    public List<Review> findByRating(@PathVariable Integer rating){
        return reviewService.findByRating(rating);
    }
    @PostMapping("")
    public Review save(@RequestBody Review review){
        return reviewService.save(review);
    }
}
