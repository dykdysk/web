package com.example.web.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@Document(collection = "order")
public class Order {
    @Id
    private String id;
    private OrderInformation orderInformation;
    private PersonInformation personInformation;

    public Order(){}

    public Order(String id, OrderInformation orderInformation, PersonInformation personInformation) {
        this.id = id;
        this.orderInformation = orderInformation;
        this.personInformation = personInformation;
    }

    public String getId() {
        return id;
    }

    public OrderInformation getOrderInformation() {
        return orderInformation;
    }

    public PersonInformation getPersonInformation() {
        return personInformation;
    }
}
