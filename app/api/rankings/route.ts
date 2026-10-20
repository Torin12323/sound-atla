import {getDb} from '@/db';
import {dailyOpens} from '@/db/schema';
import {eq,sql} from 'drizzle-orm';
import {z} from 'zod';
import {tracks} from '@/app/catalog';
import {chinaDay} from '@/app/ranking-data';
export const dynamic='force-dynamic';
const ids=new Set(tracks.map(t=>t.id));
const inputSchema=z.object({trackId:z.string().max(100).refine(id=>ids.has(id))});
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){try{const day=chinaDay();const entries=await getDb().select({trackId:dailyOpens.trackId,views:sql<number>`count(*)`.mapWith(Number)}).from(dailyOpens).where(eq(dailyOpens.day,day)).groupBy(dailyOpens.trackId);return reply({day,timezone:'Asia/Shanghai',updatedAt:new Date().toISOString(),entries});}catch{return reply({error:'排行暂时无法读取，请稍后重试'},503);}}
export async function POST(request:Request){
 const userId=request.headers.get('oai-authenticated-user-id');if(!userId)return reply({error:'登录后才能计入全站排行'},401);
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return reply({error:'来源不匹配'},403);
 try{const raw=await request.text();if(raw.length>1000)return reply({error:'内容过长'},413);const input=inputSchema.safeParse(JSON.parse(raw));if(!input.success)return reply({error:'无效的公开素材'},400);const day=chinaDay();await getDb().insert(dailyOpens).values({day,userId,trackId:input.data.trackId,createdAt:new Date().toISOString()}).onConflictDoNothing();return reply({ok:true,day});}catch{return reply({error:'统计暂时无法保存'},503);}
}
