<?php
use MongoDB\BSON\ObjectId;
class OrderController {
    private $orderService;
    private $emailService;

    public function __construct(OrderService $orderService) {
        $this->orderService = $orderService;
        $this->emailService = new EmailService();
    }

    public function createOrder() {
        try {
            $inputJSON = file_get_contents('php://input');
            $data = json_decode($inputJSON, true);
            $order = new Order();
            //PERSON INFORMATION
            $personInfo = new PersonInformation();
            $personData = $data['personInformation'];
            $personInfo->name = $personData['name'];
            $personInfo->phone = $personData['phone'];
            $personInfo->email = $personData['email'];
            $personInfo->delivery_method = $personData['delivery_method'];
            $personInfo->delivery_address = $personData['delivery_address'];
            $personInfo->payment_method = $personData['payment_method'];
            $personInfo->comment = $personData['comment'];
            $order->personInformation = $personInfo;
            //ORDER INFORMATION
            $orderInfo = new OrderInformation();
            $orderData = $data['orderInformation'];
            $orderInfo->donuts = [];
            foreach ($orderData['donuts'] ?? [] as $donutData) {
                $donut = new DonutDTO();
                $donut->id = $donutData['id'];
                $donut->name = $donutData['name'];
                $donut->price = $donutData['price'];
                $donut->image = $donutData['image'];
                $donut->quantity = $donutData['quantity'];
                $orderInfo->donuts[] = $donut;
            }
            $orderInfo->boxes = [];
            foreach ($orderData['boxes'] ?? [] as $boxData) {
                $box = new BoxDTO();
                $box->id = $boxData['id'];
                $box->title = $boxData['title'];
                $box->price = $boxData['price'];
                $box->image = $boxData['image'];
                $box->quantity = $boxData['quantity'];
                $box->flowers = $boxData['flowers'];
                $box->card = $boxData['card'];
                $box->donuts = [];
                foreach ($boxData['donuts'] as $boxDonutData) {
                    $boxDonut = new DonutDTO();
                    $boxDonut->id = $boxDonutData['id'];
                    $boxDonut->name = $boxDonutData['name'];
                    $boxDonut->price = $boxDonutData['price'];
                    $boxDonut->image = $boxDonutData['image'];
                    $boxDonut->quantity = $boxDonutData['quantity'];
                    $box->donuts[] = $boxDonut;
                }
                $orderInfo->boxes[] = $box;
            }
            $order->orderInformation = $orderInfo;
            //ORDER CREATE SERVICE
            $result = $this->orderService->createOrder($order);
            $this->emailService->send($order);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Order created successfully.'
            ], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}