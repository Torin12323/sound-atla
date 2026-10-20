import {getDb} from '@/db';
import {libraryItems} from '@/db/schema';
import {and,eq} from 'drizzle-orm';
import {z} from 'zod';
import {recordSchema} from '@/app/library-schema';
export const dynamic='force-dynamic';
const keySchema=z.object({kind:z.enum(['favorite','note','project','custom']),key:z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/)});
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(request:Request){
 const userId=request.headers.get('oai-authenticated-user-id');if(!userId)return reply({error:'请先登录以读取个人素材库'},401);
 try{const rows=await getDb().select().from(libraryItems).where(eq(libraryItems.userId,userId));return reply({records:rows.map(r=>({kind:r.kind,key:r.itemKey,value:JSON.parse(r.data)}))});}catch{return reply({error:'素材库暂时无法读取，请重试'},503);}
}
export async function PUT(request:Request){
 const userId=request.headers.get('oai-authenticated-user-id');if(!userId)return reply({error:'请先登录以保存素材'},401);
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return reply({error:'来源不匹配'},403);
 try{const raw=await request.text();if(raw.length>50000)return reply({error:'内容过长'},413);const input=recordSchema.safeParse(JSON.parse(raw));if(!input.success)return reply({error:'请检查填写内容、链接或时间段'},400);
 const {kind,key,value}=input.data;const data=JSON.stringify(value),updatedAt=new Date().toISOString();
 await getDb().insert(libraryItems).values({userId,kind,itemKey:key,data,updatedAt}).onConflictDoUpdate({target:[libraryItems.userId,libraryItems.kind,libraryItems.itemKey],set:{data,updatedAt}});return reply({ok:true});
 }catch{return reply({error:'保存失败，请稍后重试'},503);}
}
export async function DELETE(request:Request){
 const userId=request.headers.get('oai-authenticated-user-id');if(!userId)return reply({error:'请先登录'},401);
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return reply({error:'来源不匹配'},403);
 const input=keySchema.safeParse({kind:new URL(request.url).searchParams.get('kind'),key:new URL(request.url).searchParams.get('key')});if(!input.success)return reply({error:'无效记录'},400);
 try{await getDb().delete(libraryItems).where(and(eq(libraryItems.userId,userId),eq(libraryItems.kind,input.data.kind),eq(libraryItems.itemKey,input.data.key)));return reply({ok:true});}catch{return reply({error:'删除失败，请重试'},503);}
}
