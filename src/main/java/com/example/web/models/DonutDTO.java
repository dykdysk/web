package com.example.web.models;

import java.util.List;

public class DonutDTO {
    private String id;
    private String name;
    private Float price;
    private String image;
    private Integer quantity;

    public DonutDTO() {}

    public DonutDTO(String id, String name, Float price, String image, Integer quantity, String flowers, String card, List<DonutDTO> donuts) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Float getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public Integer getQuantity() {
        return quantity;
    }
}
