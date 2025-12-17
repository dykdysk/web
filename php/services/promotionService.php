<?php
class PromotionService {
    private $promotionRepository;

    public function __construct(PromotionRepository $promotionRepository) {
        $this->promotionRepository = $promotionRepository;
    }

    public function getAllPromotions(): array {
        return $this->promotionRepository->findAll();
    }

    public function getPromotionById(int $id): ?Promotion {
        return $this->promotionRepository->findById($id);
    }

}