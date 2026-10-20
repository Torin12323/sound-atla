import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'拾音 Sound Atlas · 为画面寻找声音',description:'发现、收藏与搭配来自 YouTube 和全球音乐人的声音。你的个人剪辑配乐工作台。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
