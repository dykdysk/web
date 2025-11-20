<?php
class DonutService {
    private $donutRepository;

    public function __construct(DonutRepository $donutRepository) {
        $this->donutRepository = $donutRepository;
    }

    public function getAllDonuts(): array {
        return $this->donutRepository->findAll();
    }

    public function getDonutById(int $id): ?Donut {
        return $this->donutRepository->findById($id);
    }

    public function getDonutsByName(string $name): array {
        return $this->donutRepository->findByName($name);
    }

    public function getDonutsByCategory(string $category): array {
        return $this->donutRepository->findByCategory($category);
    }

    public function getDonutsByPrice(float $price): array {
        return $this->donutRepository->findByPrice($price);
    }
    public function getDonutsByIsNew(bool $isNew): array {
        return $this->donutRepository->findByIsNew($isNew);
    }
}