package com.example.web.models;

import java.util.List;

public class OrderInformation {
    private final List<Donut> donuts;
    private final List<Box> boxes;
    public OrderInformation(List<Donut> donuts, List<Box> boxes) {
        this.donuts = donuts;
        this.boxes = boxes;
    }

    public List<Donut> getDonuts() {
        return donuts;
    }

    public List<Box> getBoxes() {
        return boxes;
    }
}
