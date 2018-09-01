<?php

$okMessage = 'Contact form successfully submitted. Thank you, We will get back to you soon!';

$errorMessage = 'There was an error while submitting the form. Please try again later';

try
{

    //Taking all values
	$name 			= $_POST['name'];
	$email 			= $_POST['email'];
	$subject 		= $_POST['subject'];
	$msg 			= $_POST['message'];
	$output 		= "Name: ".$name."\n\nSubject: ".$subject."\n\nMessage: ".$msg;

	$to 			= 'hello@test.com';
    $headers 		= array('Content-Type: text/plain; charset="UTF-8";',
						'From: ' . $email,
						'Reply-To: ' . $email,
						'Return-Path: ' . $email,
					);
	
	mail($to, $name, $output."\n\n***This message has been sent from Hardi", $headers);

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}