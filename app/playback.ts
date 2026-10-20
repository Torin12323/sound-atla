import type {Track} from './catalog';

export const audioRates=[0.5,0.75,1,1.25,1.5,1.75,2];
export const mediaTime=(seconds:number)=>{
 const total=Math.max(0,Math.floor(Number.isFinite(seconds)?seconds:0));
 return total>=3600?`${Math.floor(total/3600)}:${String(Math.floor(total%3600/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`:`${Math.floor(total/60)}:${String(total%60).padStart(2,'0')}`;
};
export const clampTime=(time:number,duration:number)=>Math.max(0,Math.min(Number.isFinite(time)?time:0,Number.isFinite(duration)&&duration>0?duration:0));
export type YouTubePlayer={
 playVideo():void;pauseVideo():void;seekTo(seconds:number,allowSeekAhead:boolean):void;
 getCurrentTime():number;getDuration():number;getPlaybackRate():number;
 getAvailablePlaybackRates():number[];setPlaybackRate(rate:number):void;
 setVolume(volume:number):void;getVolume():number;getIframe():HTMLIFrameElement;destroy():void;
};
export type Transport={play():void|Promise<void>;pause():void;seek(seconds:number):number;time():number;duration():number;rates():number[];speed():number;setSpeed(rate:number):void;volume(value:number):void};
export function youtubeTransport(player:YouTubePlayer,track:Pick<Track,'youtubeStart'|'youtubeEnd'>):Transport{
 const start=Math.max(0,track.youtubeStart||0);
 const duration=()=>Math.max(0,Math.min(player.getDuration()||0,track.youtubeEnd??Infinity)-start);
 return {play:()=>player.playVideo(),pause:()=>player.pauseVideo(),duration,time:()=>clampTime(player.getCurrentTime()-start,duration()),seek:seconds=>{const target=clampTime(seconds,duration());player.seekTo(target+start,true);return target;},rates:()=>player.getAvailablePlaybackRates().filter(r=>r>=0.25&&r<=4),speed:()=>player.getPlaybackRate(),setSpeed:rate=>{if(player.getAvailablePlaybackRates().includes(rate))player.setPlaybackRate(rate);},volume:value=>player.setVolume(Math.max(0,Math.min(100,value)))};
}
export function audioTransport(audio:HTMLAudioElement):Transport{
 const duration=()=>Number.isFinite(audio.duration)?audio.duration:0;
 return {play:()=>audio.play(),pause:()=>audio.pause(),duration,time:()=>clampTime(audio.currentTime,duration()),seek:seconds=>{const target=clampTime(seconds,duration());audio.currentTime=target;return target;},rates:()=>audioRates,speed:()=>audio.playbackRate,setSpeed:rate=>{if(audioRates.includes(rate))audio.playbackRate=rate;},volume:value=>{audio.volume=Math.max(0,Math.min(100,value))/100;}};
}
