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
        $mfp->mf_dbupdate("music_category",$updArr," WHERE iMusicCategoryId=".$iMusicCategoryId."");
    }else{
        $insArr=array();
        $insArr['vMusicCategoryName']=$vMusicCategoryName;
        $insArr['dCreatedDate']=$mfp->curTimedate();
        $insArr['iCreatedBy']=$LogedData;
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
    $tMusicImage=$_POST['tMusicImage'];
    $tMusicDesc=$_POST['tMusicDesc'];
    $vMusicName=$_POST['vMusicName'];

    if($iMusicId>0){
        $insArr=array();
        $insArr['iMusicCategoryId']=$iMusicCategoryId;
        $base64Imgs=$mfp->file_decode($tMusicImage,'uploads/music/',$iMusicId);
        if($base64Imgs!=""){
            $insArr['tMusicImage']=$base64Imgs;
        }
        $insArr['tMusicDesc']=$tMusicDesc;
        $insArr['vMusicName']=$vMusicName;
        $insArr['dUpdatedDate']=$mfp->curTimedate();
        $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("music",$insArr," WHERE iMusicId=".$iMusicId."");
    }else{
        $insArr=array();
        $insArr['iMusicCategoryId']=$iMusicCategoryId;

        $insArr['tMusicImage']=$mfp->file_decode($tMusicImage,'uploads/music/',$iMusicId);
        $insArr['tMusicDesc']=$tMusicDesc;
        $insArr['vMusicName']=$vMusicName;
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
        $where=" AND m.iMusicCategoryId='".$iMusicCategoryId."' ";
    }

    $dataArr=array();
    $sql=$mfp->mf_query("SELECT m.iMusicId,m.iMusicCategoryId,m.vMusicName,m.tMusicFile,m.tMusicDesc,mc.vMusicCategoryName,m.tMusicImage
                        FROM music as m
                            LEFT JOIN music_category as mc ON mc.iMusicCategoryId=m.iMusicCategoryId
                        WHERE m.eStatus='y' AND mc.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
            $row['tMusicImage']=$MAIN_URL."uploads/music/".$row['tMusicImage'];
            $row['tMusicFile']=$MAIN_URL."uploads/music/".$row['tMusicFile'];
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
}