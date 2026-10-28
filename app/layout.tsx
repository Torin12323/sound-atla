import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'拾音 Sound Atlas · 为画面寻找声音',description:'发现、收藏与搭配 YouTube 音乐、通用音效、转场和配音。支持站内试听、片段笔记与每日排行的个人剪辑配乐工作台。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
