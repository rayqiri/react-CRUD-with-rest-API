<?php

class dbOperation
{
	private $con;
	function __construct()
	{
	require_once dirname(__FILE__).'/dbconnect.php';
	$db = new dbConnect();
	$this->con = $db->connect();
	}
//Method Membuat Student	

//Method Membuat a new assignment
public function createCustomer($nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir){
        $stmt = $this->con->prepare("INSERT INTO tbl_customer (nama,alamat,telepon,tempat_lahir,tgl_lahir) VALUES (?,?,?,?,?)");
        $stmt->bind_param("sssss",$nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir);
        $result = $stmt->execute();
        $stmt->close();
        if($result){
            return true;
        }
        return false;
    }
//Method to update assignment status
public function updateCustomer($nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir,$id_customer){
$stmt = $this->con->prepare("UPDATE tbl_customer SET nama=?, alamat=?, telepon=?, tempat_lahir=?, tgl_lahir=? WHERE id_customer=?");
$stmt->bind_param("sssssi",$nama,$alamat,$telepon,$tempat_lahir,$tgl_lahir,$id_customer);
$result = $stmt->execute();
$stmt->close();
if($result){
return true;
        }
return false;
    }
//delete
public function deleteCustomer($id_customer){
$stmt = $this->con->prepare("DELETE FROM tbl_customer WHERE id_customer=?");
$stmt->bind_param("i",$id_customer);
$result = $stmt->execute();
$stmt->close();
if($result){
return true;
        }
return false;
    }
//Method to get all the assignments of a particular student
public function getCustomer($id_customer){
        $stmt = $this->con->prepare("SELECT * FROM tbl_customer WHERE id_customer=?");
        $stmt->bind_param("i",$id_customer);
        $stmt->execute();
        $customer = $stmt->get_result();
        $stmt->close();
        return $customer;
    }
//ambil data student
public function getAllCustomer(){
        $stmt = $this->con->prepare("SELECT * FROM tbl_customer");
        $stmt->execute();
        $customer = $stmt->get_result();
        $stmt->close();
        return $customer;
    }

public function isValidCustomer($api_key){
$stmt = $this->con->prepare("SELECT id_api_reg FROM tbl_api_reg WHERE api_key=?");
$stmt->bind_param("s",$api_key);
$stmt->execute();
$stmt->store_result();
$num_rows = $stmt->num_rows;
$stmt->close();
return $num_rows > 0;	
}
//Checking the faculty is valid or not by api key

//generate unique api key
private function generateApiKey(){
	return md5(uniqid(rand(), true));
}

}//end class