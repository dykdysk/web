package com.example.web.models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "review")
public class Review {
    @Id
    private String id;
    private String name;
    private Integer rating;
    private String text;
    private String date;

    public Review(){}

    public Review(String id, String name, String description, int rating, String text, String date) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.text = text;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getRating() {
        return rating;
    }

    public String getText() {
        return text;
    }

    public String getDate() {
        return date;
    }
}
