<?php
class BoxController {
    private $boxService;

    public function __construct(BoxService $boxService) {
        $this->boxService = $boxService;
    }

    public function getAllBoxes() {
        try {
            $boxes = $this->boxService->getAllBoxes();

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes'
            ]);
        }
    }

    public function getBoxById($id) {
        try {
            $box = $this->boxService->getBoxById($id);

            if (!$box) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'error' => 'Box not found'
                ]);
                return;
            }

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $box
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch box'
            ]);
        }
    }

    public function getBoxesByTitle($title) {
        try {
            $boxes = $this->boxService->getBoxesByTitle($title);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by title'
            ]);
        }
    }

    public function getBoxesByQuantity($quantity) {
        try {
            $boxes = $this->boxService->getBoxesByQuantity($quantity);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by quantity'
            ]);
        }
    }

    public function getBoxesByPrice($price) {
        try {
            $boxes = $this->boxService->getBoxesByPrice($price);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by price'
            ]);
        }
    }
}