<?php

include ("includes/connect.php");

if($_POST['action']=="getHomePageData"){
    $LogedData=$mfp->LoginCheck($_POST['vAuthToken']);
    $day=$_POST['day'];
    $sql=$mfp->mf_query("SELECT cd.iThemeId,cd.tImage,cd.tText
                            FROM category_detail as cd  
                            LEFT JOIN category as c ON c.iCategoryId=cd.iCategoryId
                            WHERE cd.eStatus='y' AND cd.iSeenType=3 AND cd.iSeenVal=$day 
                        ");
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