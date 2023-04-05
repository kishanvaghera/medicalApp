<?php

include ("includes/connect.php");

if($_POST['action']=="addDiet"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iDietId=$_POST['iDietId'];
    $eDietType=$_POST['eDietType'];
    $tImageArr=$_POST['tImageArr']; 
    
    if($iDietId>0){
        $updArr=array();
        $updArr['dUpdatedDate']=$mfp->curTimedate();
        $updArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("diet",$updArr," WHERE iDietId=".$iDietId."");
    }else{
        $insArr=array();
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("diet",$insArr);
        $iDietId=$mfp->mf_dbinsert_id();
    }
    
    $oldDataImagesArr=array();
    $sqlOldImg=$mfp->mf_query("SELECT iDietImageId FROM diet_Images WHERE iDietId='".$iDietId."' AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldImg)){
            $oldDataImagesArr[]=$row['iDietImageId'];
        }
    }
    
    $newDataArr=array();
    if($iDietId>0){
        foreach($tImageArr as $value){
            $iDietImageId=0;
            if(array_key_exists("iDietImageId",$value)){
                $iDietImageId=$value['iDietImageId'];    
                $newDataArr[]=$iDietImageId;
            }
            
            if($iDietImageId>0){
                $updArr=array();
                $base64Imgs=$mfp->file_decode($value['file'],'uploads/diet/',$iDietId);
                if($base64Imgs!=""){
                    $updArr['tImage']=$base64Imgs;
                }
                $updArr['iDietId']=$iDietId;
                $updArr['dUpdatedDate']=$mfp->curTimedate();
                $updArr['iUpdatedBy']=$LogedData;
                $mfp->mf_dbupdate("diet_Images",$updArr," WHERE iDietImageId=".$iDietImageId."");
            }else{
                $insArr=array();
                $insArr['iDietId']=$iDietId;
                $base64Imgs=$mfp->file_decode($value['file'],'uploads/diet/',$iDietId);
                if($base64Imgs!=""){
                    $insArr['tImage']=$base64Imgs;
                }
                $insArr['dCreatedDate']=$mfp->curTimedate();
                $insArr['iCreatedBy']=$LogedData;
                
                $mfp->mf_dbinsert("diet_Images",$insArr);
                $iDietImageId=$mfp->mf_dbinsert_id();
            }
        }
        
    }
    foreach($oldDataImagesArr as $value){
        if(!in_array($value,$newDataArr)){
            $updArr=array();
            $updArr['eStatus']='d';
            $mfp->mf_dbupdate("diet_Images",$updArr," WHERE iDietImageId=".(int)$value."");
        }
    }
    
    $returArr=array();
    if($iDietId>0){
        $returArr['status']=200;
        $returArr['message']="Diet Data has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Diet Data has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="getDietDataList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $eDietType=$_POST['eDietType'];
    
    $dataArr=array();
    $sql=$mfp->mf_query("SELECT * FROM diet WHERE eDietType='".$eDietType."' AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tImageArr']=array();
            $sqlSub=$mfp->mf_query("SELECT iDietImageId,tImage FROM diet_Images WHERE iDietId='".$row['iDietId']."' AND eStatus='y'");
            if($mfp->mf_affected_rows()>0){
                while($SubRow=$mfp->mf_fetch_array($sqlSub)){
                    if($SubRow['tImage']!=""){
                         $SubRow['tImage']=$MAIN_URL."uploads/diet/".$SubRow['tImage'];
                    }
                    $row['tImageArr'][]=$SubRow;
                }
            }
            $dataArr[]=$row;
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
}else if($_POST['action']=="getDietDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iDietId=$_POST['iDietId'];
    
    
    $dataArr=array();
    $sql=$mfp->mf_query("SELECT * FROM diet WHERE iDietId='".$iDietId."' AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tImageArr']=array();
            $sqlSub=$mfp->mf_query("SELECT iDietImageId,tImage FROM diet_Images WHERE iDietId='".$row['iDietId']."' AND eStatus='y'");
            if($mfp->mf_affected_rows()>0){
                while($SubRow=$mfp->mf_fetch_array($sqlSub)){
                    if($SubRow['tImage']!=""){
                         $SubRow['tImage']=$MAIN_URL."uploads/diet/".$SubRow['tImage'];
                    }
                    $row['tImageArr'][]=$SubRow;
                }
            }
            $dataArr[]=$row;
        }
    }
    
    if(!empty($dataArr)){
        $returArr['status']=200;
        $returArr['data']=$dataArr[0];
    }else{
        $returArr['status']=412;
        $returArr['message']="No data found!";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="getTypeIds"){
     $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
     $iFixedId=0;
     $iMonthlyId=0;
     
    $iFixedId=$mfp->mf_getValue_Qry("diet","iDietId"," WHERE eDietType='Fixed'");
    $iMonthlyId=$mfp->mf_getValue_Qry("diet","iDietId"," WHERE eDietType='Monthly'");
     
    $returArr['status']=200;
    $returArr['data']=array("iFixedId"=>$iFixedId,"iMonthlyId"=>$iMonthlyId);
    echo json_encode($returArr);
    exit;
}