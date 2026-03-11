package com.example.web.services.mongo;

import com.example.web.models.EmailNotification;
import com.example.web.models.Order;
import com.example.web.repositories.mongo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    @Autowired
    public  OrderService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }
    public Order save(Order order){
        Order savedOrder = orderRepository.save(order);
        if(savedOrder.getId() != null){
            EmailNotification emailNotification = new EmailNotification();
            emailNotification.setPersonInformation(order.getPersonInformation());
            emailNotification.setOrderInformation(order.getOrderInformation());
            emailNotification.send("Успешное бронирование");
            return savedOrder;
        } else {
            return savedOrder;
        }
    }
}
