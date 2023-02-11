<?php

include ("includes/connect.php");

if($_POST['action']=="getCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['aSubCategoryList']=array();
            $sqlSubCat=$mfp->mf_query("SELECT iSubCategoryId,vSubCategoryName FROM sub_category WHERE iCategoryId=".$row['iCategoryId']." AND eStatus='y'");
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
}if($_POST['action']=="addCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iCategoryId=$_POST['iCategoryId'];
    $iCategoryName=$_POST['iCategoryName'];
    $subCategory=(array)$_POST['subCategory'];
    $isChecked=$_POST['isChecked'];
    
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
        $iCategoryId=$mfp->mf_dbinsert_id();
    }
    
    $deleteSubCategory=array();

    $oldSubCatData=array();
    $sqlOldSubCate=$mfp->mf_query("SELECT iSubCategoryId FROM sub_category WHERE iCategoryId=".$iCategoryId."  AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
            $oldSubCatData[]=$row['iSubCategoryId'];
        }
    }

    $newSubCatDataArr=array();
    if(is_array($subCategory) || $isChecked){
        foreach($subCategory as $val){
            $insSubCat=array();
            $insSubCat['vSubCategoryName']=$val['vSubCategoryName'];
            $insSubCat['iCategoryId']=$iCategoryId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $newSubCatDataArr[]=(int)$val['iSubCategoryId'];

            if($isChecked){
                if((int)$val['iSubCategoryId']>0){
                    $mfp->mf_dbupdate("sub_category",$insSubCat," WHERE iSubCategoryId=".(int)$val['iSubCategoryId']."");
                }else{
                    $mfp->mf_dbinsert("sub_category",$insSubCat);
                }
            }
        }
    }


    if(!$isChecked){
        foreach($oldSubCatData as $value){
            $updArr=array();
            $updArr['eStatus']='d';
            $mfp->mf_dbupdate("sub_category",$updArr," WHERE iSubCategoryId=".(int)$value."");
        }
    }else{
        foreach($oldSubCatData as $value){
            if(!in_array($value,$newSubCatDataArr)){
                $updArr=array();
                $updArr['eStatus']='d';
                $mfp->mf_dbupdate("sub_category",$updArr," WHERE iSubCategoryId=".(int)$value."");
            }
        }
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
}if($_POST['action']=="addCategoryDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iDetailId=(int)$_POST['iDetailId'];
    $iCategoryId=$_POST['iCategoryId'];
    $tImage=$_POST['tImage'];
    $tText=$_POST['tText'];


    if($iDetailId>0){
        $insArr=array();
        $insArr['iCategoryId']=$iCategoryId;
        $base64Imgs=$mfp->file_decode($tImage,'uploads/category/',$iDetailId);
        if($base64Imgs!=""){
            $insArr['tImage']=$base64Imgs;
        }
        $insArr['tText']=$tText;
        $mfp->mf_dbupdate("category_detail",$insArr," WHERE iDetailId=".$iDetailId."");
    }else{
        $insArr=array();
        $insArr['iCategoryId']=$iCategoryId;
        $base64Imgs=$mfp->file_decode($tImage,'uploads/category/',$iDetailId);
        if($base64Imgs!=""){
            $insArr['tImage']=$base64Imgs;
        }
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
                        WHERE cd.eStatus='y' AND ct.eStatus='y' ".$where." ");
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