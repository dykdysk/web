package com.example.web.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "donut")
public class Donut {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private Float price;
    @Column(name = "image")
    private String image;
    @Column(name = "categories")
    private List<String> categories;
    @Column(name = "isNew")
    private Boolean isNew;

    public Donut(){}

    public Donut(int id, String name, String description, float price, String image, List<String> categories, boolean isNew) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.categories = categories;
        this.isNew = isNew;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public float getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public List<String> getCategories() {
        return categories;
    }

    public boolean isNew() {
        return isNew;
    }
}
