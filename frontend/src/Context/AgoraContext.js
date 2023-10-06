import React, { createContext, useState, useEffect } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng"

const AgoraContext = createContext();

const AgoraProvider = ({ children }) => {

  const [rtcClient, setRtcClient] = useState({});
  const [audioTracks, setAudioTracks] = useState(
    {
      localAudioTrack: null,
      remoteAudioTracks: {},
    }
  );

  const [localTrackState, setLocalTrackState] = useState(
    {
      audioTrackMuted: false
    }
  );

  useEffect(()=>{
    async function initAgora(){
      // setRtcClient( ...rtcClient, );
      console.log(rtcClient);
    }

    initAgora();
  },[])

  return (
    <AgoraContext.Provider value={{ rtcClient, setRtcClient, localTrackState, setLocalTrackState, audioTracks, setAudioTracks }}>
      {children}
    </AgoraContext.Provider>
  );
};

export { AgoraProvider };
export default AgoraContext;