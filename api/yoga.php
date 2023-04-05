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
                    $subRows['SubCategoryList']=array();
                    $sqlSubSubCat=$mfp->mf_query("SELECT iSubSubYogaCatId,vSubSubYogaName FROM sub_sub_yoga_cat WHERE iSubYogaCatId=".$subRows['iSubYogaCatId']." AND eStatus='y'");
                    if($mfp->mf_affected_rows()>0){
                        while($subSubRows=$mfp->mf_fetch_array($sqlSubSubCat)){
                            $subRows['SubCategoryList'][]=$subSubRows;
                        }
                    }
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
    $isDefault280Sub=$_POST['isDefault280Sub']?1:0;
    
    if($iYogaCatId>0){
        $updArr=array();
        $updArr['vYogaCategoryName']=$vYogaCategoryName;
        $updArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbupdate("yoga_category",$updArr," WHERE iYogaCatId=".$iYogaCatId."");
    }else{
        $insArr=array();
        $insArr['vYogaCategoryName']=$vYogaCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $insArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbinsert("yoga_category",$insArr);
        $iYogaCatId=$mfp->mf_dbinsert_id();
    }
    
    $checkIsAdd=$mfp->mf_getValue_Qry("yoga_category","iIsSubCateAdd"," WHERE iYogaCatId=".$iYogaCatId."");
    
     if($isDefault280Sub==1 && $checkIsAdd==0){
        for ($i=1;$i<=280;$i++){
            $insSubCat=array();
            $insSubCat['vSubYogaName']=$i;
            $insSubCat['iYogaCatId']=$iYogaCatId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $mfp->mf_dbinsert("sub_yoga_category",$insSubCat);
        }
        $isDefault280Sub=1;
    }else{
        $isDefault280Sub=0;
    }

    $oldSubCatData=array();
    $sqlOldSubCate=$mfp->mf_query("SELECT iSubYogaCatId FROM sub_yoga_category WHERE iYogaCatId=".$iYogaCatId."  AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
            $oldSubCatData[]=$row['iSubYogaCatId'];
        }
    }
    
    
    if($isDefault280Sub==0){
        $newSubCatDataArr=array();
        if(is_array($subCategory) || $isChecked){
            foreach($subCategory as $val){
                $insSubCat=array();
                $insSubCat['vSubYogaName']=$val['vSubYogaName'];
                $insSubCat['iYogaCatId']=$iYogaCatId;
                $insSubCat['dCreatedDate']=$mfp->curTimedate();
                $insSubCat['iCreatedBy']=$LogedData;
                $iSubYogaCatId=$val['iSubYogaCatId'];
    
                $newSubCatDataArr[]=(int)$val['iSubYogaCatId'];
    
                if($isChecked){
                    if((int)$val['iSubYogaCatId']>0){
                        $mfp->mf_dbupdate("sub_yoga_category",$insSubCat," WHERE iSubYogaCatId=".(int)$val['iSubYogaCatId']."");
                    }else{
                        $mfp->mf_dbinsert("sub_yoga_category",$insSubCat);
                        $iSubYogaCatId=$mfp->mf_dbinsert_id();
                    }
                }
                
    
                if($iSubYogaCatId>0){
                    $oldSubSubCatData=array();
                    $sqlOldSubCate=$mfp->mf_query("SELECT iSubSubYogaCatId FROM sub_sub_yoga_cat WHERE iSubYogaCatId=".$iSubYogaCatId."  AND eStatus='y'");
                    if($mfp->mf_affected_rows()>0){
                        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
                            $oldSubSubCatData[]=$row['iSubSubYogaCatId'];
                        }
                    }
                    
                    $newSubSubCatDataArr=array();
                    $SubCategoryList=(array)$val['SubCategoryList'];
                    if(!empty($SubCategoryList)){
                        foreach($SubCategoryList as $subCatData){
                            $iSubSubYogaCatId=$subCatData['iSubSubYogaCatId'];
                            $vSubSubYogaName=$subCatData['vSubSubYogaName'];
                            
                            $newSubSubCatDataArr[]=(int)$iSubSubYogaCatId;
                            $insSubSubCat=array();
                            $insSubSubCat['dCreatedDate']=$mfp->curTimedate();
                            $insSubSubCat['iCreatedBy']=$LogedData;
                            if($iSubSubYogaCatId>0){
                                $insSubSubCat['vSubSubYogaName']=$vSubSubYogaName;
                                $insSubSubCat['iSubYogaCatId']=$iSubYogaCatId;
                                $mfp->mf_dbupdate("sub_sub_yoga_cat",$insSubSubCat," WHERE iSubSubYogaCatId=".(int)$val['iSubSubYogaCatId']."");
                            }else{
                                $insSubSubCat['vSubSubYogaName']=$vSubSubYogaName;
                                $insSubSubCat['iSubYogaCatId']=$iSubYogaCatId;
                                $mfp->mf_dbinsert("sub_sub_yoga_cat",$insSubSubCat);
                            }
                        }
                    }
                        
                    foreach($oldSubSubCatData as $value2){
                        if(!in_array($value2,$newSubSubCatDataArr)){
                            $updArr=array();
                            $updArr['eStatus']='d';
                            $mfp->mf_dbupdate("sub_sub_yoga_cat",$updArr," WHERE iSubSubYogaCatId=".(int)$value2."");
                        }
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
    }

    if($isDefault280Sub==1){
        $updArr=array();
        $updArr['iIsSubCateAdd']=1;
        $mfp->mf_dbupdate("yoga_category",$updArr," WHERE iYogaCatId=".$iYogaCatId."");
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
    $iSubYogaCatId=$_POST['iSubYogaCatId'];
    $tVideoLink=$_POST['tVideoLink'];
    $iSubSubYogaCatId=$_POST['iSubSubYogaCatId'];

    $insArr=array();
    $insArr['iYogaCatId']=$iYogaCatId;
    $insArr['iSubSubYogaCatId']=$iSubSubYogaCatId;
    $base64Imgs=$mfp->file_decode($tYogaFile,'uploads/yoga/',$iYogaId);
    if($base64Imgs!=""){
       $insArr['tYogaFile']=$base64Imgs;
    }
    $insArr['tYogaDesc']=$tYogaDesc;
    $insArr['vYogaName']=$vYogaName;
    $insArr['dUpdatedDate']=$mfp->curTimedate();
    $insArr['iUpdatedBy']=$LogedData;
    $insArr['iSubYogaCatId']=$iSubYogaCatId;
    $insArr['tVideoLink']=$tVideoLink;
    if($iYogaId>0){
        $mfp->mf_dbupdate("yoga",$insArr," WHERE iYogaId=".$iYogaId."");
    }else{
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
    
    if(array_key_exists('iSubYogaCatId',$_POST)){
        if($_POST['iSubYogaCatId']>0){
            $where.=" AND y.iSubYogaCatId='".$_POST['iSubYogaCatId']."' ";
        }
    }
    
     if(array_key_exists('iSubSubYogaCatId',$_POST)){
         if($_POST['iSubSubYogaCatId']>0){
            $where.=" AND y.iSubSubYogaCatId='".$_POST['iSubSubYogaCatId']."' ";
         }
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT y.iYogaId,y.iYogaCatId,y.vYogaName,y.tYogaFile,y.tYogaDesc,yc.vYogaCategoryName,yc.eIsSubCat,y.iSubYogaCatId,sc.vSubYogaName,y.tVideoLink,ssyc.iSubSubYogaCatId,ssyc.vSubSubYogaName
                        FROM yoga as y
                            LEFT JOIN yoga_category as yc ON yc.iYogaCatId=y.iYogaCatId
                            LEFT JOIN sub_yoga_category as sc ON sc.iSubYogaCatId=y.iSubYogaCatId
                            LEFT JOIN sub_sub_yoga_cat as ssyc ON ssyc.iSubSubYogaCatId=y.iSubSubYogaCatId
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
}else if($_POST['action']=="SubYogaCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iYogaCatId=$_POST['iYogaCatId'];
 
    $dataArr=array();
    $sqlSubCat=$mfp->mf_query("SELECT iSubYogaCatId,vSubYogaName,iYogaCatId FROM sub_yoga_category WHERE  iYogaCatId=".$iYogaCatId." AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($subRows=$mfp->mf_fetch_array($sqlSubCat)){
            $subRows['iSubCategoryData']=0;
            $sql=$mfp->mf_query("SELECT iSubSubYogaCatId FROM sub_sub_yoga_cat WHERE iSubYogaCatId=".$subRows['iSubYogaCatId']." AND eStatus='y'");
            if($mfp->mf_affected_rows()>0){
                $subRows['iSubCategoryData']=1;
            }
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
}else if($_POST['action']=="SubSubYogaCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iSubYogaCatId=$_POST['iSubYogaCatId'];
 
    $dataArr=array();
    $sqlSubCat=$mfp->mf_query("SELECT ssyc.iSubSubYogaCatId,ssyc.vSubSubYogaName,ssyc.iSubYogaCatId,syc.vSubYogaName,yc.iYogaCatId,yc.vYogaCategoryName 
                                    FROM sub_sub_yoga_cat as ssyc
                                    LEFT JOIN sub_yoga_category as syc ON syc.iSubYogaCatId=ssyc.iSubYogaCatId 
                                    LEFT JOIN yoga_category as yc ON yc.iYogaCatId=syc.iYogaCatId
                                WHERE ssyc.iSubYogaCatId=".$iSubYogaCatId." AND ssyc.eStatus='y'");
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
}else if($_POST['action']=="wb_getYogaCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM yoga_category WHERE eStatus='y'");
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
}
