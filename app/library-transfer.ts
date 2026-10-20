import {z} from 'zod';
import {recordSchema,type LibraryRecord} from './library-schema';
const backupSchema=z.object({version:z.literal(1),records:z.array(recordSchema).max(1000)});
export function parseBackup(text:string):LibraryRecord[]{
 const parsed=backupSchema.safeParse(JSON.parse(text));
 if(!parsed.success)throw new Error('文件格式或内容不正确，请选择本站导出的 JSON 文件（最多 1,000 条记录）。');
 return [...new Map(parsed.data.records.map(r=>[`${r.kind}:${r.key}`,r])).values()];
}
export function createBackup(records:LibraryRecord[],customOnly=false):string{
 const customIds=new Set(records.filter(r=>r.kind==='custom').map(r=>r.key));
 const selection=customOnly?records.filter(r=>r.kind==='custom'||((r.kind==='note'||r.kind==='favorite')&&customIds.has(r.key))):records;
 return JSON.stringify({version:1,exportedAt:new Date().toISOString(),records:selection},null,2);
}
export function mergeRecords(existing:LibraryRecord[],incoming:LibraryRecord[]):LibraryRecord[]{return [...new Map([...existing,...incoming].map(r=>[`${r.kind}:${r.key}`,r])).values()];}
export function backupSummary(incoming:LibraryRecord[],existing:LibraryRecord[]){
 const keys=new Set(existing.map(r=>`${r.kind}:${r.key}`));
 return {custom:incoming.filter(r=>r.kind==='custom').length,favorites:incoming.filter(r=>r.kind==='favorite').length,notes:incoming.filter(r=>r.kind==='note').length,projects:incoming.filter(r=>r.kind==='project').length,updated:incoming.filter(r=>keys.has(`${r.kind}:${r.key}`)).length,total:incoming.length};
}
