<?php
class PromotionRepository {
    private $conn;
    private $table = 'promotions';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function findAll(): array {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $promotions = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $promotion = new Promotion();
            $promotion->id = $row['id'];
            $promotion->title = $row['title'];
            $promotion->description = $row['description'];
            $promotion->image = $row['image'];
            $promotions[] = $promotion;
        }
        return $promotions;
    }

    public function findById(int $id): ?Promotion {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }

        $promotion = new Promotion();
        $promotion->id = $row['id'];
        $promotion->title = $row['title'];
        $promotion->description = $row['description'];
        $promotion->image = $row['image'];
        return $promotion;
    }

    public function findByTitle(string $title): array {
        $query = "SELECT * FROM " . $this->table . " WHERE title LIKE :title";
        $stmt = $this->conn->prepare($query);
        $searchTerm = "%" . $title . "%";
        $stmt->bindParam(':title', $searchTerm);
        $stmt->execute();

        $promotions = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $promotion = new Promotion();
            $promotion->id = $row['id'];
            $promotion->title = $row['title'];
            $promotion->description = $row['description'];
            $promotion->image = $row['image'];
            $promotions[] = $promotion;
        }
        return $promotions;
    }
}