<?php
class PostgreSQL {
    private $host = "localhost";
    private $dbname = "donutshop";
    private $user = "root";
    private $password = "4509";
    private $port = "5432";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("pgsql:host=".$this->host.";port=".$this->port.";dbname=".$this->dbname, $this->user, $this->password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
