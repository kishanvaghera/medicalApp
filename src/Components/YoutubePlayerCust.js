import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import YoutubePlayer from "react-native-youtube-iframe";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const YoutubePlayerCust = (props) => {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);


    const getVideoId=(url)=>{
        if(url && url!=""){
            url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : "";
        }else{
            return "";
        }
    }

    const videoId=getVideoId(props.url);

  return (
    videoId==""?"":
    <YoutubePlayer
        height={props.height?props.height:220}
        width={props.width?props.width:wp('100%')}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
    />
  )
}

export default YoutubePlayerCust