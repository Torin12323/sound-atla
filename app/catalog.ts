import {audioSources} from './audio-sources';
import {extraTracks} from './catalog-extra';
export type Source={label:string;url:string;platform:string;role:string};
export type Track={id:string;title:string;artist:string;artistId:string;kind:'music'|'sfx';category:string;genre:string;moods:string[];scenes:string[];energy:string;duration?:number;description:string;tip:string;color:string;license:string;licenseUrl:string;sources:Source[];youtube?:string;youtubeStart?:number;youtubeEnd?:number;audio?:string;sourceNote?:string;custom?:boolean};
export type Artist={id:string;name:string;role:string;bio:string;styles:string[];url:string;color:string;initials:string};
export const artists:Artist[]=[
{id:'scott',name:'Scott Buckley',role:'作曲家 · 编曲家',bio:'澳大利亚作曲家与编曲家，将管弦乐与电子音色融入电影感配乐。为动画、游戏及影视创作音乐，并运营自己的 CC BY 音乐库。',styles:['电影感','管弦','氛围'],url:'https://www.scottbuckley.com.au/about/',color:'mint',initials:'SB'},
{id:'benjamin',name:'Benjamin Tissot',role:'音乐人 · Bensound',bio:'以 Bensound 为人熟知，作品覆盖 Chill-Hop、民谣、爵士、流行与电影配乐。这里精选其适合产品、日常与品牌展示的作品。',styles:['Chill-Hop','流行','木吉他'],url:'https://www.bensound.com/artist/benjamin-tissot',color:'orange',initials:'BT'},
{id:'chris',name:'Chris Zabriskie',role:'作曲家 · 录音艺术家',bio:'居于纽约布鲁克林的作曲家与录音艺术家。《Cylinders》由其创作、制作并演奏。其官网提供作品与署名使用说明。',styles:['氛围','器乐','极简'],url:'https://chriszabriskie.com/about/',color:'blue',initials:'CZ'},
{id:'kevin',name:'Kevin MacLeod',role:'作曲家 · Incompetech',bio:'Incompetech 音乐作者。《Monkeys Spinning Monkeys》以长笛与拨奏弦乐营造轻快氛围。官网提供免费署名与其他许可选项。',styles:['喜剧','轻快','器乐'],url:'https://incompetech.com/music/royalty-free/',color:'pink',initials:'KM'},
{id:'lukrembo',name:'Lukrembo',role:'音乐制作人',bio:'《Biscuit》《Chocolate》的制作人，以轻松的 Lo-fi 器乐营造温暖日常。通过 YouTube 原始作品试听，使用条件以作者发布说明为准。',styles:['Lo-fi','日常','轻松'],url:'https://www.youtube.com/watch?v=EtZ2m2Zm3vY',color:'sand',initials:'LU'},
{id:'cartoon',name:'Cartoon · Jéja',role:'音乐创作者 · NCS 发行',bio:'《On & On》的音乐创作者，Daniel Levi 参与演唱。作品由 NCS 发布，曲目页面保留完整署名与使用说明。',styles:['电子','流行','人声'],url:'https://ncs.io/OnandOn',color:'violet',initials:'CJ'},
{id:'warriyo',name:'Warriyo',role:'音乐制作人 · NCS 发行',bio:'《Mortals》的音乐创作者，Laura Brehm 参与演唱。可通过 NCS 官方作品页面查看发布、试听与许可信息。',styles:['电子','人声','运动'],url:'https://ncs.io/mortals',color:'orange',initials:'WA'},
{id:'syn',name:'Syn Cole',role:'音乐制作人 · NCS 发行',bio:'《Feel Good》的音乐创作者。通过 NCS 官方 YouTube 发布试听，作品署名与使用条件参考 NCS 的说明。',styles:['电子','活力','运动'],url:'https://ncs.io/feelgood',color:'lime',initials:'SC'},
];
const yt=(id:string):Source=>({label:'YouTube 试听',url:`https://www.youtube.com/watch?v=${id}`,platform:'YouTube',role:'原站视频'});
const web=(url:string,label='作者官网'):Source=>({label,url,platform:'国外网站',role:'官方来源'});
const scott=(id:string,title:string,youtube:string,desc:string,scenes:string[],moods:string[],color:string):Track=>({id,title,artist:'Scott Buckley',artistId:'scott',kind:'music',category:'完整配乐',genre:'电影配乐',moods,scenes,energy:'低',description:desc,tip:'先在原站完整试听，再标记与画面情绪一致的乐句；渐进段落适合建立叙事。',color,license:'CC BY 4.0 · 需署名',licenseUrl:'https://www.scottbuckley.com.au/library/using-this-music/',sources:[yt(youtube)],youtube});
const ben=(id:string,title:string,slug:string,duration:number,genre:string,desc:string,scenes:string[],moods:string[],color:string,youtube?:string):Track=>({id,title,artist:'Benjamin Tissot',artistId:'benjamin',kind:'music',category:'完整配乐',genre,moods,scenes,energy:'中',duration,description:desc,tip:'可从一个完整乐句开始剪辑。有人声解说时，优先选择编排较稀疏的段落。',color,license:'按单曲许可使用',licenseUrl:`https://www.bensound.com/royalty-free-music/track/${slug}`,sources:youtube?[yt(youtube)]:[],youtube});
const mix=(id:string,title:string,cn:string,category:string,sec:number,desc:string,scenes:string[],color:string):Track=>({id,title,artist:'Mixkit · 未列出个人作者',artistId:'',kind:'sfx',category,genre:category,moods:[],scenes,energy:'—',duration:sec,description:`${cn}。${desc}`,tip:'在 Mixkit 原站列表中按英文标题查找该声音，试听后将声音落点对齐画面动作。',color,license:'Mixkit 音效许可',licenseUrl:'https://mixkit.co/license/#sfxFree',sources:[web('https://mixkit.co/free-sound-effects/','Mixkit 原站列表')]});
const catalogTracks:Track[]=[
scott('in-this-moment','In This Moment','ittj60VE6bU','亲密的钢琴独奏，带着苦甜交织的沉思感。',['情绪短片','口播叙事'],['沉静','感性'],'mint'),
ben('all-that','All That','all-that-chill-hop',146,'Lo-fi / Hip-Hop','爵士采样、Hip-Hop 节拍与电钢琴、贝斯、萨克斯组合的轻松律动。',['日常生活','产品展示','口播叙事'],['轻松','温暖'],'orange','_UxaKBok6ks'),
{id:'on-and-on',title:'On & On',artist:'Cartoon, Jéja · Daniel Levi',artistId:'cartoon',kind:'music',category:'完整配乐',genre:'电子',moods:['活力','热血'],scenes:['运动卡点','旅行风景','科技数码'],energy:'高',description:'Cartoon 与 Jéja 创作、Daniel Levi 演唱的 NCS 发行作品。',tip:'适合作为运动和旅行蒙太奇的选曲候选；有歌词的段落应留意与口播的关系。',color:'violet',license:'NCS 使用政策',licenseUrl:'https://ncs.io/usage-policy',youtube:'K4DyBUG242c',sources:[yt('K4DyBUG242c')]},
{id:'life-in-silico',title:'Life In Silico',artist:'Scott Buckley',artistId:'scott',kind:'music',category:'完整配乐',genre:'钢琴 / 古典',moods:['沉静','感性'],scenes:['情绪短片','旅行风景','口播叙事'],energy:'低',description:'明亮的钢琴与弦乐，从轻快愉悦走向带着苦甜意味的沉思。',tip:'作为留白画面与叙事段落的候选，先试听再记录合适的入点。',color:'blue',license:'CC BY 4.0 · 需署名',licenseUrl:'https://www.scottbuckley.com.au/library/using-this-music/',youtube:'upKERHku9Qg',sources:[yt('upKERHku9Qg')]},
ben('creative-minds','Creative Minds','creative-minds',147,'流行','吉他、钢琴、鼓与弦乐构成积极的背景配乐。',['科技数码','产品展示','口播叙事'],['活力','明亮'],'lime','twt7a4MT2_I'),
{id:'biscuit',title:'Biscuit',artist:'Lukrembo',artistId:'lukrembo',kind:'music',category:'完整配乐',genre:'Lo-fi / Hip-Hop',moods:['轻松','温暖'],scenes:['日常生活','口播叙事','产品展示'],energy:'低',description:'Lukrembo 制作的 Lo-fi 作品，轻柔的律动适合安静的日常片段。',tip:'适合探索日常、手作与安静开箱的声音氛围。发布前查看作者的使用说明。',color:'sand',license:'授权待核实',licenseUrl:'https://www.youtube.com/watch?v=EtZ2m2Zm3vY',youtube:'EtZ2m2Zm3vY',sources:[yt('EtZ2m2Zm3vY')]},
scott('home-was-you','Home Was You','izlKYVvsXYE','钢琴、弦乐与手风琴组成平和怀旧的民谣管弦织体。',['日常生活','旅行风景','情绪短片'],['温暖','怀旧'],'sand'),
scott('with-these-hands','With These Hands','yXyPtNTVWKc','钢琴、弦乐与合成器带来梦幻、怀旧与思考的氛围。',['情绪短片','旅行风景'],['怀旧','感性'],'pink'),
scott('unraveling','Unraveling','Fc4L4tZkF30','弦乐与合成器构成内省的氛围，在失落中保留希望。',['情绪短片','口播叙事'],['沉静','感性'],'blue'),
{id:'mortals',title:'Mortals',artist:'Warriyo · Laura Brehm',artistId:'warriyo',kind:'music',category:'完整配乐',genre:'电子',moods:['热血','神秘'],scenes:['运动卡点','科技数码'],energy:'高',description:'Warriyo 创作、Laura Brehm 演唱的 NCS 发行作品。',tip:'可作为运动集锦的节奏候选，先找到适合动作推进的段落再标记。',color:'orange',license:'NCS 使用政策',licenseUrl:'https://ncs.io/usage-policy',youtube:'yJg-Y5byMMw',sources:[yt('yJg-Y5byMMw')]},
{id:'feel-good',title:'Feel Good',artist:'Syn Cole',artistId:'syn',kind:'music',category:'完整配乐',genre:'电子',moods:['活力','明亮'],scenes:['运动卡点','科技数码','旅行风景'],energy:'高',description:'Syn Cole 的 NCS 发行作品，明快的电子律动适合活力画面。',tip:'作为运动与城市快剪候选，按音乐的乐句和画面动作选切点。',color:'lime',license:'NCS 使用政策',licenseUrl:'https://ncs.io/usage-policy',youtube:'q1ULJ92aldE',sources:[yt('q1ULJ92aldE')]},
{id:'monkeys',title:'Monkeys Spinning Monkeys',artist:'Kevin MacLeod',artistId:'kevin',kind:'music',category:'循环配乐',genre:'喜剧 / 器乐',moods:['俏皮','明亮'],scenes:['日常生活','产品展示'],energy:'中',description:'明亮长笛与拨奏弦乐，轻快、俏皮，并可循环使用。',tip:'把动作与拨弦短音呼应，适合轻松的产品小故事。',color:'pink',license:'免费署名 / 标准许可',licenseUrl:'https://incompetech.com/music/royalty-free/licenses/',youtube:'2eZVbrO6Z1M',sources:[yt('2eZVbrO6Z1M')]},
ben('ukulele','Ukulele','ukulele',146,'民谣 / 原声','尤克里里、响指、拨奏弦乐与鼓组成的轻盈配乐。',['日常生活','产品展示'],['明亮','俏皮'],'sand','n4BEFsBhHTI'),
ben('jazzy-frenchy','Jazzy Frenchy','jazzy-frenchy-upbeat-funny',104,'爵士','木吉他、低音提琴、手风琴等组成的法式爵士作品。',['日常生活','产品展示'],['轻松','俏皮'],'orange','vPlgzl8cbjI'),
ben('evolution','Evolution','evolution-epic-nature',165,'电影配乐','包含鼓、弦乐、铜管、木管与合成器的交响配乐。',['旅行风景','运动卡点'],['热血','明亮'],'mint','mmziOgk8C58'),
...([['one','One',176,'ye6fxEeZm2g'],['two','Two',228,'5Z0vaEQ46LY'],['seven','Seven',532,'5wIbG4VQ4kY']] as const).map(([id,name,duration,youtube]):Track=>({id:`cylinder-${id}`,title:`Cylinder ${name}`,artist:'Chris Zabriskie',artistId:'chris',kind:'music',category:'完整配乐',genre:'氛围 / 极简',moods:['沉静','神秘'],scenes:['口播叙事','情绪短片'],energy:'低',duration,description:`《Cylinders》专辑中的作品，由 Chris Zabriskie 创作、制作并演奏。`,tip:'可作为纪录与留白画面的选曲候选；在试听台标记适合画面的入点与出点。',color:'blue',license:'CC BY 4.0 · 需署名',licenseUrl:'https://chriszabriskie.com/use/',youtube,...(id==='one'?{youtubeEnd:176,sourceNote:'播放作者官方专辑的第一首 Cylinder One（0:00–2:56）；进度与循环以此片段为范围。'}:{}),sources:[{label:id==='one'?'YouTube 官方专辑片段':'YouTube 单曲',url:`https://www.youtube.com/watch?v=${youtube}`,platform:'YouTube',role:id==='one'?'官方专辑 · 第一首':id==='two'?'Audio Library 推广发布':'艺人 Topic 发行'}]})),
mix('fast-whoosh','Fast whoosh transition','快速掠过', '转场与运动',1,'短促的转场声音。',['科技数码','运动卡点'],'violet'),
mix('air-woosh','Air woosh','空气掠过','转场与运动',2,'用于镜头或物件运动。',['产品展示','旅行风景'],'mint'),
mix('tunnel-whoosh','Cinematic tunnel reverb woosh','隧道混响转场','转场与运动',6,'带空间感的转场声音。',['科技数码','情绪短片'],'blue'),
mix('epic-impact','Movie trailer epic impact','预告片冲击','冲击与强调',4,'用于重要画面落点。',['运动卡点','科技数码'],'orange'),
mix('keyboard','Keyboard typing','键盘打字','拟音与物件',26,'操作细节与办公场景声音。',['科技数码','口播叙事'],'sand'),
mix('light-rain','Light rain loop','轻雨循环','自然与环境',15,'适合安静场景的环境底声。',['情绪短片','日常生活'],'blue'),
mix('birds','Little birds singing in the trees','树间鸟鸣','自然与环境',8,'自然空间的声音细节。',['旅行风景','日常生活'],'mint'),
mix('notification','Retro game notification','复古游戏提示','界面与提示',1,'界面反馈与小节奏点。',['科技数码','产品展示'],'pink'),
mix('applause','Stadium crowd light applause','体育场轻掌声','人物与群体',11,'表现运动现场的群体反应。',['运动卡点'],'orange'),
mix('cartoon-whistle','Cartoon toy whistle','卡通玩具哨声','卡通与喜剧',1,'轻松与反差片段的声音候选。',['日常生活','产品展示'],'lime'),
...extraTracks,
];
export const tracks:Track[]=catalogTracks.map(t=>audioSources[t.id]?{...t,audio:audioSources[t.id].url,tip:'在站内试听台反复听落点，用进度条或前后 1 秒微调，再记录与画面匹配的片段。',sources:[{label:'Mixkit 素材来源',url:audioSources[t.id].page,platform:'国外网站',role:'官方音效列表'}]}:t);
export const scenes=[
{id:'科技数码',en:'FUTURE IN MOTION',title:'让科技，被听见',desc:'电子脉冲 / 界面细节 / 机械质感',color:'violet',icon:'cpu',recipe:'用电子或简洁脉冲建立节奏；参数出现时配轻点击，产品揭晓时再使用一次明显冲击。'},
{id:'情绪短片',en:'FEEL EVERY FRAME',title:'给情绪，留一点空间',desc:'钢琴 / 弦乐 / 细腻的留白',color:'mint',icon:'waves',recipe:'先让钢琴或氛围音乐建立情绪，保留对白与呼吸的位置。环境底声帮助连接镜头。'},
{id:'运动卡点',en:'MOVE WITH THE BEAT',title:'把心跳，剪进画面',desc:'强节奏 / 击球声 / 能量爆发',color:'orange',icon:'activity',recipe:'让音乐节奏和真实动作声相互配合。挥拍、击球与鞋底摩擦应有各自的位置，避免每一拍都加冲击。'},
{id:'日常生活',en:'THE LITTLE MOMENTS',title:'日常，也有自己的旋律',desc:'Lo-fi / 木吉他 / 温暖日常',color:'sand',icon:'sun',recipe:'以轻松的律动铺底，保留开箱、纸张和触摸声音；将画面节奏组织成自然的小段落。'},
{id:'产品展示',en:'DESIGNED TO BE HEARD',title:'听见，产品的质感',desc:'简洁律动 / 材质拟音 / 揭晓落点',color:'pink',icon:'box',recipe:'优先选择结构清楚的音乐，让触摸、按键与包装声表现产品材质，揭晓画面使用一次清楚的声音落点。'},
{id:'旅行风景',en:'SOUNDS OF SOMEWHERE',title:'让声音，带你去远方',desc:'民谣 / 电影感 / 自然空间',color:'blue',icon:'mountain',recipe:'用环境声先建立地点，音乐随镜头展开渐入；跨场景时用海浪、风或城市底声做声音桥。'},
{id:'口播叙事',en:'ROOM FOR YOUR VOICE',title:'每一句，都被听见',desc:'低密度 / 简洁铺底 / 段落提示',color:'mint',icon:'mic',recipe:'选择人声空间充足的配乐，重点句适当降低音乐；段落提示少而准确，避免盖过语言。'},
];
export const platformGroups=[
{id:'global',title:'全球头部主流平台',en:'GLOBAL MAINSTREAM',desc:'从熟悉的旋律出发，建立你的配乐参考库。',icon:'globe'},
{id:'specialist',title:'特色垂直类平台',en:'FIND YOUR NICHE',desc:'深入音色、独立创作与个性电台，寻找不一样的声音。',icon:'headphones'},
{id:'regional',title:'区域代表性平台',en:'SOUNDS BEYOND BORDERS',desc:'让不同地区的音乐，为旅行与文化叙事带来灵感。',icon:'compass'},
] as const;
export const sourceSites=[
{name:'Spotify',mark:'SP',group:'global',subtitle:'个性推荐与主题歌单',url:'https://open.spotify.com/',color:'mint',type:'个性推荐',desc:'瑞典音乐流媒体平台，以个性化推荐、主题歌单和跨设备收听见长，也提供播客内容。',tip:'从 Discover Weekly、风格歌单与相似艺人寻找同一情绪的候选作品。'},
{name:'Apple Music',mark:'AM',group:'global',subtitle:'无损音质与空间音频',url:'https://music.apple.com/',color:'pink',type:'精细聆听',desc:'苹果旗下音乐服务，提供无广告收听、无损音频与杜比全景声内容，并支持苹果及其他设备。',tip:'比较同一类编曲的层次与动态，为情绪短片和品牌叙事建立参考。'},
{name:'YouTube Music',mark:'YT',group:'global',subtitle:'歌曲、MV 与现场版本',url:'https://music.youtube.com/',color:'orange',type:'视频音乐',desc:'依托 YouTube 的歌曲与音乐视频资源，便于寻找官方发布、现场演出和不同版本。',tip:'发现喜欢的版本后，复制对应 YouTube 作品链接，直接收录到拾音。'},
{name:'Amazon Music',mark:'AZ',group:'global',subtitle:'音乐、播客与设备生态',url:'https://music.amazon.com/',color:'blue',type:'多设备',desc:'亚马逊旗下音乐服务。Prime 与 Unlimited 提供不同收听权益，Unlimited 包含无损与空间音频内容。',tip:'从主题歌单和专辑寻找旅行、生活方式与产品展示的声音参考。'},
{name:'Tidal',mark:'TD',group:'specialist',subtitle:'高解析音频与音乐细节',url:'https://tidal.com/',color:'sand',type:'Hi-Res',desc:'注重高保真聆听，提供无损、HiRes FLAC 与杜比全景声内容，并有编辑精选及艺人资讯。',tip:'仔细听低频、声场与乐器细节，为剪辑中的空间感和层次感寻找参考。'},
{name:'Deezer',mark:'DZ',group:'specialist',subtitle:'Flow 个性化音乐探索',url:'https://www.deezer.com/',color:'violet',type:'Flow',desc:'法国音乐流媒体平台，提供 Flow 个性化推荐、歌单、歌词与 HiFi 音质相关功能。',tip:'借助连续推荐扩展曲风，把喜欢的情绪和节奏整理成选曲方向。'},
{name:'SoundCloud',mark:'SC',group:'specialist',subtitle:'独立音乐人的创作社区',url:'https://soundcloud.com/',color:'orange',type:'独立原创',desc:'连接音乐人与听众的音乐分享平台，适合探索独立原创、Demo、混音和 DJ set。',tip:'关注独立制作人的声音语言，再查找其 YouTube 发布与作品许可。'},
{name:'Pandora',mark:'PA',group:'specialist',subtitle:'从一首歌延伸的个性电台',url:'https://www.pandora.com/',color:'blue',type:'个性电台',desc:'美国音乐电台平台，以 Music Genome Project 的音乐特征分析提供个性化电台体验。',tip:'从喜欢的曲目或艺人建立电台，扩展相近节奏与情绪的灵感。'},
{name:'Anghami',mark:'AN',group:'regional',subtitle:'中东与北非的音乐视角',url:'https://www.anghami.com/',color:'violet',type:'中东 / 北非',desc:'面向中东和北非的音乐平台，提供阿拉伯语及国际音乐、歌单与播客。',tip:'探索阿拉伯语音乐、地区流行与当地艺人，为文化和旅行内容建立参考。'},
{name:'Boomplay',mark:'BP',group:'regional',subtitle:'探索非洲本土音乐',url:'https://www.boomplay.com/',color:'orange',type:'非洲',desc:'聚焦非洲音乐市场的流媒体平台，汇集当地音乐人与多样的流行音乐内容。',tip:'从本土艺人、榜单与歌单探索非洲音乐的节奏，为运动和旅行画面寻找灵感。'},
{name:'Yandex Music',mark:'YM',group:'regional',subtitle:'俄语区音乐与个性推荐',url:'https://music.yandex.com/',color:'lime',type:'俄语区',desc:'Yandex 旗下音乐服务，提供歌曲、播客与个性推荐，适合探索俄语音乐内容。',tip:'通过当地艺人和推荐拓展选曲视野；服务是否可用以所在地区为准。'},
];
