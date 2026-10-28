'use client';
import {useState} from 'react';
import {ArrowUpRight,Play,Music2,AudioLines,Waves,Mic} from 'lucide-react';
import type {Track} from './catalog';
import {catalogUpdatedAt} from './catalog-update-20261028';
import {collectionLabels,latestTracks,type Collection} from './catalog-tools';
const icons={music:Music2,sfx:AudioLines,transitions:Waves,voice:Mic};
export default function RecentReleases({kind,onOpen,onBrowse}:{kind?:Collection;onOpen:(t:Track)=>void;onBrowse:(kind:Collection)=>void}){
 const [selection,setSelection]=useState<Collection>('music');const active=kind||selection;const rows=latestTracks(active);
 return <section className="recent-releases" aria-label="本次新收录"><div className="section-header"><div><span className="eyebrow">FRESH FINDS / {catalogUpdatedAt}</span><h2>给剪辑，换一点新声音 <span className="count-pill">{rows.length}</span></h2><p className="section-desc">本次新收录 · 作者、来源与站内试听已补齐</p></div><button className="text-button" onClick={()=>onBrowse(active)}>完整{collectionLabels[active]}库<ArrowUpRight size={15}/></button></div>{!kind&&<div className="recent-tabs">{(Object.keys(collectionLabels) as Collection[]).map(id=>{const Icon=icons[id];return <button key={id} onClick={()=>setSelection(id)} className={active===id?'active':''}><Icon size={15}/>{collectionLabels[id]}</button>;})}</div>}<div className="recent-grid">{rows.map((t,i)=><button key={t.id} className="recent-track" onClick={()=>onOpen(t)} aria-label={`试听新收录 ${t.title}`}><span className={`recent-track-icon ${t.color}`}><Play size={16} fill="currentColor"/></span><span className="recent-track-copy"><strong>{t.title}</strong><small>{t.artist}</small></span><span className="recent-number">{String(i+1).padStart(2,'0')}</span></button>)}</div><p className="micro-copy">收录日期代表加入拾音的时间；此处为编辑推荐，不参与热度排名。</p></section>;
}
