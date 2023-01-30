<?php

include ("includes/connect.php");

if($_POST['action'] == "login"){
    $vUsername = $_POST['vUsername'];
    $vPassword =sha1($_POST['vPassword']);

    $rtnArr = array();
    $checkUserExist=$mfp->mf_query("SELECT * FROM user WHERE vUsername='".$vUsername."' AND eStatus='y' ");
    if($mfp->mf_affected_rows()>0){
        $row=$mfp->mf_fetch_array($checkUserExist);
        if($row['vPassword']==$vPassword){
            $vAuthToken=$mfp->jwtToken($row['iUserId']);
            $row['vAuthToken']=$vAuthToken;

            $mfp->insertToken($row['iUserId'],$row['vAuthToken']);

            $rtnArr['status']=200;
            $rtnArr['data']=$row;
            if($row['iUserId']==2){
                $rtnArr['iRole']=1;
            }
        }else{
            $rtnArr['status']=412;
            $rtnArr['message']="User or password invalid!";
        }
    }else{
        $rtnArr['status']=412;
        $rtnArr['message']="User or password invalid!";
    }

    echo json_encode($rtnArr);
    exit;
}else if($_POST['action'] == "addUser"){
    $step=$_POST['step'];
    $iPlanId=$_POST['iPlanId'];
    $vFirstName=$_POST['vFirstName'];
    $vMiddleName=$_POST['vMiddleName'];
    $vLastName=$_POST['vLastName'];
    $vEmail=$_POST['vEmail'];
    $vFullName=$_POST['vFullName'];
    $vMobileNo=$_POST['vMobileNo'];
    $vUsername=$_POST['vUsername'];
    $vPassword=$_POST['vPassword'];
    $vDateOfBirth=$_POST['vDateOfBirth'];
    $vHeight=$_POST['vHeight'];
    $vWeight=$_POST['vWeight'];
    $vPregDueDate=$_POST['vPregDueDate'];
    $vPregWeek=$_POST['vPregWeek'];
    $vPlanEndDate=$_POST['vPlanEndDate'];
    $skip=$_POST['skip'];

    $checkUserExist=$mfp->mf_query("SELECT * FROM user WHERE vMobileNo='".$vMobileNo."' AND vEmail='".$vEmail."'");
    if($mfp->mf_affected_rows()>0){
        $retArr=array();
        $retArr['status']=412;
        $retArr['message']="Your account is already register!";
        echo json_encode($retArr);
        exit;
    }else{
        $iUserId=$_POST['iUserId'];
        $insArr=array();
        if($step==1){
            $insArr['iPlanId']=$iPlanId;
            $insArr['vFirstName']=$vFirstName;
            $insArr['vMiddleName']=$vMiddleName;
            $insArr['vLastName']=$vLastName;
            $insArr['vEmail']=$vEmail;
            $insArr['vFullName']=$vFullName;
            $insArr['vMobileNo']=$vMobileNo;
            $insArr['vUsername']=$vUsername;
            $insArr['vPassword']=sha1($vPassword);
            $insArr['vPlanStatus']="Active";
            $insArr['vPlanEndDate']="";
    
            $insArr['vOtp']=rand(10000,99999);
            $insArr['vPlanStartDate']=$mfp->curTimedate();
            $insArr['dCreatedDate']=$mfp->curTimedate();
            $mfp->mf_dbinsert("user",$insArr);
            $iUserId=$mfp->mf_dbinsert_id();
    
            $retArr=array();
            $retArr['status']=200;
            $retArr['data']=$iUserId;
            echo json_encode($retArr);
            exit;
        }else{
            if($skip==0){
                $insArr['vDateOfBirth']=$mfp->date2savenew($vDateOfBirth);
                $insArr['vHeight']=$vHeight;
                $insArr['vWeight']=$vWeight;
                $insArr['vPregDueDate']=$mfp->date2savenew($vPregDueDate);
                $insArr['vPregWeek']=$vPregWeek;
        
                $mfp->mf_dbupdate("user",$insArr," WHERE iUserId=".$iUserId."");
            }
            $retArr=array();
            $retArr['status']=200;
            $retArr['message']="New user has been added successfully.";
            echo json_encode($retArr);
            exit;
        }
    }
}else if($_POST['action'] == "UserGenerateCode"){
    $sqlGetCode=$mfp->mf_query("SELECT vUsername FROM user  WHERE vUsername!='admin' ORDER BY iUserId  DESC LIMIT 1");
    if($mfp->mf_affected_rows()>0){
        $row=$mfp->mf_fetch_array($sqlGetCode);
        $explodeString=str_split($row['vUsername'],5);
        $numberInc=(int)$explodeString;
        $number=str_pad($numberInc+1, 4, "0", STR_PAD_LEFT );
        $string=$explodeString[0]."".$number;
    }else{
        $string='GTGSA0001';
    }

    $returnArr=array();
    $returnArr['status']=200;
    $returnArr['data']=$string; 
    echo json_encode($returnArr);
    exit();
}