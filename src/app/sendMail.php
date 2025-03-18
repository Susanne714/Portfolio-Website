<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
        case("POST"): //Send the email;
            header("Access-Control-Allow-Origin: *");
            // Payload is not send to $_POST Variable,
            // is send to php:input as a text
            $json = file_get_contents('php://input');
            //parse the Payload from text format to Object
            $params = json_decode($json);
    
            $email = $params->email;
            $name = $params->name;
            $message = $params->message;
    
            $recipient = 'kontakt@susanneborchardt.com';  
            $subject = "Request from <$email>";
            $message = "From: " . $name . "<br><br>" . "Email: " . $email . "<br><br>" . $message;
    
            $headers   = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';

            // Additional headers
            $headers[] = "From: Kontaktformular@mywebsite.com";

            $mailSent = mail($recipient, $subject, $message, implode("\r\n", $headers));

        if ($mailSent) {
            echo json_encode(["success" => true, "message" => "E-Mail wurde erfolgreich versendet."]);
        } else {
            echo json_encode(["success" => false, "message" => "E-Mail konnte nicht versendet werden."]);
        }
            
            break;
        default: //Reject any non POST or OPTIONS requests.
            header("Allow: POST", true, 405);
            exit;
    } 
