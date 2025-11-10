<?php
class BoxRepository {
    private $conn;
    private $table = 'box';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function findAll(): array {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $boxes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $box = new Box();
            $box->id = $row['id'];
            $box->title = $row['title'];
            $box->description = $row['description'];
            $box->price = $row['price'];
            $box->image = $row['image'];
            $box->quantity = $row['quantity'];
            $boxes[] = $box;
        }
        return $boxes;
    }

    public function findById(int $id): ?Box {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }

        $box = new Box();
        $box->id = $row['id'];
        $box->title = $row['title'];
        $box->description = $row['description'];
        $box->price = $row['price'];
        $box->image = $row['image'];
        $box->quantity = $row['quantity'];
        return $box;
    }

    public function findByTitle(string $title): array {
        $query = "SELECT * FROM " . $this->table . " WHERE title LIKE :title";
        $stmt = $this->conn->prepare($query);
        $searchTerm = "%" . $title . "%";
        $stmt->bindParam(':title', $searchTerm);
        $stmt->execute();

        $boxes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $box = new Box();
            $box->id = $row['id'];
            $box->title = $row['title'];
            $box->description = $row['description'];
            $box->price = $row['price'];
            $box->image = $row['image'];
            $box->quantity = $row['quantity'];
            $boxes[] = $box;
        }
        return $boxes;
    }

    public function findByQuantity(int $quantity): array {
        $query = "SELECT * FROM " . $this->table . " WHERE quantity = :quantity";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->execute();

        $boxes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $box = new Box();
            $box->id = $row['id'];
            $box->title = $row['title'];
            $box->description = $row['description'];
            $box->price = $row['price'];
            $box->image = $row['image'];
            $box->quantity = $row['quantity'];
            $boxes[] = $box;
        }
        return $boxes;
    }

    public function findByPrice(float $price): array {
        $query = "SELECT * FROM " . $this->table . " WHERE price = :price";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':price', $price);
        $stmt->execute();

        $boxes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $box = new Box();
            $box->id = $row['id'];
            $box->title = $row['title'];
            $box->description = $row['description'];
            $box->price = $row['price'];
            $box->image = $row['image'];
            $box->quantity = $row['quantity'];
            $boxes[] = $box;
        }
        return $boxes;
    }
}