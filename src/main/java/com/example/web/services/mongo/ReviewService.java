package com.example.web.services.mongo;

import com.example.web.models.Review;
import com.example.web.repositories.mongo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    @Autowired
    public  ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }
    public List<Review> findAll(){
        return reviewRepository.findAll();
    }
    public Optional<Review> findById(String id){
        return reviewRepository.findById(id);
    }
    public List<Review> findByRating(Integer rating){
        return reviewRepository.findByRating(rating);
    }
    public Review save(Review review){
        return reviewRepository.save(review);
    }
}
