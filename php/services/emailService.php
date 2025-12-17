<?php

$php_dir = dirname(__DIR__);
require $php_dir . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$dotenvPath = dirname(__DIR__);
$dotenv = Dotenv\Dotenv::createImmutable($dotenvPath);
$dotenv->safeLoad();

class EmailService{

    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);
    }
    public function send($order){
        $smtpHost = $_ENV['SMTP_HOST'];
        $smtpPort = $_ENV['SMTP_PORT'];
        $smtpUsername = $_ENV['SMTP_USERNAME'];
        $smtpPassword = $_ENV['SMTP_PASSWORD'];
        $smtpName = $_ENV['SMTP_NAME'];
        $root_dir = dirname(__DIR__, 2);
        $image_path = $root_dir . "/images/";
        try {
            $mail = $this->mail;

            $mail->isSMTP();
            $mail->CharSet = 'UTF-8';
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUsername;
            $mail->Password = $smtpPassword;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $smtpPort;

            $mail->setFrom($smtpUsername, $smtpName);
            $mail->addAddress($order->personInformation->email);

            $unique_images = [];

            foreach ($order->orderInformation->donuts as $donut) {
                if (!empty($donut->image)) {
                    $unique_images[$donut->image] = $image_path . $donut->image;
                }
            }

            foreach ($order->orderInformation->boxes as $box) {
                if (!empty($box->image)) {
                    $unique_images[$box->image] = $image_path . $box->image;
                }

                foreach ($box->donuts as $donut) {
                    if (!empty($donut->image)) {
                        $unique_images[$donut->image] = $image_path . $donut->image;
                    }
                }
            }

            foreach ($unique_images as $filename => $filepath) {
                $cid = md5($filename);
                $mail->addEmbeddedImage($filepath, $cid, $filename);
            }

            $format_price = function ($price) {
                return number_format($price, 2, ',', ' ') . ' руб.';
            };

            $items_html = '';
            $total_price = 0;
            $table_header = '
                <thead>
                    <tr>
                        <th style="width: 50px;"></th>
                        <th>Наименование</th>
                        <th style="text-align: center;">Кол-во</th>
                        <th style="text-align: right;">Цена/шт</th>
                        <th style="text-align: right;">Сумма</th>
                    </tr>
                </thead>
                <tbody>
            ';
            $items_html .= $table_header;

            foreach ($order->orderInformation->donuts as $donut) {
                $item_price = $donut->price * $donut->quantity;
                $total_price += $item_price;
                $items_html .= '
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">
                            <img src="cid:' . md5($donut->image) . '" alt="' . htmlspecialchars($donut->name) . '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">' . htmlspecialchars($donut->name) . '</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">' . (int)$donut->quantity . ' шт.</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">' . $format_price($donut->price) . '</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">' . $format_price($item_price) . '</td>
                    </tr>
                ';
            }

            foreach ($order->orderInformation->boxes as $box) {
                $box_price = $box->price * $box->quantity;
                $total_price += $box_price;

                $items_html .= '
                    <tr style="background-color: #f7f7f7;">
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                            <img src="cid:' . md5($box->image) . '" alt="' . htmlspecialchars($box->title) . '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Коробка: ' . htmlspecialchars($box->title) . '</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center; font-weight: bold;">' . (int)$box->quantity . ' шт.</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">' . $format_price($box->price) . '</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">' . $format_price($box_price) . '</td>
                    </tr>
                ';

                foreach ($box->donuts as $donut) {
                    $items_html .= '
                        <tr style="font-size: 12px; color: #555;">
                            <td style="padding: 5px 10px 5px 25px; border-bottom: 1px solid #eee;">
                                <img src="cid:' . md5($donut->image) . '" alt="' . htmlspecialchars($donut->name) . '" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; display: inline-block; vertical-align: middle; margin-right: 5px;">
                            </td>
                            <td style="padding: 5px 10px; border-bottom: 1px solid #eee;"> — ' . htmlspecialchars($donut->name) . '</td>
                            <td style="padding: 5px 10px; border-bottom: 1px solid #eee; text-align: center;">' . (int)$donut->quantity . ' шт.</td>
                            <td colspan="2" style="padding: 5px 10px; border-bottom: 1px solid #eee;"></td>
                        </tr>
                    ';
                }

                if (!empty($box->flowers)) {
                    $items_html .= '<tr style="font-size: 12px; color: #555;"><td colspan="5" style="padding: 2px 10px 2px 25px;"> • Цветы: ' . htmlspecialchars($box->flowers) . '</td></tr>';
                }
                if (!empty($box->card)) {
                    $items_html .= '<tr style="font-size: 12px; color: #555;"><td colspan="5" style="padding: 2px 10px 2px 25px;"> • Открытка: ' . htmlspecialchars($box->card) . '</td></tr>';
                }
            }
            $items_html .= '</tbody>';

            $mail->isHTML(true);
            $mail->Subject = 'Подтверждение заказа';

            $mail->Body    = '
                <html>
                <head>
                    <style>
                        /* Инлайн-CSS для лучшей совместимости с почтовыми клиентами */
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                        .header { background-color: #ff69b4; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; }
                        .section-title { color: #333333; border-bottom: 2px solid #ff69b4; padding-bottom: 5px; margin-top: 20px; margin-bottom: 15px; font-size: 18px; }
                        .info-table th, .info-table td { padding: 8px 0; text-align: left; border-bottom: 1px dashed #cccccc; }
                        .info-table th { width: 40%; font-weight: bold; color: #555; }
                        .item-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        .item-table th { background-color: #ff69b4; color: white; padding: 12px 10px; text-align: left; font-size: 14px; }
                        .item-table td { font-size: 14px; }
                        .total { background-color: #fff0f5; padding: 15px; text-align: right; border-top: 2px solid #ff69b4; font-size: 18px; font-weight: bold; }
                        .footer { background-color: #f4f4f4; color: #888888; text-align: center; padding: 15px; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Ваш заказ принят!</h2>
                            <p>Спасибо за ваш заказ. Ниже приведена подробная информация.</p>
                        </div>

                        <div class="content">

                            <div class="section-title">Состав заказа</div>
                            <table class="item-table">
                                ' . $items_html . '
                            </table>

                            <div class="total">
                                ИТОГО К ОПЛАТЕ: ' . $format_price($total_price) . '
                            </div>

                            <div class="section-title">Детали доставки и оплаты</div>
                            <table class="info-table" style="width: 100%;">
                                <tr>
                                    <th>Способ доставки</th>
                                    <td>' . htmlspecialchars($order->personInformation->delivery_method) . '</td>
                                </tr>
                                <tr>
                                    <th>Адрес доставки</th>
                                    <td>' . htmlspecialchars($order->personInformation->delivery_address) . '</td>
                                </tr>
                                <tr>
                                    <th>Способ оплаты</th>
                                    <td>' . htmlspecialchars($order->personInformation->payment_method) . '</td>
                                </tr>
                                <tr>
                                    <th>Комментарий к заказу</th>
                                    <td>' . (empty($order->personInformation->comment) ? '—' : htmlspecialchars($order->personInformation->comment)) . '</td>
                                </tr>
                            </table>

                        </div>

                        <div class="footer">
                            Это автоматическое письмо. Пожалуйста, не отвечайте на него.
                        </div>
                    </div>
                </body>
                </html>
            ';
            $mail->AltBody = 'Текстовый вариант для почтовых клиентов';
            $mail->send();
        } catch (Exception $e) {
            throw new Exception("Ошибка отправки: {$mail->ErrorInfo}");
        }
    }
}