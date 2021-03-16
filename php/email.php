<?php
require_once __DIR__.'\sendgrid-php-main\sendgrid-php.php';

use \SendGrid\Mail\Mail as SendMail;
use \SendGrid\Mail\HtmlContent;
use \SendGrid\Mail\PlainTextContent;
use \SendGrid\Mail\To;
use \SendGrid\Mail\From;

$formtype = "";

function process() {
    if(isset($_POST['submit'])) {
        if ((!isset($_POST['firstname']))       || 
            (!isset($_POST['lastname']))        ||
            (!isset($_POST['organization']))    || 
            (!isset($_POST['role']))            ||
            (!isset($_POST['emailaddress']))    || 
            (!isset($_POST['country']))       ||
            (!isset($_POST['formtype']))       ||
            (!isset($_POST['message']))) {
            return false;
        } else {
            global $formtype;
            $firstname = $_POST['firstname'];
            $lastname = $_POST['lastname'];
            $organization = $_POST['organization'];
            $role = $_POST['role'];
            $emailaddress = $_POST['emailaddress'];
            $country = $_POST['country'];
            $message = $_POST['message'];
            $formtype = $_POST['formtype'];
        }
    }

    $plainTextContent = new PlainTextContent(
        "Name: " .$firstname . " " . $lastname . "\n" .
        "Organization: " . $organization . "\n" .
        "Country: " . $country . "\n" .
        "Role: " . $role . "\n" .
        "Message: " . $message . "\n" .
        "Email: " . $emailaddress
        );
    $htmlContent = new HtmlContent(
        "<table>" .
        "<tr><td>Name:</td><td>" . $firstname . " " . $lastname . "</td></tr>" .
        "<tr><td>Organization:</td><td>" . $organization . "</td></tr>" .
        "<tr><td>Country:</td><td>" . $country . "</td></tr>" .
        "<tr><td>Role:</td><td>" . $role . "</td></tr>" .
        "<tr><td>Message:</td><td>" . $message . "</td></tr>" .
        "<tr><td>Email:</td><td>" . $emailaddress . "</td></tr></table>" 
        );
    
    $to = new To(getenv("SENDGRID_TOADDRESS"),getenv("SENDGRID_TONAME"));
    $from = new From(getenv("SENDGRID_FROMADDRESS"),getenv("SENDGRID_FROMNAME"));

    $email = new SendMail();
    $email->setFrom($from);
    $email->addTo($to);
    $email->setSubject($formtype . " Form: " . $firstname . " " . $lastname . ", " . $role . ", " . $organization);
    $email->addContent($plainTextContent);
    $email->addContent($htmlContent);

    $sendgrid = new \SendGrid(getenv("SENDGRID_APIKEY"));
    try {
        $response = $sendgrid->send($email);
        return true;
    } catch (Exception $e) {
        return false;
    }
}

$success = process();
header('Location: ../video.html');

?>