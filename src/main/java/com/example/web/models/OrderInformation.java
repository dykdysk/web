package com.example.web.models;

import java.util.List;

public class OrderInformation {
    private List<DonutDTO> donuts;
    private List<BoxDTO> boxes;

    public OrderInformation(){}

    public OrderInformation(List<DonutDTO> donuts, List<BoxDTO> boxes) {
        this.donuts = donuts;
        this.boxes = boxes;
    }

    public List<DonutDTO> getDonuts() {
        return donuts;
    }

    public List<BoxDTO> getBoxes() {
        return boxes;
    }
}
