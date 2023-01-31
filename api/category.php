<?php

include ("includes/connect.php");

if($_POST['action']=="getCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM category WHERE eStatus='y'");
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
}else if($_POST['action']=="addCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iCategoryId=$_POST['iCategoryId'];
    $iCategoryName=$_POST['iCategoryName'];
    
    if($iCategoryId>0){
        $updArr=array();
        $updArr['iCategoryName']=$iCategoryName;
        $mfp->mf_dbupdate("category",$updArr," WHERE iCategoryId=".$iCategoryId."");
    }else{
        $insArr=array();
        $insArr['iCategoryName']=$iCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("category",$insArr);
    }
    
    $returArr=array();
    if($iCategoryId>0){
        $returArr['status']=200;
        $returArr['message']="Category has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Category has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="addCategoryDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iDetailId=$_POST['iDetailId'];
    $iCategoryId=$_POST['iCategoryId'];
    $tImage=$_POST['tImage'];
    $tText=$_POST['tText'];

    if($iDetailId>0){
        $insArr=array();
        $insArr['iCategoryId']=$iCategoryId;
        $insArr['tImage']=$mfp->file_decode($tImage,'uploads/category/',$iDetailId);
        $insArr['tText']=$tText;
        $mfp->mf_dbupdate("category_detail",$insArr," WHERE iDetailId=".$iDetailId."");
    }else{
        $insArr=array();
        $insArr['iCategoryId']=$iCategoryId;

        $insArr['tImage']=$mfp->file_decode($tImage,'uploads/category/',$iDetailId);
        $insArr['tText']=$tText;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("category_detail",$insArr);
    }

    $returArr=array();
    if($iDetailId>0){
        $returArr['status']=200;
        $returArr['message']="Category sub data has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Category sub data has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="categoryViseData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iCategoryId=$_POST['iCategoryId'];

    $where="";
    if($iCategoryId>0){
        $where=" AND cd.iCategoryId='".$iCategoryId."' ";
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT cd.iDetailId,cd.iCategoryId,ct.iCategoryName,cd.tImage,cd.tText
                            FROM category_detail as cd
                            LEFT JOIN category as ct ON ct.iCategoryId=cd.iCategoryId
                        WHERE cd.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tImage']=$MAIN_URL."uploads/category/".$row['tImage'];
            $dataArr[$row['iCategoryId']][]=$row;
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