<?php
include ("includes/connect.php");

if($_POST['action']=="getCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['aSubCategoryList']=array();
            $sqlSubCat=$mfp->mf_query("SELECT iSubCategoryId,vSubCategoryName FROM sub_category WHERE iCategoryId='".$row['iCategoryId']."' AND eStatus='y'");
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
}else if($_POST['action']=="addCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iCategoryId=$_POST['iCategoryId'];
    $iCategoryName=$_POST['iCategoryName'];
    $subCategory=(array)$_POST['subCategory'];
    $isChecked=$_POST['isChecked'];
    $isDefault280Sub=$_POST['isDefault280Sub']?1:0;

    if($iCategoryId>0){
        $updArr=array();
        $updArr['iCategoryName']=$iCategoryName;
        $updArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbupdate("category",$updArr," WHERE iCategoryId=".$iCategoryId."");
    }else{
        $insArr=array();
        $insArr['iCategoryName']=$iCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $insArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbinsert("category",$insArr);
        $iCategoryId=$mfp->mf_dbinsert_id();
    }
    
    $deleteSubCategory=array();

    $checkIsAdd=$mfp->mf_getValue_Qry("category","iIsSubCateAdd"," WHERE iCategoryId=".$iCategoryId."");
    
    if($isDefault280Sub==1 && $checkIsAdd==0){
        for ($i=1;$i<=280;$i++){
            $insSubCat=array();
            $insSubCat['vSubCategoryName']=$i;
            $insSubCat['iCategoryId']=$iCategoryId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $mfp->mf_dbinsert("sub_category",$insSubCat);
        }
        $isDefault280Sub=1;
    }else{
        $isDefault280Sub=0;
    }
    
    if($isDefault280Sub==0){
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
    }
        
    if($isDefault280Sub==1){
        $updArr=array();
        $updArr['iIsSubCateAdd']=1;
        $mfp->mf_dbupdate("category",$updArr," WHERE iCategoryId=".$iCategoryId."");
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
    $iDetailId=(int)$_POST['iDetailId'];
    $iCategoryId=$_POST['iCategoryId'];
    $tImage=$_POST['tImage'];
    $tText=$_POST['tText'];
    $iSubCategoryId=$_POST['iSubCategoryId'];
    $vSubjectName=$_POST['vSubjectName'];
    $tVideoLink=$_POST['tVideoLink'];
    $tMusicLink=$_POST['tMusicLink'];
    $iThemeId=$_POST['iThemeId'];
    $iSeenType=$_POST['iSeenType'];
    $iSeenVal=$_POST['iSeenVal'];

    print_r($_POST);
    exit();
    $insArr=array();

    $insArr['iCategoryId']=$iCategoryId;
    $insArr['iSubCategoryId']=$iSubCategoryId;
    $insArr['vSubjectName']=$vSubjectName;
    $insArr['tText']=$tText;
    $insArr['iThemeId']=$iThemeId;
    $insArr['iSeenVal']=$iSeenVal;
    $insArr['iSeenType']=$iSeenType;
    if($mfp->is_base64($tImage)){
        $base64Imgs=$mfp->file_decode($tImage,'uploads/category/',$iDetailId);
        if($base64Imgs!=""){
            $insArr['tImage']=$base64Imgs;
        }
    }

    if($mfp->is_base64($tVideoLink)){
        $base64Imgs=$mfp->file_decode($tVideoLink,'uploads/category/',$iDetailId);
        if($base64Imgs!=""){
            $insArr['tVideoLink']=$base64Imgs;
        }
    }

    if($mfp->is_base64($tMusicLink)){
        $base64Imgs=$mfp->file_decode($tMusicLink,'uploads/category/',$iDetailId);
        if($base64Imgs!=""){
            $insArr['tMusicLink']=$base64Imgs;
        }
    }

    $insArr['dCreatedDate']=$mfp->curTimedate();
    $insArr['iCreatedBy']=$LogedData;
 
    if($iDetailId>0){
        $mfp->mf_dbupdate("category_detail",$insArr," WHERE iDetailId=".$iDetailId."");
    }else{
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
    $sql=$mfp->mf_query("SELECT cd.iDetailId,cd.iCategoryId,ct.iCategoryName,cd.tImage,cd.tText,ct.eIsSubCat,sc.vSubCategoryName,sc.iSubCategoryId,cd.vSubjectName,cd.tVideoLink,cd.tMusicLink,cd.iThemeId,cd.iSeenType,cd.iSeenVal
                            FROM category_detail as cd
                            LEFT JOIN category as ct ON ct.iCategoryId=cd.iCategoryId
                            LEFT JOIN sub_category as sc ON sc.iSubCategoryId=cd.iSubCategoryId
                        WHERE cd.eStatus='y' AND ct.eStatus='y' ".$where." ");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tImage']=$MAIN_URL."uploads/category/".$row['tImage'];
                
            $row['SubCategoryList']=array();
            if($row['eIsSubCat']=='y'){
                $sqlSubCat=$mfp->mf_query("SELECT iSubCategoryId,vSubCategoryName,iCategoryId FROM sub_category WHERE  iCategoryId=".$row['iCategoryId']."");
                if($mfp->mf_affected_rows()>0){
                    while($subRows=$mfp->mf_fetch_array($sqlSubCat)){
                        $row['SubCategoryList'][]=$subRows;
                    }
                }
            }
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
}else if($_POST['action']=="getSubCategoryDetail"){
     $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
     $iCategoryId=$_POST['iCategoryId'];
     
    $dataArr=array();
    $sqlSubCat=$mfp->mf_query("SELECT iSubCategoryId,vSubCategoryName,iCategoryId FROM sub_category WHERE  iCategoryId=".$iCategoryId." AND eStatus='y'");
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
}else if($_POST['action']=="wb_getCategoryList"){
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
}else if($_POST['action']=="categoryMainData"){
    // print_r($_POST);
    // exit();
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iCategoryId=array_key_exists("iCategoryId",$_POST)?$_POST['iCategoryId']:"";

    $where="";
    if($iCategoryId>0){
        $where=" AND cd.iCategoryId='".$iCategoryId."' ";
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT cd.iDetailId,cd.iCategoryId,ct.iCategoryName,cd.tImage,cd.tText,ct.eIsSubCat,sc.vSubCategoryName,sc.iSubCategoryId,cd.vSubjectName,cd.tVideoLink,cd.tMusicLink,cd.iThemeId,cd.iSeenType,cd.iSeenVal
                            FROM category_detail as cd
                            LEFT JOIN category as ct ON ct.iCategoryId=cd.iCategoryId
                            LEFT JOIN sub_category as sc ON sc.iSubCategoryId=cd.iSubCategoryId
                        WHERE cd.eStatus='y' AND ct.eStatus='y' ".$where." ");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            if($row['tImage']!=""){
                $row['tImage']=$MAIN_URL."uploads/category/".$row['tImage'];
            }
            if($row['tVideoLink']!=""){
                $row['tVideoLink']=$MAIN_URL."uploads/category/".$row['tVideoLink'];
            }
            if($row['tMusicLink']!=""){
                $row['tMusicLink']=$MAIN_URL."uploads/category/".$row['tMusicLink'];
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
}