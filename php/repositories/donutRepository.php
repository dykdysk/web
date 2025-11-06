<?php
class DonutRepository {
    private $conn;
    private $table = 'donuts';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function findAll(): array {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $donuts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $donut = new Donut();
            $donut->id = $row['id'];
            $donut->name = $row['name'];
            $donut->description = $row['description'];
            $donut->price = $row['price'];
            $donut->image = $row['image'];
            $donut->category = $row['category'];
            $donuts[] = $donut;
        }
        return $donuts;
    }

    public function findById(int $id): ?Donut {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }

        $donut = new Donut();
        $donut->id = $row['id'];
        $donut->name = $row['name'];
        $donut->description = $row['description'];
        $donut->price = $row['price'];
        $donut->image = $row['image'];
        $donut->category = $row['category'];
        return $donut;
    }

    public function findByName(string $name): array {
        $query = "SELECT * FROM " . $this->table . " WHERE name LIKE :name";
        $stmt = $this->conn->prepare($query);
        $searchTerm = "%" . $name . "%";
        $stmt->bindParam(':name', $searchTerm);
        $stmt->execute();

        $donuts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $donut = new Donut();
            $donut->id = $row['id'];
            $donut->name = $row['name'];
            $donut->description = $row['description'];
            $donut->price = $row['price'];
            $donut->image = $row['image'];
            $donut->category = $row['category'];
            $donuts[] = $donut;
        }
        return $donuts;
    }

    public function findByCategory(string $category): array {
        $query = "SELECT * FROM " . $this->table . " WHERE category = :category";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category', $category);
        $stmt->execute();

        $donuts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $donut = new Donut();
            $donut->id = $row['id'];
            $donut->name = $row['name'];
            $donut->description = $row['description'];
            $donut->price = $row['price'];
            $donut->image = $row['image'];
            $donut->category = $row['category'];
            $donuts[] = $donut;
        }
        return $donuts;
    }

    public function findByPrice(float $price): array {
        $query = "SELECT * FROM " . $this->table . " WHERE price = :price";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':price', $price);
        $stmt->execute();

        $donuts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $donut = new Donut();
            $donut->id = $row['id'];
            $donut->name = $row['name'];
            $donut->description = $row['description'];
            $donut->price = $row['price'];
            $donut->image = $row['image'];
            $donut->category = $row['category'];
            $donuts[] = $donut;
        }
        return $donuts;
    }
}