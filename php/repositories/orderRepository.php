<?php

use MongoDB\Database;
use MongoDB\BSON\ObjectId;
use MongoDB\Model\BSONDocument;

class OrderRepository {
    private $mongo_db;
    private $collection;
    private $collectionName = 'order';

    public function __construct(Database $mongo_db) {
        $this->mongo_db = $mongo_db;
        $this->collection = $this->mongo_db->selectCollection($this->collectionName);
    }

    public function save(Order $order): ObjectId {
        $document = [
            'personInformation' => [
                'name'              => $order->personInformation->name,
                'phone'             => $order->personInformation->phone,
                'email'             => $order->personInformation->email,
                'delivery_method'   => $order->personInformation->delivery_method,
                'delivery_address'  => $order->personInformation->delivery_address,
                'payment_method'    => $order->personInformation->payment_method,
                'comment'           => $order->personInformation->comment,
            ],

            'orderInformation' => [
                'donuts' => array_map(function ($donut) {
                    return [
                        'id'        => $donut->id,
                        'name'      => $donut->name,
                        'price'     => (float)$donut->price,
                        'image'     => $donut->image,
                        'quantity'  => (int)$donut->quantity,
                    ];
                }, $order->orderInformation->donuts),

                'boxes' => array_map(function ($box) {
                    return [
                        'id'        => $box->id,
                        'title'     => $box->title,
                        'price'     => (float)$box->price,
                        'image'     => $box->image,
                        'quantity'  => (int)$box->quantity,
                        'flowers'   => $box->flowers,
                        'card'      => $box->card,

                        'donuts'    => array_map(function ($boxDonut) {
                            return [
                                'id'        => $boxDonut->id,
                                'name'      => $boxDonut->name,
                                'price'     => (float)$boxDonut->price,
                                'image'     => $boxDonut->image,
                                'quantity'  => (int)$boxDonut->quantity,
                            ];
                        }, $box->donuts),
                    ];
                }, $order->orderInformation->boxes),
            ],
        ];

        $result = $this->collection->insertOne($document);
        return $result->getInsertedId();
    }
}