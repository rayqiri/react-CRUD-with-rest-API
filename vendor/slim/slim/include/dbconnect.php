<?php
class dbConnect
{
	private $con;
function __construct(){
	
}		
function connect(){
	include_once dirname(__FILE__).'/constants.php';
	$this->con = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	if (mysqli_connect_errno()){
	echo "Koneksi Gagal :". mysql_connect_error();
	}
	return $this->con;
}
}