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
    @Column(name = "is_new")
    private Boolean is_new;

    public Donut(){}

    public Donut(int id, String name, String description, Float price, String image, List<String> categories, Boolean is_new) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.categories = categories;
        this.is_new = is_new;
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

    public Boolean getIsNew() {
        return is_new;
    }
}
