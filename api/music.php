<?php

include ("includes/connect.php");

if($_POST['action']=="getMusicCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM music_category WHERE eStatus='y'");
    $dataArr=array();
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['aSubCategoryList']=array();
            $sqlSubCat=$mfp->mf_query("SELECT iSubMusicCatId,vSubMusicCatName FROM sub_music_category WHERE iMusicCategoryId=".$row['iMusicCategoryId']." AND eStatus='y'");
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
}else if($_POST['action']=="addMusicCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMusicCategoryId=$_POST['iMusicCategoryId'];
    $vMusicCategoryName=$_POST['vMusicCategoryName'];
    $subCategory=(array)$_POST['subCategory'];
    $isChecked=$_POST['isChecked'];
    
    if($iMusicCategoryId>0){
        $updArr=array();
        $updArr['vMusicCategoryName']=$vMusicCategoryName;
        $updArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbupdate("music_category",$updArr," WHERE iMusicCategoryId=".$iMusicCategoryId."");
    }else{
        $insArr=array();
        $insArr['vMusicCategoryName']=$vMusicCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $insArr['eIsSubCat']=$isChecked?"y":"n";
        $mfp->mf_dbinsert("music_category",$insArr);
        $iMusicCategoryId=$mfp->mf_dbinsert_id();
    }

    $deleteSubCategory=array();

    $oldSubCatData=array();
    $sqlOldSubCate=$mfp->mf_query("SELECT iSubMusicCatId FROM sub_music_category WHERE iMusicCategoryId=".$iMusicCategoryId."  AND eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sqlOldSubCate)){
            $oldSubCatData[]=$row['iSubMusicCatId'];
        }
    }

    $newSubCatDataArr=array();
    if(is_array($subCategory) || $isChecked){
        foreach($subCategory as $val){
            $insSubCat=array();
            $insSubCat['vSubMusicCatName']=$val['vSubMusicCatName'];
            $insSubCat['iMusicCategoryId']=$iMusicCategoryId;
            $insSubCat['dCreatedDate']=$mfp->curTimedate();
            $insSubCat['iCreatedBy']=$LogedData;

            $newSubCatDataArr[]=(int)$val['iSubMusicCatId'];

            if($isChecked){
                if((int)$val['iSubMusicCatId']>0){
                    $mfp->mf_dbupdate("sub_music_category",$insSubCat," WHERE iSubMusicCatId=".(int)$val['iSubMusicCatId']."");
                }else{
                    $mfp->mf_dbinsert("sub_music_category",$insSubCat);
                }
            }
        }
    }

    if(!$isChecked){
        foreach($oldSubCatData as $value){
            $updArr=array();
            $updArr['eStatus']='d';
            $mfp->mf_dbupdate("sub_music_category",$updArr," WHERE iSubMusicCatId=".(int)$value."");
        }
    }else{
        foreach($oldSubCatData as $value){
            if(!in_array($value,$newSubCatDataArr)){
                $updArr=array();
                $updArr['eStatus']='d';
                $mfp->mf_dbupdate("sub_music_category",$updArr," WHERE iSubMusicCatId=".(int)$value."");
            }
        }
    }
    
    $returArr=array();
    if($iMusicCategoryId>0){
        $returArr['status']=200;
        $returArr['message']="Music Category has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Music Category has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="addmusicDetail"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMusicId=$_POST['iDetailId'];
    $iMusicCategoryId=$_POST['iMusicCategoryId'];
    $tMusicDesc=$_POST['tMusicDesc'];
    // $vMusicName=$_POST['vMusicName'];
    $iSubMusicCatId=$_POST['iSubMusicCatId'];
    $tVideoLink=array_key_exists("tVideoLink",$_POST)?$_POST['tVideoLink']:"";
    $tMusicImage=array_key_exists("tMusicImage",$_POST)?$_POST['tMusicImage']:"";
    $tMusicFile=array_key_exists("tMusicFile",$_POST)?$_POST['tMusicFile']:"";
    
    $insArr=array();
    if($tMusicImage!="" && $mfp->is_base64($tMusicImage)){
        $base64Imgs=$mfp->file_decode($tMusicImage,'uploads/music/',$iMusicId);
        if($base64Imgs!=""){
            $insArr['tMusicImage']=$base64Imgs;
        }
    }
   
    if($tVideoLink!="" && $mfp->is_base64($tVideoLink)){
        $base64Imgs=$mfp->file_decode($tVideoLink,'uploads/music/',$iMusicId);
        if($base64Imgs!=""){
            $insArr['tVideoLink']=$base64Imgs;
        }
    }

    if($tMusicFile!="" && $mfp->is_base64($tMusicFile)){
        $base64Imgs=$mfp->file_decode($tMusicFile,'uploads/music/',$iMusicId);
        if($base64Imgs!=""){
            $insArr['tMusicFile']=$base64Imgs;
        }
    }

    $insArr['tMusicDesc']=$tMusicDesc;
    // $insArr['vMusicName']=$vMusicName;
    $insArr['iMusicCategoryId']=$iMusicCategoryId;
    $insArr['iSubMusicCatId']=$iSubMusicCatId;

    if($iMusicId>0){
        $insArr['dUpdatedDate']=$mfp->curTimedate();
        $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("music",$insArr," WHERE iMusicId=".$iMusicId."");
    }else{
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
        $mfp->mf_dbinsert("music",$insArr);
    }

    $returArr=array();
    if($iMusicId>0){
        $returArr['status']=200;
        $returArr['message']="Music has been updated successfully.";
    }else{
        $returArr['status']=200;
        $returArr['message']="Music has been added successfully.";
    }
    echo json_encode($returArr);
    exit;
}else if($_POST['action']=="MusicData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMusicCategoryId=$_POST['iMusicCategoryId'];

    $where="";
    if($iMusicCategoryId>0){
        $where.=" AND m.iMusicCategoryId='".$iMusicCategoryId."' ";
    }
    
     if(array_key_exists('iSubMusicCatId',$_POST)){
        if($_POST['iSubMusicCatId']>0){
            $where.=" AND m.iSubMusicCatId='".$_POST['iSubMusicCatId']."' ";
        }
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT m.iMusicId,m.iMusicCategoryId,m.vMusicName,m.tMusicFile,m.tMusicDesc,mc.vMusicCategoryName,m.tMusicImage,smc.iSubMusicCatId,smc.vSubMusicCatName,mc.eIsSubCat,m.tVideoLink
                        FROM music as m
                            LEFT JOIN music_category as mc ON mc.iMusicCategoryId=m.iMusicCategoryId
                            LEFT JOIN sub_music_category as smc ON smc.iSubMusicCatId=m.iSubMusicCatId
                        WHERE m.eStatus='y' AND mc.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            if($row['tMusicImage']!=""){
                $row['tMusicImage']=$MAIN_URL."uploads/music/".$row['tMusicImage'];
            }
            if($row['tMusicFile']!=""){
                $row['tMusicFile']=$MAIN_URL."uploads/music/".$row['tMusicFile'];
            }
            if($row['tVideoLink']!=""){
                $row['tVideoLink']=$MAIN_URL."uploads/music/".$row['tVideoLink'];
            }

            $dataArr[$row['iMusicCategoryId']][]=$row;
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
}else if($_POST['action']=="SubMusicCategoryList"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMusicCategoryId=$_POST['iMusicCategoryId'];
    
    $dataArr=array();
    $sqlSubCat=$mfp->mf_query("SELECT smc.iSubMusicCatId,smc.vSubMusicCatName,smc.iMusicCategoryId,mc.vMusicCategoryName,m.iMusicId,m.tMusicImage,m.tVideoLink,m.tMusicDesc
                                    FROM sub_music_category as smc
                                    LEFT JOIN music_category as mc ON mc.iMusicCategoryId=smc.iMusicCategoryId
                                    LEFT JOIN music as m ON m.iSubMusicCatId=smc.iSubMusicCatId AND m.eStatus='y'
                                    WHERE  smc.iMusicCategoryId=".$iMusicCategoryId." AND smc.eStatus='y'");
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
}else if($_POST['action']=="wb_getMusicCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $sql=$mfp->mf_query("SELECT * FROM music_category WHERE eStatus='y'");
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
}else if($_POST['action']=="GetMainMusicData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT m.iMusicId,m.iMusicCategoryId,m.vMusicName,m.tMusicFile,m.tMusicDesc,mc.vMusicCategoryName,m.tMusicImage,smc.iSubMusicCatId,smc.vSubMusicCatName,mc.eIsSubCat,m.tVideoLink
                        FROM music as m
                            LEFT JOIN music_category as mc ON mc.iMusicCategoryId=m.iMusicCategoryId
                            LEFT JOIN sub_music_category as smc ON smc.iSubMusicCatId=m.iSubMusicCatId
                        WHERE m.eStatus='y' AND mc.eStatus='y'");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            if($row['tMusicImage']!=""){
                $row['tMusicImage']=$MAIN_URL."uploads/music/".$row['tMusicImage'];
            }
            if($row['tVideoLink']!=""){
                $row['tVideoLink']=$MAIN_URL."uploads/music/".$row['tVideoLink'];
            }
            if($row['tMusicFile']!=""){
                $row['tMusicFile']=$MAIN_URL."uploads/music/".$row['tMusicFile'];
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