<?php
/**
 * api.php
 *
 * Envía un PDF al endpoint Spring Boot /api/convert y guarda la respuesta MusicXML.
 * Uso:
 *   php api.php /ruta/al/archivo.pdf
 *
 * Ajusta la URL de la API si tu servicio Spring corre en otra dirección o puerto.
 */

$apiUrl = 'http://localhost:8080/api/convert';

if ($argc < 2) {
    fwrite(STDERR, "Uso: php api.php /ruta/al/archivo.pdf\n");
    exit(1);
}

$pdfPath = $argv[1];
if (!is_file($pdfPath)) {
    fwrite(STDERR, "Error: no existe el archivo PDF especificado: $pdfPath\n");
    exit(1);
}

$filename = basename($pdfPath);
$outputName = preg_replace('/\.pdf$/i', '.musicxml', $filename);
if ($outputName === $filename) {
    $outputName = $filename . '.musicxml';
}

$curlFile = new CURLFile($pdfPath, 'application/pdf', $filename);
$postFields = ['file' => $curlFile];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
if ($response === false) {
    fwrite(STDERR, "Error cURL: " . curl_error($ch) . "\n");
    curl_close($ch);
    exit(1);
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);
curl_close($ch);

if ($httpCode === 200) {
    file_put_contents($outputName, $body);
    echo "Conversión completada. Archivo guardado como: $outputName\n";
    exit(0);
}

fwrite(STDERR, "Error HTTP $httpCode al llamar a la API.\n");
fwrite(STDERR, "Respuesta:\n");
fwrite(STDERR, $body . "\n");
exit(1);
