# 拾音 · Sound Atlas

面向个人视频剪辑的音乐与音效整理工作台。参考素材网站的搜索和分类方式，以中文体验组织来自 YouTube 的音乐与独立分类的音效。

## 功能

- 40 首音乐、40 条通用音效、40 条转场音效、10 条配音 / 人声，真实作品与来源链接；18 组创作者介绍。
- 音乐、音效、转场音效、配音 / 人声独立入口；情绪、场景、来源、时长、能量组合筛选。
- 7 类画面搭配建议（每类 10 首候选）、YouTube 搜索，以及按三组整理的 11 个音乐平台。
- 130 条素材的站内试听台，支持拖动进度、前后快进、倍速、音量、单曲循环、上下首与入出点标记。
- 个人收藏、自定义链接收录、片段入出点、项目归档与授权状态笔记。
- 账户级 D1 数据保存，CSV 项目清单、JSON 备份导出与合并导入。
- 明暗模式、手机布局、键盘搜索与可访问弹窗。

## 运行

使用 Node.js 22.13+ 和 pnpm。安装依赖后，`pnpm dev` 启动开发环境，`pnpm build` 构建。

Sites 环境使用插件附带的安装、构建、源代码同步与发布流程。保留 `.openai/hosting.json` 和 `build/` 中的托管集成。

## 数据

种子内容位于 `app/catalog.ts`，包含素材、音乐人与来源网站。标签、场景搭配及能量为编辑选曲建议；可靠元数据缺失时显示“未标注”。封面为站内抽象插图，不代表作品官方封面。

个人数据由 `app/api/library/route.ts` 读写，依据平台认证用户 ID 隔离。`db/schema.ts` 定义表，`drizzle/` 保存不可修改的历史迁移。新表结构修改后运行 `pnpm db:generate`，再构建和发布。

浏览器存储用于明暗模式、用户选择的本机素材库和本机当日试听入口记录。备份导入按记录类型及 ID 合并同名记录，不清空其他记录。

## 来源与播放器

音乐来源统一为 YouTube，39 首使用单曲视频，Cylinder One 使用作者官方专辑开头 0:00–2:56 的片段并限定播放范围。80 条音效和 10 条配音均按原站精确标题匹配 Mixkit 官方公开试听流，地址位于 `app/audio-sources.ts`。音乐通过 YouTube IFrame API 播放，音效通过 HTML5 Audio 播放；音频不下载到服务器、不重新托管。站内试听不要求跳转，原始发布链接折叠保留。网络、地区、来源失效或作者禁止嵌入时显示明确错误和重试入口。

每条素材可通过 `/#listen/<id>` 打开试听台。进度取自真实播放器，音乐前后 10 秒、短音效与配音前后 1 秒；YouTube 倍速按视频实际返回的可用选项显示，音效支持 0.5–2 倍速。关闭试听台或切换作品会销毁旧播放器，避免叠音。入出点标记可保存到原有片段笔记，“从入点试听”可定位并播放。自定义音效与配音支持 YouTube 视频或 MP3/WAV/OGG/M4A/AAC/FLAC 直链；普通网页链接需编辑补充可播放地址。

作者及许可参考：
- https://www.scottbuckley.com.au/about/
- https://www.scottbuckley.com.au/library/
- https://chriszabriskie.com/use/
- https://incompetech.com/music/royalty-free/licenses/
- https://www.bensound.com/artist/benjamin-tissot
- https://ncs.io/usage-policy
- https://mixkit.co/free-sound-effects/

最后资料整理：2026-10-28。原站条件可能变化，正式使用前按单曲与项目用途核实。

## 验证

已验证 TypeScript、首页服务端渲染、素材 ID 与链接结构、时间段及 URL 输入校验，并在本地 D1 运行环境验证未登录拒绝、收藏保存、项目及笔记写入、跨用户读取与删除隔离。另已验证 新增 30 条音效及配音试听地址返回音频内容，播放器适配层的快进边界、片段范围、倍速与音量调用，以及各类试听台服务端渲染。浏览器视觉与外部播放器实际播放仍需在公开预览中复核。

## 音乐平台

- 全球头部主流平台：Spotify、Apple Music、YouTube Music、Amazon Music。
- 特色垂直类平台：Tidal、Deezer、SoundCloud、Pandora。
- 区域代表性平台：Anghami、Boomplay、Yandex Music。

平台目录用于灵感发现，所有音乐的试听来源仍统一为 YouTube。新音乐收录须填写有效的 YouTube 单曲视频链接。历史非 YouTube 收藏保留数据，以曲名和作者生成 YouTube 搜索入口，不影响原有收藏、笔记和项目关联。作者介绍和单曲许可参考独立保留。

