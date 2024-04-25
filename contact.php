<?php

$content = trim(file_get_contents("php://input"));
$data = json_decode($content, true);
if (!$data) {
    header('Location: /');
} else {
    $url = 'https://bidinv.com/consultation/v2';

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    $data['ipAdress'] = $ip;

    $options = [
        'http' => [
            'ignore_errors' => true,
            'header' => "Content-type: application/json\r\n" .
                "Access-Control-Allow-Origin: *\r\n" .
                "sec-fetch-mode: cors\r\n" .
                "sec-fetch-site: cross-site\r\n" .
                "cache-control: max-age=0\r\n" .
                "origin: " . $data['source'] . "\r\n",
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    $context = stream_context_create($options);

    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo 'ERROR!';
    }

    echo $result;
}
exit;
