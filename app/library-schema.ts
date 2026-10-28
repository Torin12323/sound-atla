import {z} from 'zod';
const key=z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/);
export const safeUrl=z.string().url().max(1500).refine(v=>['https:','http:'].includes(new URL(v).protocol));
const time=z.string().max(12).refine(v=>!v||/^(?:\d{1,2}:)?\d{1,2}:[0-5]\d$/.test(v));
const seconds=(v:string)=>v.split(':').reduce((a,b)=>a*60+Number(b),0);
export const noteSchema=z.object({text:z.string().max(4000),start:time,end:time,label:z.string().max(120),status:z.enum(['灵感收藏','授权待核实','需署名','已取得授权'])}).refine(v=>!v.end||seconds(v.end)>seconds(v.start||'0:00'));
export const customSchema=z.object({title:z.string().trim().min(1).max(120),artist:z.string().trim().min(1).max(120),url:safeUrl,kind:z.enum(['music','sfx','voice']),category:z.string().max(60),scene:z.string().max(60),description:z.string().max(1000)});
export const recordSchema=z.discriminatedUnion('kind',[
 z.object({kind:z.literal('favorite'),key,value:z.literal(true)}),
 z.object({kind:z.literal('note'),key,value:noteSchema}),
 z.object({kind:z.literal('project'),key,value:z.object({name:z.string().trim().min(1).max(80),trackIds:z.array(key).max(500)})}),
 z.object({kind:z.literal('custom'),key,value:customSchema}),
]);
export type Note=z.infer<typeof noteSchema>;
export type Custom=z.infer<typeof customSchema>;
export type LibraryRecord=z.infer<typeof recordSchema>;