新增链接核对参考：
- https://www.scottbuckley.com.au/2021/07/new-library-track-life-in-silico/
- https://ncs.io/feelgood
- https://www.bensound.com/royalty-free-music/track/ukulele
- https://chriszabriskie.com/cylinders/
- https://newsroom.spotify.com/2026-01-28/music-discovery-features/
- https://www.apple.com/apple-music/
- https://support.google.com/youtubemusic/answer/6313529
- https://www.aboutamazon.com/news/entertainment/what-is-amazon-music
- https://tidal.com/sound-quality
- https://www.deezer.com/us/
- https://soundcloud.com/company/about-us
- https://www.pandora.com/about/
- https://www.anghami.com/about
- https://www.boomplay.com/
- https://music.yandex.com/

## 公开浏览与个人资料

音乐目录、音乐人、音乐平台与场景建议公开浏览。云端个人素材库需要登录，所有云端资料 API 根据平台提供的用户 ID 隔离，未登录读取或写入返回 401。本机模式可免登录使用。

“我的素材库”可导出完整 JSON，也可单独导出自定义收录及其关联的收藏、笔记；CSV 为当前筛选结果的剪辑清单。JSON 导入会先预览条目数量和将更新的记录数量，确认后按类型与 ID 合并。每个文件最多 1,000 条记录、2 MB。导入中断时显示已保存数量，可重试。

自定义收录支持编辑作品名、作者、链接、素材类型、风格类别、场景和简介；更新保留原编号及收藏、笔记、项目关联。

## 每日排行与登录方式

- 每日排行分音乐、通用音效、转场音效、配音 / 人声四个入口，目录数量分别为 40 / 40 / 40 / 10。按北京时间每日 00:00 切换统计日，请求时按当天数据查询，无需定时任务。
- 全站榜单按登录用户当日打开试听台的人数统计；同一账号、同一作品、同一天仅记一次。不是 YouTube 官方播放榜。只接收精选目录中的公开作品，公开接口不返回用户标识；私人自定义条目不参与。
- 本机榜单按当前浏览器当天打开试听台的次数统计。无数据不生成模拟名次。
- 登录选项提供 Sites 托管 ChatGPT 账号登录，以及免登录本机模式。后者是本地保存方式，不是真实账号认证，不能跨设备自动同步。微信、QQ、手机验证码、独立邮箱等第三方认证未配置。现有托管要求保留平台认证集成，没有直接暴露自定义登录提供方配置。
- 本机模式与账号模式分别存放资料，可用 JSON 导出和导入手动迁移，不自动上传本机资料。浏览器禁用存储或空间不足时，保存操作会提示失败。

扩充资料核对来源：
- https://www.scottbuckley.com.au/page/2/
- https://www.scottbuckley.com.au/page/3/
- https://www.scottbuckley.com.au/page/4/
- https://mixkit.co/free-sound-effects/transition/
- https://mixkit.co/free-sound-effects/nature/
- https://mixkit.co/free-sound-effects/technology/
- https://mixkit.co/free-sound-effects/human/

## 2026-10-28 内容更新

本次新增 40 条素材：音乐、通用音效、转场、配音 / 人声各 10 条。新音乐来自 NCS 官方 YouTube 发布，NCS 单曲页核对参与者与许可；10 组创作者资料保留官方入口。配音区为英文短口令、倒计时及机器人短句，使用 Mixkit 官方试听流，未标明个人配音演员时明确显示未列出个人作者。

新内容记录于 `app/catalog-update-20261028.ts`，新增日期代表收录日期，不代表作品发行日期。首页“新收录”可按四类浏览各 10 条；各素材库默认最新收录排序。场景搭配使用真实场景标签筛选，每个场景展示 10 首可直接打开的配乐候选。

每日排行继续只显示实际打开记录，新增配音分类、实时目录数量、数据更新时间与对应类别的新收录推荐；编辑推荐单独标识，未生成模拟播放量或名次。自定义配音可以收藏、写笔记、加入项目、JSON 导出并恢复，旧音乐和音效备份继续兼容。

核对来源：
- https://ncs.io/ht
- https://ncs.io/skyhigh
- https://ncs.io/invincible
- https://ncs.io/blank
- https://ncs.io/myheart
- https://ncs.io/jpbhigh
- https://ncs.io/Fireflypt2
- https://ncs.io/cetus
- https://ncs.io/fearless
- https://ncs.io/adventure
- https://mixkit.co/free-sound-effects/voices/
- https://mixkit.co/free-sound-effects/thank-you/
- https://mixkit.co/free-sound-effects/transition/
- https://mixkit.co/free-sound-effects/nature/
- https://mixkit.co/free-sound-effects/technology/
- https://mixkit.co/free-sound-effects/camera/

本次校验：原 90 条数据完整保留；130 条编号与标题无重复；40 条新增来源通过 HTTP / YouTube oEmbed 核对；配音备份与账户隔离、排行去重已通过本地 D1 测试。桌面浏览器验证了配音播放、倍速、分类切换与真实本机排行；YouTube 可载入时长与倍速控件，本次云浏览器未确认音乐实际出声。
