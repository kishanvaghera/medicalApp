<?php

include ("includes/connect.php");

if($_POST['action']=="getActivityCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM activity_category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $dataArr[]=$row;
        }
    }

    $rtnArr = array();
    if(!empty($dataArr)){
        $rtnArr['status']=200;
        $rtnArr['data']=$dataArr;
    }else{
        $rtnArr['status']=412;
        $rtnArr['message']="No data found!";
    }
    echo json_encode($rtnArr);
    exit;
}else if($_POST['action']=="addActivityCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iActivityCatId=$_POST['iActivityCatId'];
    $vActivitCatName=$_POST['vActivitCatName'];
    
    if($iActivityCatId>0){
        $updArr=array();
        $updArr['vActivitCatName']=$vActivitCatName;
        $mfp->mf_dbupdate("activity_category",$updArr," WHERE iActivityCatId=".$iActivityCatId."");
    }else{
        $insArr=array();
        $insArr['vActivitCatName']=$vActivitCatName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("activity_category",$insArr);
    }
    
    $returArr=array();
    if($iActivityCatId>0){
        $returArr['status']=200;
        $returArr['message']="Activity Category has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Activity Category has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="addActivityDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iActivityId=$_POST['iActivityId'];
    $iActivityCatId=$_POST['iActivityCatId'];
    $tActivityFile=$_POST['tActivityFile'];
    $tActivityDesc=$_POST['tActivityDesc'];
    $vActivityName=$_POST['vActivityName'];

    if($iActivityId>0){
        $insArr=array();
        $insArr['iActivityCatId']=$iActivityCatId;
        $insArr['tActivityFile']=$mfp->file_decode($tActivityFile,'uploads/activity/',$iActivityId);
        $insArr['tActivityDesc']=$tActivityDesc;
        $insArr['vActivityName']=$vActivityName;
        $insArr['dUpdatedDate']=$mfp->curTimedate();
        $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("activity",$insArr," WHERE iActivityId=".$iActivityId."");
    }else{
        $insArr=array();
        $insArr['iActivityCatId']=$iActivityCatId;

        $insArr['tActivityFile']=$mfp->file_decode($tActivityFile,'uploads/activity/',$iActivityId);
        $insArr['tActivityDesc']=$tActivityDesc;
        $insArr['vActivityName']=$vActivityName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("activity",$insArr);
    }

    $returArr=array();
    if($iActivityId>0){
        $returArr['status']=200;
        $returArr['message']="Activity has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Activity has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="ActivityData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iActivityCatId=$_POST['iActivityCatId'];

    $where="";
    if($iActivityCatId>0){
        $where=" AND a.iActivityCatId='".$iActivityCatId."' ";
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT a.iActivityId,a.iActivityCatId,a.vActivityName,a.tActivityFile,a.tActivityDesc,ac.vActivitCatName
                        FROM activity as a
                            LEFT JOIN activity_category as ac ON ac.iActivityCatId=a.iActivityCatId
                        WHERE a.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $dataArr[$row['iActivityCatId']][]=$row;
        }
    }

    if(!empty($dataArr)){
        $returArr['status']=200;
        $returArr['data']=$dataArr;
    }else{
        $returArr['status']=412;
        $returArr['message']="No data found!";
    }
    echo json_encode($returArr);
    exit;
}