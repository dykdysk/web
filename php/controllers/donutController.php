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
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts'
            ]);
        }
    }

    public function getDonutById($id) {
        try {
            $donut = $this->donutService->getDonutById($id);

            if (!$donut) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'error' => 'Donut not found'
                ]);
                return;
            }

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donut
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donut'
            ]);
        }
    }

    public function getDonutsByName($name) {
        try {
            $donuts = $this->donutService->getDonutsByName($name);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by name'
            ]);
        }
    }

    public function getDonutsByCategory($category) {
        try {
            $donuts = $this->donutService->getDonutsByCategory($category);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by category'
            ]);
        }
    }

    public function getDonutsByPrice($price) {
        try {
            $donuts = $this->donutService->getDonutsByPrice($price);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $donuts
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch donuts by price'
            ]);
        }
    }
}