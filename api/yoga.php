<?php

include ("includes/connect.php");

if($_POST['action']=="getYogaCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM yoga_category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['aSubCategoryList']=array();
            $sqlSubCat=$mfp->mf_query("SELECT iSubYogaCatId,vSubYogaName FROM sub_yoga_category WHERE iYogaCatId=".$row['iYogaCatId']." AND eStatus='y'");
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
}else if($_POST['action']=="addYogaCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iYogaCatId=$_POST['iYogaCatId'];
    $vYogaCategoryName=$_POST['vYogaCategoryName'];
    $subCategory=(array)$_POST['subCategory'];
    $isChecked=$_POST['isChecked'];
    
    if($iYogaCatId>0){
        $updArr=array();
        $updArr['vYogaCategoryName']=$vYogaCategoryName;
        $mfp->mf_dbupdate("yoga_category",$updArr," WHERE iYogaCatId=".$iYogaCatId."");
    }else{
        $insArr=array();
        $insArr['vYogaCategoryName']=$vYogaCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("yoga_category",$insArr);
        $iYogaCatId=$mfp->mf_dbinsert_id();
    }

    $deleteSubCategory=array();

    $oldSubCatData=array();
    $sqlOldSubCate=$mfp->mf_query("SELECT iSubYogaCatId FROM sub_yoga_category WHERE iYogaCatId=".$iYogaCatId."  AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
            $oldSubCatData[]=$row['iSubYogaCatId'];
        }
    }

    $newSubCatDataArr=array();
    if(is_array($subCategory) || $isChecked){
        foreach($subCategory as $val){
            $insSubCat=array();
            $insSubCat['vSubYogaName']=$val['vSubYogaName'];
            $insSubCat['iYogaCatId']=$iYogaCatId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $newSubCatDataArr[]=(int)$val['iSubYogaCatId'];

            if($isChecked){
                if((int)$val['iSubYogaCatId']>0){
                    $mfp->mf_dbupdate("sub_yoga_category",$insSubCat," WHERE iSubYogaCatId=".(int)$val['iSubYogaCatId']."");
                }else{
                    $mfp->mf_dbinsert("sub_yoga_category",$insSubCat);
                }
            }
        }
    }

    if(!$isChecked){
        foreach($oldSubCatData as $value){
            $updArr=array();
            $updArr['eStatus']='d';
            $mfp->mf_dbupdate("sub_yoga_category",$updArr," WHERE iSubYogaCatId=".(int)$value."");
        }
    }else{
        foreach($oldSubCatData as $value){
            if(!in_array($value,$newSubCatDataArr)){
                $updArr=array();
                $updArr['eStatus']='d';
                $mfp->mf_dbupdate("sub_yoga_category",$updArr," WHERE iSubYogaCatId=".(int)$value."");
            }
        }
    }
    
    $returArr=array();
    if($iYogaCatId>0){
        $returArr['status']=200;
        $returArr['message']="Yoga Category has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Yoga Category has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="addYogaDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iYogaId=$_POST['iDetailId'];
    $iYogaCatId=$_POST['iYogaCatId'];
    $tYogaFile=$_POST['tYogaFile'];
    $tYogaDesc=$_POST['tYogaDesc'];
    $vYogaName=$_POST['vYogaName'];

    if($iYogaId>0){
        $insArr=array();
        $insArr['iYogaCatId']=$iYogaCatId;
        $base64Imgs=$mfp->file_decode($tYogaFile,'uploads/yoga/',$iYogaId);
        if($base64Imgs!=""){
           $insArr['tYogaFile']=$base64Imgs;
        }
        $insArr['tYogaDesc']=$tYogaDesc;
        $insArr['vYogaName']=$vYogaName;
        $insArr['dUpdatedDate']=$mfp->curTimedate();
        $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("yoga",$insArr," WHERE iYogaId=".$iYogaId."");
    }else{
        $insArr=array();
        $insArr['iYogaCatId']=$iYogaCatId;

        $insArr['tYogaFile']=$mfp->file_decode($tYogaFile,'uploads/yoga/',$iYogaId);
        $insArr['tYogaDesc']=$tYogaDesc;
        $insArr['vYogaName']=$vYogaName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("yoga",$insArr);
    }

    $returArr=array();
    if($iYogaId>0){
        $returArr['status']=200;
        $returArr['message']="Yoga has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Yoga has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="YogaData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iYogaCatId=$_POST['iYogaCatId'];

    $where="";
    if($iYogaCatId>0){
        $where=" AND y.iYogaCatId='".$iYogaCatId."' ";
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT y.iYogaId,y.iYogaCatId,y.vYogaName,y.tYogaFile,y.tYogaDesc,yc.vYogaCategoryName
                        FROM yoga as y
                            LEFT JOIN yoga_category as yc ON yc.iYogaCatId=y.iYogaCatId
                        WHERE y.eStatus='y' AND yc.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tYogaFile']=$MAIN_URL."uploads/yoga/".$row['tYogaFile'];
            $dataArr[$row['iYogaCatId']][]=$row;
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