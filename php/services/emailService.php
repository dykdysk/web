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
            $mail->addEmbeddedImage($image_path."1.png", '1.png', '1.png');

            $mail->setFrom($smtpUsername, $smtpName);
            $mail->addAddress($order->personInformation->email);

            $mail->isHTML(true);
            $mail->Subject = 'Тема письма';
            $mail->Body    = '
                <html>
                    <body>
                        <h1>Привет!</h1>
                        <p>Это картинка, встроенная в письмо:</p>
                        <img src="cid:1.png" alt="Логотип" style="width: 100px; height: auto;">
                        <p>Конец письма.</p>
                    </body>
                </html>
            ';
            $mail->AltBody = 'Текстовый вариант для почтовых клиентов';

            $mail->send();
            echo 'Письмо отправлено';
        } catch (Exception $e) {
            echo "Ошибка отправки: {$mail->ErrorInfo}";
        }
    }
}