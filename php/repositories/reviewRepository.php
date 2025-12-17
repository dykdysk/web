<?php

use MongoDB\Database;
use MongoDB\BSON\ObjectId;
use MongoDB\Model\BSONDocument;

class ReviewRepository {
    private $mongo_db;
    private $collection;
    private $collectionName = 'review';

    public function __construct(Database $mongo_db) {
        $this->mongo_db = $mongo_db;
        $this->collection = $this->mongo_db->selectCollection($this->collectionName);
    }

    public function findAll(): array {
        $cursor = $this->collection->find([]);
        $reviews = [];
        foreach ($cursor as $document) {
            $reviews[] = $this->mapDocumentToReview($document);
        }
        return $reviews;
    }

    public function findByName(string $name): array {
        $cursor = $this->collection->find(['name' => $name]);
        $reviews = [];
        foreach ($cursor as $document) {
            $reviews[] = $this->mapDocumentToReview($document);
        }
        return $reviews;
    }

    public function findByRating(int $rating): array {
        $cursor = $this->collection->find(['rating' => $rating]);
        $reviews = [];
        foreach ($cursor as $document) {
            $reviews[] = $this->mapDocumentToReview($document);
        }
        return $reviews;
    }

    public function save(array $data): ObjectId {
        $document = [
            'name' => $data['name'],
            'rating' => (int)$data['rating'],
            'text' => $data['text'],
            'date' => $data['date']
        ];
        $result = $this->collection->insertOne($document);
        return $result->getInsertedId();
    }

    private function mapDocumentToReview($document): Review {
        $review = new Review();

        if (isset($document['_id'])) {
            $review->id = (string)$document['_id'];
        }

        $review->name = $document['name'] ?? null;
        $review->rating = $document['rating'] ?? null;
        $review->text = $document['text'] ?? null;
        $review->date = $document['date'] ?? null;

        return $review;
    }
}