<?php
class BoxService {
    private $boxRepository;

    public function __construct(BoxRepository $boxRepository) {
        $this->boxRepository = $boxRepository;
    }

    public function getAllBoxes(): array {
        return $this->boxRepository->findAll();
    }

    public function getBoxById(int $id): ?Box {
        return $this->boxRepository->findById($id);
    }

    public function getBoxesByTitle(string $title): array {
        return $this->boxRepository->findByTitle($title);
    }

    public function getBoxesByQuantity(int $quantity): array {
        return $this->boxRepository->findByQuantity($quantity);
    }

    public function getBoxesByPrice(float $price): array {
        return $this->boxRepository->findByPrice($price);
    }
}