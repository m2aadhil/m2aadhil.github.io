<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require '../assets/vendor/PHPMailer/src/Exception.php';
  require '../assets/vendor/PHPMailer/src/PHPMailer.php';

  $receiving_email_address = 'aadhil_m@outlook.com';
  try {
  //Create an instance; passing `true` enables exceptions
  $mail = new PHPMailer(true);

  // $contact->ajax = true;
  
  // $contact->to = $receiving_email_address;
  // $contact->from_name = $_POST['name'];
  // $contact->from_email = $_POST['email'];
  // $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $mail->setFrom($_POST['email'],  $_POST['name']);
  $mail->addAddress( $receiving_email_address, 'Aadhil Musthaq');     //Add a recipient
  //$mail->addAddress('ellen@example.com');               //Name is optional
  //$mail->addReplyTo('info@example.com', 'Information');
  $mail->isHTML(true);   
  $mail->Subject = $_POST['subject'];
  $mail->Body    = $_POST['message'];
  $mail->AltBody = $_POST['message'];

  // $contact->add_message( $_POST['name'], 'From');
  // $contact->add_message( $_POST['email'], 'Email');
  // $contact->add_message( $_POST['message'], 'Message', 10);

  echo $mail->send();
  }catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
?>