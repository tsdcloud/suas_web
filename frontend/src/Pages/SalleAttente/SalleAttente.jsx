import React, {useEffect, useState, useRef, useContext} from 'react'
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import './SalleAttente.css';
import avatar from '../../assets/avatar.jpg'
import chatbg from '../../assets/chatbg.jpg'
import { URLs, TOKEN, appid } from '../../constants/constants';
import "./SalleAttente.css"
// import AgoraRTC from "agora-rtc-sdk"
import AgoraRTC from "agora-rtc-sdk-ng"

function SalleAttente() {
    /**
     * Below are the variables and functions to implement AGORA RTC
     */
    const [messageThread, setMessageThread] = useState([]);
    const [micStatus, setMicStatus] = useState(false);
    const [handIsUp, setHandIsUp] = useState(false);
    const [speakerIsOn, setSpeakerIsOn] = useState(false);
    // const [token, setToken] = useState(localStorage.getItem('agora_token'));
    const [userJoined, setUserJoined] = useState(false);
    const [userPublish, setUserPublish] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState('');
    const [currentSpeakerDesc, setCurrentSpeakerDesc] = useState('');
    const [meetingLeft, setMeetingLeft] = useState(false);
    const [userId, setUserId] = useState(uuidv4());
    let userProfile = useRef({});
    const [time, setTime] = useState(1);
    const messageInput = useRef();
    const chatSection = useRef();
    const userInfo = useRef();
    const chatMessages = document.querySelector ("#chat-section");
    const messagesEndRef = useRef(null);
    const [user, setUser] = useState('internaute.uuid');

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    // const [rtcClient, setRtcClient] = useState(null);
    // const [audioTracks, setAudioTracks] = useState({
    //     localAudioTrack: null,
    //     remoteAudioTracks: {},
    // });

    const { id } = useParams();
    
    const token = "007eJxSYHiQ88F3lsjJS8Zn2b+y3+s7sui7VedRlcwVm87KerXKP+JRYEg0TTI1NzEwSDI3NzExMjaySDKyMDOxMEszSTU0NU2xvPFSKHVBGyNDeU4FAyMDIwMLAyMDiM8EJpnBJAuYVGNIMjCxSElJNou3TDFJiTcxNkmMTzJIM4lPSU40MTQ3szRIM0iJN+BiMDS3sLCwsLS0sAAEAAD//2Y2L9I="

    console.log(token)
    // const rtcUid = new Date().getTime().toString;

    const atelierTest = id
    const micBtn = useRef()
    const interval = useRef()

    // const atelierTest = "a5b57400b77442328b286486f4e155d9";
    // const atelierTest = "atelier1.uuid"
    // let channelName = atelierTest;
    let channelName = atelierTest.replaceAll(':', '_').replaceAll('-', '_');
    
    const [audios, setAudio] = useState({})
   

    const rtcClientRef = useRef(null);
    const audioTracksRef = useRef({
      localAudioTrack: null,
      remoteAudioTracks: {},
    });

    
    var rtcClient;

    const settings = {
        // token: localStorage.getItem("agora_token"),
        channelName: null,
        userId: null,
        appid: null,
        token: null,
        role: "host"
        // channelName: localStorage.getItem("channel_name"),
        // userId: localStorage.getItem("uid"),
        // appid: "a5b57400b77442328b286486f4e155d9",
        // token: getTokenAgora(channelName, userId)
    };

    function getCookie(name) {
        const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
                }
            }
            return null;
    }


    const initRtc = async () => {
            userProfile.current = (JSON.parse(getCookie('profile')));
            // console.log(userProfile.current);

        settings.channelName = localStorage.getItem("channel_name");
        console.log(settings.channelName);
        settings.appid = "a5b57400b77442328b286486f4e155d9";
        // settings.userId = generateUid();
        settings.userId = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        console.log(settings.userId)
        // settings.userId = +localStorage.getItem("uid");
        settings.token = await getTokenAgora(settings.channelName, settings.userId);

        rtcClientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8', role: 'host' });
        await rtcClientRef.current.join(settings.appid, settings.channelName, settings.token, settings.userId);
        audioTracksRef.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtcClientRef.current.publish(audioTracksRef.current.localAudioTrack);

        console.log(settings.userId);
        console.log(rtcClientRef.current);

        rtcClientRef.current.on('user-joined', handleUserJoined);
        rtcClientRef.current.on('user-published', handleUserPublished);
        rtcClientRef.current.on('user-left', handleUserLeft);

        console.log('Publish success!');
    };

    const muteAudio = async () => {
        console.log(audioTracksRef.current);
        if (!audioTracksRef?.current?.localAudioTrack) {
            return;
        }
        console.log("[SUAS MUTED AUDIO]");
        if(meetingLeft) return;
        setMicStatus(false);
        try {
            await audioTracksRef?.current?.localAudioTrack?.setMuted(true);
        } catch (error) {
            console.log(error);
        }finally{
            // rtcClientRef.current.leave();
        }
    };

    const unmuteAudio = async () => {
        console.log(audioTracksRef.current);
        if (!audioTracksRef?.current?.localAudioTrack) {
            return;
        }
        if(meetingLeft) return;
        console.log("[SUAS UNMUTED AUDIO]");
        setMicStatus(true);
        try {
            await audioTracksRef.current.localAudioTrack?.setMuted(false);
        } catch (error) {
            console.log(error);
        }finally{
            // rtcClientRef.current.leave();
        }
    };

    const getMessageStream = async () => {
        interval.current = setInterval(async () => {
                let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer "+TOKEN,
                'Content-Type': 'application/json'
                }
                
                let bodyContent = JSON.stringify({
                "id_atelier":atelierTest,
                "time":0
                });
                
                let response = await fetch(URLs.getMessageStream, {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList
                });

                try {

                    let data = await response.json();
                    if(response.status === 201) {
                    if(data.data.length > 0) {

                        const activeSpeaker = data.data.filter(item => item.title === "talking").sort((a, b) => a.timestamp - b.timestamp);
                        const speaker = activeSpeaker[activeSpeaker.length - 1];
                        if(speaker?.title === 'talking'){
                            // console.log(speaker.nom, speaker.role);
                            setCurrentSpeaker(speaker.nom)
                            setCurrentSpeakerDesc(speaker.message)
                        }

                        const filterMicOpen = data.data.filter(item => item.id_user === user && item.title === "updateMic")
                        .sort((a, b) => a.timestamp - b.timestamp);

                        if(
                            filterMicOpen[filterMicOpen.length - 1]?.title === "updateMic" && filterMicOpen[filterMicOpen.length - 1]?.micStatus ===true
                            ){
                            console.log("Mic update")
                            handleHandDown();
                            unmuteAudio();
                        }else{
                            muteAudio();
                        }

                        const filterHandsUp = data.data
                        .filter(item => item.id_user ===user)
                        .filter(item=>item.title ==="updateHand" && item.handStatus === true)
                        .sort((a, b) => a.timestamp - b.timestamp);
                    
                        setMessageThread(data.data.sort((a, b) => a.timestamp - b.timestamp).filter(message=> message.title === "publicMessage"));
                        scrollToLatestMessage();
                    }
                    }
                } catch (error) {
                console.log(error);
                }
        }, 2000)
    }

    const toggleHandUp=() => {
        if(handIsUp){
            handleHandDown();
        }else{
            handleHandUp();
        }
    }

    const handleHandUp = async ()=>{
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
            }
            
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  "internaute.nom",
            "image":  "internaute.image",
            "role":  "role",
            "message":  "internaute.message",
            "description":  "internaute.description",
            "micStatus":  false,
            "handStatus":  true,
            "title":  "updateHand",
            "time":  2
            });

        try {

            let response = await fetch(URLs.sendMessageStream, { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.json();
            console.log(data);

            if(response.status === 201){
                setHandIsUp(true);
            }else{
                alert(response.status, "Could not set hand up");
            }
        } catch (error) {
            console.log(error);
        }
        messageInput.value = ""
    }
    
    let handleUserJoined = async (user) => {
        console.log('USER:', user)
    }

    let handleUserPublished = async (user, mediaType) => {
        await  rtcClientRef.current.subscribe(user, mediaType);
        
        if (mediaType == "audio"){
            audioTracksRef.current.remoteAudioTracks[user.uid] = [user.audioTrack]
            user.audioTrack.play();
        }
    }

    let handleUserLeft = async (user) => {
        if(!audioTracksRef.current.remoteAudioTracks) return
        delete audioTracksRef.current.remoteAudioTracks[user?.uid]
    }

    // let leaveRoom = async ()=>{
    //     rtcClientRef.current.unpublish(audioTracksRef.current.localAudioTrack);
    // }

    const handleMicStatus =async ()=>{
        if(micStatus){
            setMicStatus(true);
            console.log("Closed");
            unmuteAudio()
        }
        else{
            handleMicOff();
            setMicStatus(false);
            console.log("Openned")
            muteAudio();
        }
    }

    const handleQuitMeeting=async ()=>{
      
        if(handIsUp){
            handleHandDown();
        }

        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
        }
        
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  "User "+userId,
            "image":  "assets/images/defaultUserIcon.png",
            "role":  "Paneliste",
            "message":  messageInput.value,
            "description":  "this is the description",
            "micStatus":  false,
            "handStatus":  false,
            "title":  "newleave",
            "time":  Math.floor(new Date().getTime() / 1000),
        });

        try {          

            let response = await fetch(URLs.sendMessageStream, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();

            if(response.status === 201){
                console.log(interval.current)
                rtcClientRef.current?.unpublish(audioTracksRef.current?.localAudioTrack);
                audioTracksRef.current.localAudioTrack.stop();
                audioTracksRef.current.localAudioTrack.close();
                rtcClientRef.current.value = null;
                clearInterval(interval.current);
                setMeetingLeft(true);
                await rtcClientRef.current.leave();
                console.log("[MEETING LEFT SUCCESSFULLY]");
            }else{
                console.log("[MEETING COULDN'T LEFT SUCCESSFULLY]");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleJoinMeeting=async ()=>{
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
            }
        
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  "User 1",
            "image":  "assets/images/defaultUserIcon.png",
            "role":  "Paneliste",
            "message":  messageInput.value,
            "description":  "this is the description",
            "micStatus":  false,
            "handStatus":  false,
            "title":  "newjoin",
            "time":  Math.floor(new Date().getTime() / 1000),
        });

        try {          

            let response = await fetch(URLs.sendMessageStream, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();

            if(response.status === 201){
                getMessageStream();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAgoraToken = async()=>{

        let headersList = {
            "Accept": "*/*",
            "Authorization": TOKEN,
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "tokenType": "rtc",
             "channel": channelName,
             "role": "publisher",
             "uid": userId,
             "expire": 86400
           });
           
           try {
               let response = await fetch(URLs.getAgoraToken, { 
                 method: "POST",
                 body: bodyContent,
                 headers: headersList
               });

               if(response.status === 201) {
                   let data = await response.json();
                   localStorage.setItem("agora_token", data.token);
                //    setToken(localStorage.getItem("agora_token"));
                handleJoinMeeting();
               }
               
           } catch (error) {
            console.log(error)
           }
           
    }

    async function getTokenAgora(channelName, uid){
        let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
        };
        
        console.log("tokenserver channelName :", channelName);
        console.log("tokenserver uid :", uid);
        
        let bodyContent = JSON.stringify({
          "tokenType": "rtc",
          "channel": channelName,
          "role": "publisher",
          "uid": ""+uid,
          "expire": 3600*4 
        });
        
        let response = await fetch(URLs.getAgoraToken, { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });
        
        let data = await response.text();
        console.log("tokenserver text: " , data);
        //console.log("tokenserver json: " , response.json());
        console.log("tokenserver token: " , JSON.parse(data)['token'])
        return JSON.parse(data)['token']
    }

    const generateUid =()=>{
        const randomNumber = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
        localStorage.setItem('uid', randomNumber)
        return randomNumber;
    }

    const handleHandDown = async ()=>{
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
            }
            
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  "internaute.nom",
            "image":  "assets/images/defaultUserIcon.png",
            "role":  "role",
            "message":  "internaute.message",
            "description":  "internaute.description",
            "micStatus":  false,
            "handStatus":  false,
            "title":  "updateHand",
            "time":  2
            });

        try {

            let response = await fetch(URLs.sendMessageStream, { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.json();
            console.log(data);

            if(response.status === 201){
                // getMessageStream();
                setHandIsUp(false);
            }else{
                console.log(response.status, "Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
        messageInput.value = ""
    }

    const handleMicOff = async ()=>{

        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
        }
            
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  "internaute.nom",
            "image":  "assets/images/defaultUserIcon.png",
            "role":  "role",
            "message":  "internaute.message",
            "description":  "internaute.description",
            "micStatus":  false,
            "handStatus":  false,
            "title":  "updateMic",
            "time":  2
        });

        try {

            let response = await fetch(URLs.sendMessageStream, { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.json();
            console.log(data);

            if(response.status === 201){
                // getMessageStream();
                setHandIsUp(false);
            }else{
                console.log(response.status, "Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
        messageInput.value = ""
    }

    const handleSpeaker=()=>{
        setSpeakerIsOn(!speakerIsOn)
    }

    const handleSendMessage=async (event)=>{
        event.preventDefault();
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
            }
        
        let bodyContent = JSON.stringify({
            "id_user":  user,
            "id_atelier":  atelierTest,
            "nom":  JSON.parse(getCookie('profile'))?.first_name+" "+JSON.parse(getCookie('profile'))?.last_name,
            "image":  "assets/images/defaultUserIcon.png",
            "role":  "userrole",
            "message":  messageInput.current.value,
            "description":  "this is the description",
            "micStatus":  false,
            "handStatus":  false,
            "title":  "publicMessage",
            "time":  new Date().getTime(),
        });

        try {
            let response = await fetch(URLs.sendMessageStream, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.json();
            console.log(data);

            if(response.status === 201){
                getMessageStream();
            }else{
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
        messageInput.current.value = ""
    }

    const formatMessageTime=(timestamp)=>{
        const date = new Date(timestamp);
        date.setHours(date.getHours() + 1);
        const hour = date.getHours();
        const minute = date.getMinutes();

        const formattedTime = `${hour}:${minute}`
        return formattedTime;
    }

    const scrollToLatestMessage = () => {
        // const element = document.getElementById('chat-section');
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const [atelier, setAtelier] = useState([]);

    useEffect(() => {
        handleJoinMeeting();
        getMessageStream();
    }, [id]);

    useEffect(()=>{
        initRtc();
        generateUid();
    }, [])


    const navigate = useNavigate();


    const fetchAtelier = async(id)=>{
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
        }
                
        let response = await fetch(URLs.allAtelier, { 
        method: "GET",
        headers: headersList
        });
        
        try {
            let data = await response.json();
            const myAtelier = data?.data.filter(item=>item.id_event === id);
            setAtelier(myAtelier);
            console.log(atelier);

        } catch (error) {
            console.log(error.message);
        }finally{

        }
        
    }

    const fetchMyAtelier = async()=>{
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer "+TOKEN,
            "Content-Type": "application/json"
        }
                
        let response = await fetch(URLs.allAtelier, { 
        method: "GET",
        headers: headersList
        });
        
        try {
            let data = await response.json();
            if(response?.status === 201){
                if(data?.data?.id_event){
                    setAtelier(data?.data.slice(0, 5))
                    console.log(data?.data)
                }
                console.log(data)
            }
        } catch (error) {
            console.log(error.message);
        }finally{

        }
        
    }

    window.addEventListener('beforeunload', function() {
            handleQuitMeeting();
            handleUserLeft();
            clearInterval(interval.current);
    });

  return (
    <>
        <div className="shadow-lg p-2 bg-white" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
        }}>
            <button className='btn btn-default' onClick={()=>{
                    // leaveRoom();
                    handleQuitMeeting();
                    handleUserLeft();
                    // window.history.back();
                    navigate(-1);
                }}>
                <i className='bx bxs-chevron-left'></i> {" Retour"}
            </button>
            <div  className='d-flex'>

                {/* Handle hand is up */}
                <div className='p-3 d-flex justify-content-center align-items-center mx-2' 
                    style={{
                    borderRadius: "50px",
                    background: "#f4f4f4",
                    width: "30px",
                    height: "30px",
                }}
                onClick={toggleHandUp}
                
                >
                    <i className={handIsUp ? 'bx bxs-hand text-success' : 'bx bxs-hand'}></i>
                </div>

                {/* Handle microphone is on */}
                <div 
                    className='p-3 d-flex justify-content-center align-items-center mx-2' 
                    style={{
                        borderRadius: "50px",
                        background: "#f4f4f4",
                        width: "30px",
                        height: "30px",
                    }}
                    onClick={handleMicStatus}
                    id='micStatusBtn'
                    ref={micBtn}
                >
                    <i className={micStatus? 'bx bxs-microphone text-success' : 'bx bxs-microphone-off'}></i>
                </div>

                {/* Handle speaker is on */}
                <div 
                    className='p-3 d-flex justify-content-center align-items-center mx-2' 
                    style={{
                        borderRadius: "50px",
                        background: "#f4f4f4",
                        width: "30px",
                        height: "30px",
                    }}
                    onClick={handleSpeaker}
                >
                    <i className={speakerIsOn?'bx bxs-volume-full text-success':'bx bxs-volume-mute'}></i>
                </div>
                <div className='p-3 d-flex justify-content-center align-items-center mx-2' style={{
                    borderRadius: "50px",
                    background: "#f4f4f4",
                    width: "30px",
                    height: "30px",
                }}>
                    <i className='bx bxs-group'></i>
                </div>

            </div>
        </div>


        {/* Active speaker */}
        <div className='' style={{height: "30vh", position: "fixed", top: 50, left:0, right:0}}>
            <div className='d-md-flex p-4 justify-content-evenly align-items-center'>
                <div className='d-flex justify-content-center flex-column align-items-center'>

                    <div className='col-12 col-md-4 d-flex flex-direction-column justify-content-center align-items-center'>
                        <img src={avatar} alt="" style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50px',
                            objectFit: 'cover',
                            border:'3px solid rgb(121, 223, 67)'
                        }}/>
                    </div>
                    <div className='text-center text-sm-right mt-2'>
                        <h6>{currentSpeaker}</h6>
                    </div>
                </div>
                <div>
                    <p className='col-12 text-center'>
                        {currentSpeakerDesc}
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white py-5" 
                ref={chatSection} 
                id='chat-section'
                style={{
                    height: "50vh",
                    overflowY:"auto", 
                    overflowX:'hidden', 
                    position: "fixed", 
                    bottom: 50, left:0, right:0,
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.63), rgba(0,0,0,0.1)), url(${chatbg})`,
                    backgroundSize: "contain"
                }}
        >
            {
                messageThread.length < 0?
                    (<div className="row px-5">
                        <div className='card p-2 text-center text-white' style={{background: 'rgba(0,0,0,0.3)'}}>
                            No message found
                        </div>
                    </div>)
                :
                messageThread.map((item) =>(
                    item.id_user == 'internaute.uuid' ?
                    <div className="row p-3" key={item.uuid}>
                        <div className="col-10">
                            <div className="card p-2">
                                <div className="d-flex justify-content-end">
                                    <small className='text-right text-secondary'>{item.nom}</small>
                                </div>
                                <div>
                                    {item.message}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <small className='text-right'>{formatMessageTime(item.time)}</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <img className="photo" src={avatar} style={{objectFit:"cover"}}/>
                        </div>
                    </div>
                    :
                    (<div className="row p-3 mb-2" key={item.uuid}>
                        <div className="col-2">
                            <img className="photo" src={avatar} style={{objectFit:"cover"}}/>
                        </div>
                        <div className="col-10">
                            <div className="card p-2">
                                <div className="d-flex justify-content-end">
                                    <small className='text-right text-secondary'>{item.nom}</small>
                                </div>
                                <div>
                                    {item.message}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <small className='text-right'>{formatMessageTime(item.time)}</small>
                                </div>
                            </div>
                        </div>
                        <div ref={messagesEndRef} />
                    </div>)
                ))
                
            }
        </div>

        <div className='bg-white' style={{
            position: 'fixed',
            bottom: "0",
            left: "0",
            right: "0",
        }}>
            <form onSubmit={handleSendMessage}>
                <div className='p-3 d-flex justify-content-evenly align-items-center' style={{boxShadow: "10px 5px 15px rgba(0,0,0,0.1)"}}>
                    <input 
                    type="text" 
                    name="" 
                    id="" 
                    className='p-sm-2 p-2 col-10 mr-3' 
                    placeholder='Tapez votre message' 
                    style={{
                            border: "None",
                            borderRadius: "50px",
                            background: "#f4f4f4",
                        }}
                        ref={messageInput}
                    />
                    <button type='submit' className='btn btn-default'>
                        <i className='bx bxs-send' style={{fontSize: "30px"}}></i>
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default SalleAttente