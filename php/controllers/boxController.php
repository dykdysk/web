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
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getBoxById($id) {
        try {
            $box = $this->boxService->getBoxById($id);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $box
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch box'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getBoxesByTitle($title) {
        try {
            $boxes = $this->boxService->getBoxesByTitle($title);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by title'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getBoxesByQuantity($quantity) {
        try {
            $boxes = $this->boxService->getBoxesByQuantity($quantity);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by quantity'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getBoxesByPrice($price) {
        try {
            $boxes = $this->boxService->getBoxesByPrice($price);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $boxes
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch boxes by price'
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}