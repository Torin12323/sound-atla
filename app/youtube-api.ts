import type {YouTubePlayer} from './playback';
type PlayerEvent={target:YouTubePlayer;data:number};
export type YouTubeAPI={Player:new(element:HTMLElement,options:{videoId:string;host?:string;width:string;height:string;playerVars:Record<string,string|number>;events:{onReady:(e:PlayerEvent)=>void;onStateChange:(e:PlayerEvent)=>void;onPlaybackRateChange:(e:PlayerEvent)=>void;onError:(e:PlayerEvent)=>void;onAutoplayBlocked:()=>void}})=>YouTubePlayer};
declare global{interface Window{YT?:YouTubeAPI;onYouTubeIframeAPIReady?:()=>void;}}
let pending:Promise<YouTubeAPI>|undefined;
export function loadYouTubeAPI():Promise<YouTubeAPI>{
 if(window.YT?.Player)return Promise.resolve(window.YT);
 if(pending)return pending;
 pending=new Promise((resolve,reject)=>{
  const previous=window.onYouTubeIframeAPIReady;
  let script=document.getElementById('sound-atlas-youtube-api') as HTMLScriptElement|null;
  const finish=()=>{clearTimeout(timeout);script?.removeEventListener('error',fail);};
  const fail=()=>{finish();script?.remove();pending=undefined;reject(new Error('YouTube 播放器暂时无法载入，请检查网络后重试。'));};
  const timeout=setTimeout(fail,20000);
  window.onYouTubeIframeAPIReady=()=>{try{previous?.();}catch{}if(window.YT?.Player){finish();resolve(window.YT);}};
  if(!script){script=document.createElement('script');script.id='sound-atlas-youtube-api';script.src='https://www.youtube.com/iframe_api';script.async=true;script.addEventListener('error',fail);document.head.appendChild(script);}else script.addEventListener('error',fail);
 });
 return pending;
}
