<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require_once 'include/dboperation.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route

//method post input student
$app->post('/customer', function() use ($app){
    //verifyRequiredParams(array('nama','alamat','telepon','tempat_lahir','tgl_lahir'));
    //$response = array();
    $request = $app->request();
    $input   = json_decode($request->getBody());
    $nama = $input->nama;
    $alamat = $input->alamat;
    $telepon = $input->telepon;
    $tempat_lahir = $input->tempat_lahir;
    $tgl_lahir = $input->tgl_lahir;
    $db = new dbOperation();
    $res = $db->createCustomer($nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir);
    $response = array();
    if($res){
        $response['error'] = false;
        $response['message'] = "Data Customer Tersimpan";
    }else{
        $response['error'] = true;
        $response['message'] = "Tidak dapat menyimpan data Customer";
    }
 
    echoResponse(200,$response);
});


//method get ambil data student
$app->get('/customer', function() use ($app){
    $db = new dbOperation();
    $result = $db->getAllCustomer();
    $response = array();
    $response['error'] = false;
    $response['customer'] = array();
 
    while($row = $result->fetch_assoc()){
        $temp = array();
        $temp['id'] = $row['id_customer'];
        $temp['nama'] = $row['nama'];
        $temp['alamat'] = $row['alamat'];
        $temp['telepon'] = $row['telepon'];
        $temp['tempat_lahir'] = $row['tempat_lahir'];
        $temp['tgl_lahir'] = $row['tgl_lahir'];
        array_push($response['customer'],$temp);

    }
 
    echoResponse(200,$response);
});
$app->get('/customer/:id' , function($id_customer) use ($app){
    $db = new dbOperation();
    $result = $db->getCustomer($id_customer);
    $response = array();
    //$response['error'] = false;
    $response['customer'] = array();
 
    $row = $result->fetch_assoc();
        $temp = array();
         $temp['id'] = $row['id_customer'];
        $temp['nama'] = $row['nama'];
        $temp['alamat'] = $row['alamat'];
        $temp['telepon'] = $row['telepon'];
        $temp['tempat_lahir'] = $row['tempat_lahir'];
        $temp['tgl_lahir'] = $row['tgl_lahir'];
        array_push($response['customer'],$temp);
    
 
    echoResponse(200,$response);
});
//method pos membuat faculty

// method put update assignment
$app->put('/customer/:id', function($id_customer) use ($app){
    $request = $app->request();
    $input   = json_decode($request->getBody());
    $nama = $input->nama;
    $alamat = $input->alamat;
    $telepon = $input->telepon;
    $tempat_lahir = $input->tempat_lahir;
    $tgl_lahir = $input->tgl_lahir;
    $db = new dbOperation();
    $result = $db->updateCustomer($nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir,$id_customer);
    $response = array();
    if($result){
        $response['error'] = false;
        $response['message'] = "Data Sukses Diupdate";
    }else{
        $response['error'] = true;
        $response['message'] = "Data Gagal Diupdate";
    }
    echoResponse(200,$response);
});
//delete
$app->delete('/customer/:id', function($id_customer) use ($app){
    $db = new dbOperation();
    $result = $db->deleteCustomer($id_customer);
    $response = array();
    if($result){
        $response['error'] = false;
        $response['message'] = "Data Terhapus";
    }else{
        $response['error'] = true;
        $response['message'] = "Data Gagal Dihapus";
    }
    echoResponse(200,$response);
});
//method untuk menampilkan response
function echoResponse($status_code, $response){
    //mengambil app instance
    $app = \Slim\Slim::getInstance();
    //seting http respon kode
    $app->status($status_code);
    //seting response content type json
    $app->contentType('application/json');
    //menampilkan response dalam json
    echo json_encode($response);
}

function verifyRequiredParams($required_fields){
    $error = false;
    $error_fields = "";
    $request_params = $_REQUEST;
    if($_SERVER['REQUEST_METHOD'] == 'PUT'){
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }

    foreach ($required_fields as $field){
        if(!isset($request_params[$field]) || strlen(trim($request_params[$field])) <=0){
            $error = true;
            $error_fields.=$field.', ';
        }
    }
    if($error){
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required Field(s) '.substr($error_fields, 0, -2). ' Hilang atau Kosong';
        echoResponse(400, $response);
        $app->stop();
    }
}
//autentikasi faculty
function authenticateCustomer(\Slim\Route $route)
{
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();
    if (isset($headers['Authorization'])) {
        $db = new dbOperation();
        $api_key = $headers['Authorization'];
        if (!$db->isValidCustomer($api_key)) {
            $response["error"] = true;
            $response["message"] = "Access Denied. Invalid Api key";
            echoResponse(401, $response);
            $app->stop();
        }
    } else {
        $response["error"] = true;
        $response["message"] = "Api key is misssing";
        echoResponse(400, $response);
        $app->stop();
    }
}
/*
//autentikasi student
function authenticateStudent(\Slim\Route $route){
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();

    if(isset($headers['Authorization'])){
        $db = new dbOperation();
        $api_key = $headers['Authorization'];

        //VALIDASI API KEY
        if(!$db->isValidStudent($api_key)){
            $response["error"] = true;
            $response["message"] = "Akses Ditolak. Api Key Tidak Sesuai";
            echoResponse(401, $response);
            $app->stop;
        }
    }else{
        $response["error"] = true;
        $response["message"] = "Api Key Kosong";
        echoResponse(400, $response);
        $app->stop;
    }
}
*/
$app->run();
