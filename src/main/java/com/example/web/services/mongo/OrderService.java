package com.example.web.services.mongo;

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
    public void save(Order order){
        orderRepository.save(order);
    }
}
