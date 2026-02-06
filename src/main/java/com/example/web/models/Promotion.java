package com.example.web.models;

import jakarta.persistence.*;

@Entity
@Table(name = "promotion")
public class Promotion {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "description")
    private String description;
    @Column(name = "image")
    private String image;

    public Promotion(){}

    public Promotion(int id, String description, String image) {
        this.id = id;
        this.description = description;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }
}
