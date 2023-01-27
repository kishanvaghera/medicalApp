<?php

include ("includes/connect.php");

if($_POST['action']=="getMusicCategory"){
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
}else if($_POST['action']=="addMusicCategory"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $iMusicCategoryId=$_POST['iMusicCategoryId'];
    $vMusicCategoryName=$_POST['vMusicCategoryName'];
    
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
    $iMusicId=$_POST['iMusicId'];
    $iMusicCategoryId=$_POST['iMusicCategoryId'];
    $tMusicFile=$_POST['tMusicFile'];
    $tMusicDesc=$_POST['tMusicDesc'];
    $vMusicName=$_POST['vMusicName'];

    if($iMusicId>0){
        $insArr=array();
        $insArr['iMusicCategoryId']=$iMusicCategoryId;
        $insArr['tMusicFile']=$mfp->file_decode($tMusicFile,'uploads/music/',$iMusicId);
        $insArr['tMusicDesc']=$tMusicDesc;
        $insArr['vMusicName']=$vMusicName;
        $insArr['dUpdatedDate']=$mfp->curTimedate();
        $insArr['iUpdatedBy']=$LogedData;
        $mfp->mf_dbupdate("music",$insArr," WHERE iMusicId=".$iMusicId."");
    }else{
        $insArr=array();
        $insArr['iMusicCategoryId']=$iMusicCategoryId;

        $insArr['tMusicFile']=$mfp->file_decode($tMusicFile,'uploads/music/',$iMusicId);
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
    $sql=$mfp->mf_query("SELECT m.iMusicId,m.iMusicCategoryId,m.vMusicName,m.tMusicFile,m.tMusicDesc,mc.vMusicCategoryName
                        FROM music as m
                            LEFT JOIN music_category as mc ON mc.iMusicCategoryId=m.iMusicCategoryId
                        WHERE m.eStatus='y' ".$where."");
    if($mfp->mf_affected_rows()>0){
        while($row=$mfp->mf_fetch_array($sql)){
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