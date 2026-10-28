'use client';
import React,{forwardRef,useEffect,useImperativeHandle,useRef,useState} from 'react';
import {Play,Pause,RotateCcw,RotateCw,Repeat2,Volume2,Headphones,RefreshCw,SkipBack,SkipForward,Link2} from 'lucide-react';
import type {Track} from './catalog';
import {audioTransport,mediaTime,youtubeTransport,Transport,YouTubePlayer} from './playback';
import {loadYouTubeAPI} from './youtube-api';

export type TrackPlayerHandle={seekTo:(seconds:number,play?:boolean)=>void;currentTime:()=>number};
type Props={track:Track;onPrevious?:()=>void;onNext?:()=>void;onMark:(position:'start'|'end',time:string)=>void;onShare:()=>void};
const playerError=(code:number)=>code===100?'这条视频已被移除或设为私享。':code===101||code===150?'作者未开放此视频的站内嵌入播放。':code===153?'YouTube 未能识别播放页面，请刷新后重试。':'YouTube 暂时无法播放这条视频，请重试或切换其他作品。';

const TrackPlayer=forwardRef<TrackPlayerHandle,Props>(function TrackPlayer({track,onPrevious,onNext,onMark,onShare},ref){
 const mount=useRef<HTMLDivElement>(null);const audio=useRef<HTMLAudioElement>(null);const transport=useRef<Transport|null>(null);const loopRef=useRef(false);
 const [ready,setReady]=useState(false);const [playing,setPlaying]=useState(false);const [buffering,setBuffering]=useState(false);const [time,setTime]=useState(0);const [duration,setDuration]=useState(0);const [rates,setRates]=useState<number[]>([1]);const [speed,setSpeed]=useState(1);const [volume,setVolume]=useState(80);const [loop,setLoop]=useState(false);const [error,setError]=useState('');const [hint,setHint]=useState('');const [retry,setRetry]=useState(0);
 const supported=!!(track.youtube||track.audio);const step=track.kind==='music'?10:1;
 const seekTo=(seconds:number)=>{const p=transport.current;if(!p||!ready||error)return;setTime(p.seek(seconds));};
 useImperativeHandle(ref,()=>({seekTo:(seconds,play=false)=>{seekTo(seconds);if(play&&ready&&!error)void Promise.resolve(transport.current?.play()).catch(()=>setHint('请点击播放按钮继续试听。'));},currentTime:()=>transport.current?.time()||0}));
 useEffect(()=>{loopRef.current=loop;},[loop]);
 useEffect(()=>{
  let cancelled=false;let yt:YouTubePlayer|undefined;let timer:ReturnType<typeof setInterval>|undefined;
  setReady(false);setPlaying(false);setBuffering(false);setTime(0);setDuration(0);setRates([1]);setSpeed(1);setVolume(80);setError('');setHint('');transport.current=null;
  if(!supported)return;
  const wait=setTimeout(()=>{if(!cancelled)setError('播放器载入较慢，请检查网络后重试。');},25000);
  const fail=(message:string)=>{clearTimeout(wait);if(!cancelled){setError(message);setPlaying(false);setBuffering(false);}};
  const sync=()=>{const p=transport.current;if(cancelled||!p)return;setDuration(p.duration());setTime(p.time());setSpeed(p.speed());const available=p.rates();setRates(available.length?available:[1]);};
  const loaded=()=>{clearTimeout(wait);if(cancelled)return;setReady(true);setError('');transport.current?.volume(80);sync();};
  const ended=()=>{if(cancelled)return;if(loopRef.current){transport.current?.seek(0);void Promise.resolve(transport.current?.play()).catch(()=>setHint('请点击播放按钮继续试听。'));}else setPlaying(false);};
  if(track.youtube){
   void loadYouTubeAPI().then(api=>{
    if(cancelled||!mount.current)return;
    const element=document.createElement('div');mount.current.appendChild(element);
    yt=new api.Player(element,{videoId:track.youtube!,width:'100%',height:'100%',playerVars:{playsinline:1,rel:0,controls:1,origin:window.location.origin,start:track.youtubeStart||0,...(track.youtubeEnd?{end:track.youtubeEnd}:{})},events:{
     onReady:e=>{if(cancelled)return;transport.current=youtubeTransport(e.target,track);const frame=e.target.getIframe();frame.title=`${track.title} · YouTube 播放器`;frame.setAttribute('allow','autoplay; encrypted-media; picture-in-picture; fullscreen');frame.referrerPolicy='strict-origin-when-cross-origin';loaded();},
     onStateChange:e=>{if(cancelled)return;setPlaying(e.data===1);setBuffering(e.data===3);sync();if(e.data===0)ended();},
     onPlaybackRateChange:()=>{if(!cancelled)sync();},onError:e=>fail(playerError(e.data)),onAutoplayBlocked:()=>{if(!cancelled){setPlaying(false);setHint('浏览器暂停了自动播放，请点击播放器中的播放按钮。');}}
    }});
    timer=setInterval(()=>{sync();const p=transport.current;if(track.youtubeEnd&&p&&p.duration()>0&&p.time()>=p.duration()-0.08){p.pause();ended();}},250);
   }).catch(e=>fail(e instanceof Error?e.message:'播放器载入失败，请重试。'));
  }else if(audio.current){
   const element=audio.current;transport.current=audioTransport(element);
   const onPlay=()=>{setPlaying(true);setBuffering(false);setHint('');};const onPause=()=>setPlaying(false);const onWait=()=>setBuffering(true);const onCanPlay=()=>setBuffering(false);const onError=()=>fail('音频暂时无法载入，来源可能失效或当前网络无法访问。');
   const listeners:[string,EventListener][]=[['loadedmetadata',loaded],['durationchange',sync],['timeupdate',sync],['ratechange',sync],['play',onPlay],['pause',onPause],['ended',ended],['waiting',onWait],['canplay',onCanPlay],['error',onError]];
   for(const [event,fn] of listeners)element.addEventListener(event,fn);
   element.src=track.audio!;element.load();
   return()=>{cancelled=true;clearTimeout(wait);for(const [event,fn] of listeners)element.removeEventListener(event,fn);element.pause();element.removeAttribute('src');element.load();transport.current=null;};
  }
  return()=>{cancelled=true;clearTimeout(wait);if(timer)clearInterval(timer);yt?.destroy();if(mount.current)mount.current.innerHTML='';transport.current=null;};
 },[track.id,track.youtube,track.audio,track.youtubeStart,track.youtubeEnd,retry,supported]);
 const toggle=()=>{const p=transport.current;if(!p)return;setHint('');if(playing){p.pause();return;}if(p.duration()>0&&p.time()>=p.duration()-0.1)p.seek(0);void Promise.resolve(p.play()).catch(()=>setHint('浏览器未允许播放，请点击音频或视频上的播放按钮后重试。'));};
 const disabled=!ready||!!error;
 return <section className="sound-player" aria-label="站内试听播放器">
  <div className="studio-topline"><span><i/>{track.youtube?'YOUTUBE · 站内播放':'AUDIO · 站内试听'}</span><button className="text-button" onClick={onShare}><Link2 size={13}/>复制播放页链接</button></div>
  {track.youtube?<div className="youtube-stage" ref={mount}/>:<div className={`audio-stage ${track.color}`}><div className="audio-emblem"><Headphones size={42}/><span>✦</span></div><span className="eyebrow">{track.category}</span><strong>{track.title}</strong><p>{supported?'听清每一个声音落点':'这条收录尚未提供可播放地址'}</p>{track.audio&&<audio ref={audio} src={track.audio} preload="metadata" controls aria-label={`${track.title} 音频`}/>}</div>}
  {!supported&&<p className="playback-message">自定义音效和配音请填写 MP3、WAV、OGG 等音频直链，或 YouTube 视频链接；普通网页链接无法直接播放。</p>}
  {error&&<div className="playback-error" role="alert"><span>{error}</span><button className="subtle-button" onClick={()=>setRetry(n=>n+1)}><RefreshCw size={14}/>重试</button></div>}
  <div className="studio-controls">
   <div className="studio-progress"><span>{mediaTime(time)}</span><input type="range" min="0" max={duration||1} step="0.1" value={Math.min(time,duration||1)} onChange={e=>seekTo(Number(e.target.value))} disabled={disabled||!duration} aria-label="播放进度" aria-valuetext={`${mediaTime(time)} / ${mediaTime(duration)}`}/><span>{duration?mediaTime(duration):'--:--'}</span></div>
   <div className="studio-transport"><div className="transport-main"><button className="icon-button" disabled={!onPrevious} onClick={onPrevious} aria-label="上一首"><SkipBack size={18}/></button><button className="jump-button" disabled={disabled||!duration} onClick={()=>seekTo((transport.current?.time()||0)-step)} aria-label={`后退 ${step} 秒`}><RotateCcw size={17}/><span>{step}s</span></button><button className="studio-play" disabled={disabled} onClick={toggle} aria-label={playing?'暂停':'播放'}>{playing?<Pause size={21} fill="currentColor"/>:<Play size={21} fill="currentColor"/>}</button><button className="jump-button" disabled={disabled||!duration} onClick={()=>seekTo((transport.current?.time()||0)+step)} aria-label={`快进 ${step} 秒`}><RotateCw size={17}/><span>{step}s</span></button><button className="icon-button" disabled={!onNext} onClick={onNext} aria-label="下一首"><SkipForward size={18}/></button></div>
   <div className="transport-options"><button className={`icon-button ${loop?'active':''}`} aria-label="单曲循环" aria-pressed={loop} onClick={()=>setLoop(v=>!v)} disabled={!supported}><Repeat2 size={18}/></button><label className="speed-select"><span>倍速</span><select aria-label="播放倍速" value={speed} disabled={disabled||rates.length<2} onChange={e=>transport.current?.setSpeed(Number(e.target.value))}>{rates.map(r=><option key={r} value={r}>{r}×</option>)}</select></label><label className="studio-volume"><Volume2 size={16}/><input aria-label="音量" type="range" min="0" max="100" value={volume} disabled={disabled} onChange={e=>{const v=Number(e.target.value);setVolume(v);transport.current?.volume(v);}}/></label></div></div>
   <div className="studio-status"><span role="status">{error?'播放未就绪':!supported?'等待补充播放地址':!ready?'正在载入播放器…':buffering?'正在缓冲…':playing?'正在播放':'点击播放，开始试听'}{ready&&!error&&rates.length===1?' · 当前来源仅支持原速':''}</span><div><button disabled={disabled} onClick={()=>onMark('start',mediaTime(transport.current?.time()||0))}>设为入点</button><button disabled={disabled} onClick={()=>onMark('end',mediaTime(transport.current?.time()||0))}>设为出点</button></div></div>
   {hint&&<p className="playback-message" role="status">{hint}</p>}
  </div>
  {track.sourceNote&&<p className="studio-source-note">{track.sourceNote}</p>}
 </section>;
});
export default TrackPlayer;
