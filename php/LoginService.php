<?php

class LoginService{
	
	public function authenticate($netid,$password){
		//returns netid or fail
		//return "pxg142030";
		$con = mysqli_connect('localhost','root','','trainingmanagementsystem');
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		mysqli_select_db($con,"login_service");
		$sql="SELECT password,type_of_user FROM user WHERE netid = '".$netid."';";
		$result = mysqli_query($con,$sql);
		$row = mysqli_fetch_array($result);
		if($result->num_rows===0){
			//username does not exit
			echo "-1";
		}
		else{
			if($row['password']===$password){
				//success
				$sql="update user set session='SOMESESSIONHASH', is_logged_in=true where netId='".$netid."' and password='".$row['password']."';";
				mysqli_query($con,$sql);
				$resp=$netid."/student";
				echo $resp;
			}
			else{
				//password mismatch
				echo "-1";
			}
		}
		
	}
	
	public function logout($netid){
		$con = mysqli_connect('localhost','root','','trainingmanagementsystem');
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		mysqli_select_db($con,"login_service");
		$sql="update user set session=NULL, is_logged_in=false where netId='.$netid.';";
		$result = mysqli_query($con,$sql);
	}
	
	public function isLoggedIn($netid){
		
	}
	
}

$netid = $_GET['netid'];
$pwd = $_GET['pwd'];
$request = $_GET['request'];

if($request == "authenticate"){
	$loginService = new LoginService();
	echo $loginService->authenticate($netid, $pwd);
}
else if($request == "logout"){
	$loginService = new LoginService();
	$loginService->logout($netid);	
}

?>