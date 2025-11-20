<?php
class PromotionController {
    private $promotionService;

    public function __construct(PromotionService $promotionService) {
        $this->promotionService = $promotionService;
    }

    public function getAllPromotions() {
        try {
            $promotions = $this->promotionService->getAllPromotions();

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $promotions
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch promotions'
            ]);
        }
    }

    public function getPromotionById($id) {
        try {
            $promotion = $this->promotionService->getPromotionById($id);

            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $promotion
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch promotion'
            ]);
        }
    }
}