export type RankEntry={trackId:string;views:number};
export type RankingSnapshot={day:string;timezone:string;updatedAt:string;entries:RankEntry[]};
export const chinaDay=(date=new Date())=>new Date(date.getTime()+8*60*60*1000).toISOString().slice(0,10);
export const LOCAL_RANKING_KEY='sound-atlas-daily-opens';
export function readLocalRanking(storage:Pick<Storage,'getItem'>,date=new Date()):RankingSnapshot{
 const day=chinaDay(date);let entries:RankEntry[]=[];
 try{const data=JSON.parse(storage.getItem(LOCAL_RANKING_KEY)||'null');if(data?.day===day&&Array.isArray(data.entries))entries=data.entries.filter((r:RankEntry)=>typeof r.trackId==='string'&&Number.isSafeInteger(r.views)&&r.views>0);}catch{}
 return {day,timezone:'Asia/Shanghai',updatedAt:date.toISOString(),entries};
}
export function recordLocalOpen(storage:Pick<Storage,'getItem'|'setItem'>,trackId:string,date=new Date()){
 const data=readLocalRanking(storage,date);const entry=data.entries.find(r=>r.trackId===trackId);if(entry)entry.views++;else data.entries.push({trackId,views:1});storage.setItem(LOCAL_RANKING_KEY,JSON.stringify(data));return data;
}
