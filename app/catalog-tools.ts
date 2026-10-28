import {tracks,type Track} from './catalog';
import {catalogUpdatedAt} from './catalog-update-20261028';
export type Collection='music'|'sfx'|'transitions'|'voice';
export const collectionLabels:Record<Collection,string>={music:'音乐',sfx:'通用音效',transitions:'转场音效',voice:'配音 / 人声'};
export const kindLabel=(t:Pick<Track,'kind'>)=>t.kind==='music'?'配乐':t.kind==='voice'?'配音 / 人声':'音效';
export const belongsTo=(t:Track,kind:Collection)=>kind==='music'?t.kind==='music':kind==='voice'?t.kind==='voice':kind==='transitions'?t.kind==='sfx'&&t.category==='转场与运动':t.kind==='sfx'&&t.category!=='转场与运动';
export const isNewTrack=(t:Track)=>t.addedOn===catalogUpdatedAt;
export const latestTracks=(kind:Collection,limit=10)=>tracks.filter(t=>belongsTo(t,kind)&&isNewTrack(t)).slice(0,limit);
export const sceneCandidates=(scene:string,limit=10)=>tracks.filter(t=>t.kind==='music'&&t.scenes.includes(scene)).sort((a,b)=>(b.addedOn||'').localeCompare(a.addedOn||'')).slice(0,limit);
