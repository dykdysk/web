<?php
use MongoDB\Client;
use MongoDB\Database;

class MongoDB {
    private $host = "localhost";
    private $port = "27017";
    private $dbname = "donutshop";

    private $client = null;

    public function getConnection(): ?Database {
        if ($this->client === null) {
            $uri = "mongodb://{$this->host}:{$this->port}";

            try {
                $this->client = new Client($uri);
            } catch (\Exception $e) {
                error_log("MongoDB Connection error: " . $e->getMessage());
                $this->client = null;
                return null;
            }
        }
        return $this->client->selectDatabase($this->dbname);
    }
}