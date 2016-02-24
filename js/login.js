function login(){
	var netid=document.getElementById("netid").value;
	var pwd=document.getElementById("pwd").value;
	
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//response is received
			if(xmlhttp.responseText=="-1"){
				//authentication failure
				//document.getElementById("response").innerHTML=xmlhttp.responseText;
			}
			else{
				//start session
				var response=xmlhttp.responseText.split("/");
				localStorage.setItem("loggedin_netid", response[0]);
				localStorage.setItem("loggedin_typeofuser",response[1]);
				if(response[1]=="student"){
					//students/trainer page
					alert("student");
					window.open("http://localhost:8080/students_whatsnew.html","_self");
				}
				else{
					//admin page-iteration 2
				}
				//document.getElementById("response").innerHTML=xmlhttp.responseText;
				
			}
			
		}
	}
	xmlhttp.open("GET","php/LoginService.php?netid="+netid+"&pwd="+pwd+"&request=authenticate",true);
	xmlhttp.send();
}