import type {Track} from './catalog';
import type {Custom} from './library-schema';
export function youtubeId(value:string):string|undefined{
 try{const u=new URL(value);if(!['https:','http:'].includes(u.protocol))return;const host=u.hostname.toLowerCase();let id:string|null|undefined;
 if(host==='youtu.be')id=u.pathname.split('/')[1];
 else if(['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com'].includes(host)){const parts=u.pathname.split('/');id=u.pathname==='/watch'?u.searchParams.get('v'):['shorts','embed','live'].includes(parts[1])?parts[2]:undefined;}
 return id&&/^[a-zA-Z0-9_-]{11}$/.test(id)?id:undefined;
 }catch{return;}
}
export function directAudioUrl(value:string):string|undefined{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(u.pathname)?u.href:undefined;}catch{return;}}
export const youtubeSearch=(query:string)=>`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
export function customTrack(key:string,value:Custom):Track{
 const youtube=youtubeId(value.url);const audio=value.kind!=='music'?directAudioUrl(value.url):undefined;const url=youtube?`https://www.youtube.com/watch?v=${youtube}`:value.kind==='music'?youtubeSearch(`${value.artist} ${value.title}`):value.url;
 return {id:key,title:value.title,artist:value.artist,artistId:'',kind:value.kind,category:value.category||'个人收录',genre:value.category||'个人收录',moods:[],scenes:value.scene?[value.scene]:[],energy:'—',description:value.description||'你的个人声音收藏。',tip:'为这条素材记录片段、使用场景与作者信息。',color:'violet',license:'授权待核实',licenseUrl:url,sources:[{label:youtube?'YouTube 试听':value.kind==='music'?'YouTube 搜索作品':value.kind==='voice'?'配音原站':'音效原站',url,platform:youtube||value.kind==='music'?'YouTube':'国外网站',role:'个人收录'}],youtube,audio,sourceNote:!youtube&&value.kind==='music'?'这条历史收藏尚未补充 YouTube 视频链接，可按曲名与作者在 YouTube 查找。':undefined,custom:true};
}
