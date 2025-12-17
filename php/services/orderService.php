<?php
use MongoDB\BSON\ObjectId;
class OrderService {
    private $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function createOrder(Order $order): ObjectId {
        return $this->orderRepository->save($order);
    }
}