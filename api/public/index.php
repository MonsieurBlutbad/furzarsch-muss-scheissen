<?php
/**
 * Created by PhpStorm.
 * User: BK
 * Date: 02.11.17
 * Time: 11:54
 */

use Symfony\Component\HttpFoundation\Request;
use Framework\Core;

$loader = require  __DIR__ . '/../vendor/autoload.php';
$loader->register();

$request = Request::createFromGlobals();

$app = new Core();


$response = $app->handle($request);

$response->send();

