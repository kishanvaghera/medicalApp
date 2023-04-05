<?php
  $mode="LOCAL";
  if($mode=="LIVE"){
    $MAIN_URL="http://schoolopathy.com/MedicalApi/";
  }else{
    $MAIN_URL="http://localhost/medicalApp/medicalApp/api/";
  }
    
 class Dbconnect 
 { 

  protected  $_localhost = 'localhost'; 
  protected  $_user = 'root'; 
  protected  $_password = ''; 
  protected  $_dbname = 'geetaclinic'; 
  
  // protected  $_localhost = 'localhost'; 
  // protected  $_user = 'schoolopathy2'; 
  // protected  $_password = 'Kishan@8219'; 
  // protected  $_dbname = 'schoolopathydb'; 
  
   
  protected $connection; 
   
   public function __construct() 
   { 
   
   if(!isset($this-> connection)) 
   { 
               
        $this->connection = new mysqli($this->_localhost , $this->_user , $this->_password , $this->_dbname); 
     
        $GLOBALS['myCon']=$this->connection;
   } 
   return $this->connection; 
   } 
 } 
