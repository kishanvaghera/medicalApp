<?php

include ("includes/connect.php");

if($_POST['action']=="getActivityCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM activity_category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['aSubCategoryList']=array();
            if($row['tImage']!=""){
                $row['tImage']=$MAIN_URL."uploads/activity/".$row['tImage'];
            }
            
            $sqlSubCat=$mfp->mf_query("SELECT iSubActivityId,vSubActivityName FROM sub_activity WHERE iActivityCatId=".$row['iActivityCatId']." AND eStatus='y'");
            if($mfp->mf_affected_rows()>0){
                while($subRows=$mfp->mf_fetch_array($sqlSubCat)){
                    $row['aSubCategoryList'][]=$subRows;
                }
            }
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
    $subCategory=(array)$_POST['subCategory'];
    $isChecked=$_POST['isChecked'];
    $tImage=$_POST['tImage'];
    
    
    if($iActivityCatId>0){
        $updArr=array();
        $updArr['vActivitCatName']=$vActivitCatName;
        $base64Imgs=$mfp->file_decode($tImage,'uploads/activity/',$iActivityCatId);
        if($base64Imgs!=""){
            $updArr['tImage']=$base64Imgs;
        }
        $updArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbupdate("activity_category",$updArr," WHERE iActivityCatId=".$iActivityCatId."");
    }else{
        $insArr=array();
        $base64Imgs=$mfp->file_decode($tImage,'uploads/activity/',$iActivityCatId);
        if($base64Imgs!=""){
            $insArr['tImage']=$base64Imgs;
        }
        $insArr['vActivitCatName']=$vActivitCatName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $insArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbinsert("activity_category",$insArr);
        $iActivityCatId=$mfp->mf_dbinsert_id();
    }

    $deleteSubCategory=array();

    $oldSubCatData=array();
    $sqlOldSubCate=$mfp->mf_query("SELECT iSubActivityId FROM sub_activity WHERE iActivityCatId=".$iActivityCatId."  AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
            $oldSubCatData[]=$row['iSubActivityId'];
        }
    }

    $newSubCatDataArr=array();
    if(is_array($subCategory) || $isChecked){
        foreach($subCategory as $val){
            $insSubCat=array();
            $insSubCat['vSubActivityName']=$val['vSubActivityName'];
            $insSubCat['iActivityCatId']=$iActivityCatId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $newSubCatDataArr[]=(int)$val['iSubActivityId'];

            if($isChecked){
                if((int)$val['iSubActivityId']>0){
                    $mfp->mf_dbupdate("sub_activity",$insSubCat," WHERE iSubActivityId=".(int)$val['iSubActivityId']."");
                }else{
                    $mfp->mf_dbinsert("sub_activity",$insSubCat);
                }
            }
        }
    }

    if(!$isChecked){
        foreach($oldSubCatData as $value){
            $updArr=array();
            $updArr['eStatus']='d';
            $mfp->mf_dbupdate("sub_activity",$updArr," WHERE iSubActivityId=".(int)$value."");
        }
    }else{
        foreach($oldSubCatData as $value){
            if(!in_array($value,$newSubCatDataArr)){
                $updArr=array();
                $updArr['eStatus']='d';
                $mfp->mf_dbupdate("sub_activity",$updArr," WHERE iSubActivityId=".(int)$value."");
            }
        }
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
    $iActivityId=$_POST['iDetailId'];
    $iActivityCatId=$_POST['iActivityCatId'];
    $tActivityFile=$_POST['tActivityFile'];
    $tActivityDesc=$_POST['tActivityDesc'];
    $vActivityName=$_POST['vActivityName'];
    $iSubActivityId=$_POST['iSubActivityId'];
    $tVideoLink=$_POST['tVideoLink'];

    $insArr=array();
    $insArr['iActivityCatId']=$iActivityCatId;
     $base64Imgs=$mfp->file_decode($tActivityFile,'uploads/activity/',$iActivityId);
    if($base64Imgs!=""){
        $insArr['tActivityFile']=$base64Imgs;
    }
    $insArr['tActivityDesc']=$tActivityDesc;
    $insArr['vActivityName']=$vActivityName;
    $insArr['iSubActivityId']=$iSubActivityId;
    $insArr['tVideoLink']=$tVideoLink;
    
    if($iActivityId>0){
    $insArr['dUpdatedDate']=$mfp->curTimedate();
    $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("activity",$insArr," WHERE iActivityId=".$iActivityId."");
    }else{
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
        $where.=" AND a.iActivityCatId='".$iActivityCatId."' ";
    }

    if(array_key_exists('iSubActivityId',$_POST)){
        if($_POST['iSubActivityId']>0){
            $where.=" AND a.iSubActivityId='".$_POST['iSubActivityId']."' ";
        }
    }
    
    $dataArr=array();
    $sql=$mfp->mf_query("SELECT a.iActivityId,a.iActivityCatId,a.vActivityName,a.tActivityFile,a.tActivityDesc,ac.vActivitCatName,sa.iSubActivityId,sa.vSubActivityName,ac.eIsSubCat,a.tVideoLink
                        FROM activity as a
                            LEFT JOIN activity_category as ac ON ac.iActivityCatId=a.iActivityCatId
                            LEFT JOIN sub_activity as sa ON sa.iSubActivityId=a.iSubActivityId
                        WHERE a.eStatus='y' AND ac.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            if($row['tActivityFile']!=""){
                $row['tActivityFile']=$MAIN_URL."uploads/activity/".$row['tActivityFile'];
            }
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
}else if($_POST['action']=="SubActivityCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iActivityCatId=$_POST['iActivityCatId'];
    
    
    $dataArr=array();
    $sqlSubCat=$mfp->mf_query("SELECT iSubActivityId,vSubActivityName,iActivityCatId FROM sub_activity WHERE  iActivityCatId=".$iActivityCatId." AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($subRows=$mfp->mf_fetch_array($sqlSubCat)){
            $dataArr[]=$subRows;
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
}else if($_POST['action']=="getActivityMonth"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMonth=$_POST['iMonth'];
    
    $dataArr=array();
    $sqlActivity=$mfp->mf_query("SELECT dActivityDate FROM user_activity WHERE  iUserId=".$LogedData." AND eStatus='y' AND Month(dActivityDate)='$iMonth'");
    if($mfp->mf_affected_rows()>0){
        while($subRows=$mfp->mf_fetch_array($sqlActivity)){
            $dataArr[]=$subRows['dActivityDate'];
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
}else if($_POST['action']=="wb_getActivityCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM activity_category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            if($row['tImage']!=""){
                $row['tImage']=$MAIN_URL."uploads/activity/".$row['tImage'];
            }
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
}