<?php
use MongoDB\BSON\ObjectId;
class ReviewService {
    private $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository) {
        $this->reviewRepository = $reviewRepository;
    }

    public function getAllReviews(): array {
        return $this->reviewRepository->findAll();
    }

    public function getReviewsByName(string $name): array {
        return $this->reviewRepository->findByName($name);
    }

    public function getReviewsByRating(int $rating): array {
        return $this->reviewRepository->findByRating($rating);
    }

    public function createReview(array $data): ObjectId {
        return $this->reviewRepository->save($data);
    }
}