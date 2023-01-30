<?php

include ("includes/connect.php");

if($_POST['action']=="deleteCommon"){
    $tableName=$_POST['tableName'];
    $deleteId=$_POST['id'];
    $whrIdName=$_POST['whrIdName'];

    $updArr=array();
    $updArr['eStatus']="d";
    $mfp->mf_dbupdate($tableName,$updArr," WHERE ".$whrIdName."=".$deleteId."");

    $returArr['status']=200;
    $returArr['message']="Record has been deleted successfully.";
}