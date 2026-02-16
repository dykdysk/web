package com.example.web.models;

import java.util.List;

public class BoxDTO {
    private String id;
    private String title;
    private Float price;
    private String image;
    private Integer quantity;
    private String flowers;
    private String card;
    private List<DonutDTO> donuts;

    public BoxDTO() {}

    public BoxDTO(String id, String title, Float price, String image, Integer quantity, String flowers, String card, List<DonutDTO> donuts) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.flowers = flowers;
        this.card = card;
        this.donuts = donuts;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
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

    public String getFlowers() {
        return flowers;
    }

    public String getCard() {
        return card;
    }

    public List<DonutDTO> getDonuts() {
        return donuts;
    }
}
