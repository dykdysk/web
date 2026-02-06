package com.example.web.models;

public class PersonInformation {
    private final String name;
    private final String phone;
    private final String email;
    private final String delivery_method;
    private final String delivery_address;
    private final String payment_method;
    private final String comment;
    public PersonInformation(String name, String phone, String email, String delivery_method, String delivery_address, String payment_method, String comment) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.delivery_method = delivery_method;
        this.delivery_address = delivery_address;
        this.payment_method = payment_method;
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getDelivery_method() {
        return delivery_method;
    }

    public String getDelivery_address() {
        return delivery_address;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public String getComment() {
        return comment;
    }
}
