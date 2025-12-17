<?php
class DonutController {
    private $donutService;

    public function __construct(DonutService $donutService) {
        $this->donutService = $donutService;
    }

    public function getAllDonuts() {
        try {
            $donuts = $this->donutService->getAllDonuts();

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getDonutById($id) {
        try {
            $donut = $this->donutService->getDonutById($id);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donut
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donut'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getDonutsByName($name) {
        try {
            $donuts = $this->donutService->getDonutsByName($name);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by name'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getDonutsByCategory($category) {
        try {
            $donuts = $this->donutService->getDonutsByCategory($category);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by category'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getDonutsByPrice($price) {
        try {
            $donuts = $this->donutService->getDonutsByPrice($price);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by price'
            ], JSON_UNESCAPED_UNICODE);
        }
    }
    public function getDonutsByIsNew($isNew) {
        try {
            $donuts = $this->donutService->getDonutsByIsNew($isNew);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by price'
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}