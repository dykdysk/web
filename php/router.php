<?php
require __DIR__ . '/vendor/autoload.php';
require_once 'controllers/donutController.php';
require_once 'services/donutService.php';
require_once 'repositories/donutRepository.php';
require_once 'models/donut.php';
require_once 'controllers/promotionController.php';
require_once 'services/promotionService.php';
require_once 'repositories/promotionRepository.php';
require_once 'models/promotion.php';
require_once 'controllers/boxController.php';
require_once 'services/boxService.php';
require_once 'repositories/boxRepository.php';
require_once 'models/box.php';
require_once 'controllers/reviewController.php';
require_once 'services/reviewService.php';
require_once 'repositories/reviewRepository.php';
require_once 'models/review.php';
require_once 'controllers/orderController.php';
require_once 'services/orderService.php';
require_once 'services/emailService.php';
require_once 'repositories/orderRepository.php';
require_once 'models/order.php';
require_once 'models/orderInformation.php';
require_once 'models/personInformation.php';
require_once 'models/donutDTO.php';
require_once 'models/boxDTO.php';
require_once 'database/postgreSQLDatabase.php';
require_once 'database/mongoDatabase.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$pg_database = new PostgreSQL();
$pg_db = $pg_database->getConnection();

$mongo_database = new MongoDB();
$mongo_db = $mongo_database->getConnection();

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

$paths = explode('/', $requestUri);
array_shift($paths);
array_shift($paths);
array_shift($paths);
$entity = $paths[0] ?? '';
$param1 = $paths[1] ?? '';
$param2 = $paths[2] ?? '';

switch($entity) {
    case 'donuts':
        $repository = new DonutRepository($pg_db);
        $service = new DonutService($repository);
        $controller = new DonutController($service);
        break;

    case 'promotions':
        $repository = new PromotionRepository($pg_db);
        $service = new PromotionService($repository);
        $controller = new PromotionController($service);
        break;

    case 'boxes':
        $repository = new BoxRepository($pg_db);
        $service = new BoxService($repository);
        $controller = new BoxController($service);
        break;

    case 'reviews':
        $repository = new ReviewRepository($mongo_db);
        $service = new ReviewService($repository);
        $controller = new ReviewController($service);
        break;

    case 'orders':
        $repository = new OrderRepository($mongo_db);
        $service = new OrderService($repository);
        $controller = new OrderController($service);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Entity not found']);
        exit;
}

switch($requestMethod) {
    case 'GET':
        handleGetRequest($entity, $controller, $param1, $param2);
        break;

    case 'POST':
        handlePostRequest($entity, $controller);
        break;
}

function handleGetRequest($entity, $controller, $param1, $param2) {
    switch($entity) {
        case 'donuts':
            if (empty($param1)) {
                $controller->getAllDonuts();
            } else if ($param1 === 'id' && $param2) {
                $controller->getDonutById($param2);
            } else if ($param1 === 'name' && $param2) {
                $controller->getDonutsByName($param2);
            } else if ($param1 === 'category' && $param2) {
                $controller->getDonutsByCategory($param2);
            } else if ($param1 === 'price' && $param2) {
                $controller->getDonutsByPrice($param2);
            } else if ($param1 === 'isnew' && $param2) {
                $isNew = ($param2 === 'true');
                $controller->getDonutsByIsNew($isNew);
            }
            break;

        case 'promotions':
            if (empty($param1)) {
                $controller->getAllPromotions();
            } else if ($param1 === 'id' && $param2) {
                $controller->getPromotionById($param2);
            }
            break;

        case 'boxes':
            if (empty($param1)) {
                $controller->getAllBoxes();
            } else if ($param1 === 'id' && $param2) {
                $controller->getBoxById($param2);
            } else if ($param1 === 'title' && $param2) {
                $controller->getBoxesByTitle($param2);
            } else if ($param1 === 'quantity' && $param2) {
                $controller->getBoxesByQuantity($param2);
            } else if ($param1 === 'price' && $param2) {
                $controller->getBoxesByPrice($param2);
            }
            break;

        case 'reviews':
            if (empty($param1)) {
                $controller->getAllReviews();
            } else if ($param1 === 'name' && $param2) {
                $controller->getReviewsByName($param2);
            } else if ($param1 === 'rating' && $param2) {
                $controller->getReviewsByRating($param2);
            } else if ($param1 === 'date' && $param2) {
                $controller->getReviewsByDate($param2);
            }
            break;
    }
}

function handlePostRequest($entity, $controller) {
    switch($entity) {
        case 'reviews':
            $controller->createReview();
            break;

        case 'orders':
            $controller->createOrder();
            break;
    }
}