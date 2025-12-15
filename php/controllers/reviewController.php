<?php
use MongoDB\BSON\ObjectId;
class ReviewController {
    private $reviewService;

    public function __construct(ReviewService $reviewService) {
        $this->reviewService = $reviewService;
    }

    public function getAllReviews() {
        try {
            $reviews = $this->reviewService->getAllReviews();
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $reviews
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch reviews'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getReviewsByName($name) {
        try {
            $reviews = $this->reviewService->getReviewsByName($name);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $reviews
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch review'
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public function getReviewsByRating($rating) {
        try {
            $reviews = $this->reviewService->getReviewsByRating($rating);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $review
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to fetch review'
            ], JSON_UNESCAPED_UNICODE);
        }
    }
    public function createReview() {
        try {
            $inputJSON = file_get_contents('php://input');
            $data = json_decode($inputJSON, true);
            $result = $this->reviewService->createReview($data);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Review created successfully.'
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