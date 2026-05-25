import React, { useMemo, useState } from "react";

const employees = [
  ["image", "商品素材", "商品图像AI员工", "PSD模板 / SKU / ZIP", "批量生成商品主图、系列标识和上架素材。", ["批量主图", "PSD模板", "SKU识别"]],
  ["video", "内容生成", "视频生成AI员工", "Seedance / 分镜 / 提示词", "一键生成商品短视频脚本、镜头、口播和视频任务包。", ["一键视频", "脚本分镜", "提示词"]],
  ["ops", "店铺运营", "店铺运营AI员工", "Ozon / 巡检 / PDF", "店铺状态、商品体检、库存预警、订单预警和经营异常分析。", ["每日巡检", "库存预警", "PDF报告"]],
  ["data", "数据分析", "经营数据AI员工", "Excel / GMV / SKU", "订单表分析、SKU排行、成本缺失和价格异常提醒。", ["GMV", "SKU Top", "经营日报"]],
  ["growth", "选品增长", "选品增长AI员工", "Brand / Market / Risk", "识别增长商品、利润机会、品牌机会和风险品类。", ["增长分析", "利润筛选", "风险识别"]],
  ["schedule", "组织协同", "日程排班AI员工", "Calendar / Task / Reminder", "自动安排上新、作图、直播、复盘和团队任务提醒。", ["日程安排", "直播排期", "任务提醒"]],
  ["stream", "流媒体", "流媒体内容AI员工", "Live / Clip / Cover", "直播脚本、短视频切片、封面标题和多平台发布计划。", ["直播脚本", "短视频切片", "发布排期"]],
  ["ad", "增长营销", "广告投放AI员工", "A/B / Copy / Keyword", "广告素材方向、A/B 测试文案、关键词和投放复盘。", ["广告文案", "A/B测试", "投放复盘"]],
  ["finance", "财税经营", "财务核算AI员工", "Cost / ROI / Margin", "订单、采购、物流和平台费用归集，输出利润测算。", ["利润测算", "费用归集", "经营核算"]],
  ["risk", "合规风控", "风控审核AI员工", "Policy / IP / Sensitive", "检查平台规则、侵权风险、敏感词和下架隐患。", ["敏感词", "侵权风险", "平台规则"]],
  ["procurement", "供应链", "采购比价AI员工", "Price / Supplier / Alert", "汇总多渠道价格、供应商信息和异常涨价提醒。", ["多平台比价", "供应商", "涨价提醒"]],
  ["training", "组织协同", "培训教练AI员工", "SOP / Knowledge / Exam", "将 SOP、案例和平台规则沉淀为培训材料。", ["SOP培训", "新人上手", "知识库"]],
];

const models = [
  ["Seedance", "视频生成", "商品短视频、场景视频、口播视频", "Text / Image → Video"],
  ["Seedream", "图像生成", "商品海报、主图创意、场景图", "Text / Image → Image"],
  ["Doubao", "语言与多模态", "经营问答、文案生成、业务分析", "Text / Vision / Reasoning"],
  ["语音模型", "音频与口播", "直播口播、视频配音、多语言讲解", "Speech / Audio"],
  ["Embedding / Rerank", "知识检索", "SOP、政策、平台规则和商品资料检索", "Search / RAG"],
  ["Ark Runtime", "统一模型服务", "API 调用、任务编排和企业级接入", "API / Console"],
];

const channels = ["飞书", "企业微信", "钉钉", "Telegram", "WhatsApp", "Slack", "Web 控制台", "ArkClaw", "OpenClaw", "Ozon API", "Excel", "PSD/PDF"];

const skillCards = [
  ["yatai-image-pack", "商品图像 Skill", "批量主图生成、PSD模板替换、SKU图像匹配。", "openclaw skills install yatai-image-pack"],
  ["yatai-ozon-ops", "Ozon运营 Skill", "店铺巡检、商品体检、库存预警、订单预警。", "openclaw skills install yatai-ozon-ops"],
  ["yatai-data-report", "经营数据 Skill", "订单导出表分析、GMV、SKU Top、成本异常。", "openclaw skills install yatai-data-report"],
  ["yatai-video-agent", "视频内容 Skill", "商品短视频脚本、分镜、Seedance任务包。", "openclaw skills install yatai-video-agent"],
];

const homePillars = [
  ["火山模型底座", "接入 Seedance、Seedream、Doubao 等模型能力"],
  ["YATAI Claw", "跨境电商专属 AI员工工作台"],
  ["行业解决方案", "商品、运营、内容、数据、供应链一体化"],
  ["OPC 创业包", "面向个人电商创业的领包入住服务"],
];

const industrySolutions = [
  ["个人电商创业", "从选品、作图、上架到经营复盘，降低个人启动跨境电商的门槛。", "AI员工辅助完成高频事务，让创业者把精力放在产品判断和经营决策上。", "from-blue-900 to-cyan-700"],
  ["电商与跨境", "商品内容生产与投放成本高，转化效率难提升。", "AI生成商品主图、带货视频、上架资料和经营日报，形成增长闭环。", "from-slate-900 to-blue-800"],
  ["内容与流媒体", "短视频、直播、达人素材生产节奏快，人工难以持续供给。", "AI批量生成脚本、分镜、口播、切片标题和多平台发布计划。", "from-indigo-950 to-violet-800"],
  ["供应链与采购", "采购价格波动、供应商分散、库存周转压力大。", "AI员工跟踪价格、库存、补货、物流和异常包裹，辅助供应链决策。", "from-slate-900 to-emerald-800"],
  ["财税与合规", "平台单据、跨境税务和素材合规口径复杂。", "AI整理资料、识别风险、生成说明和整改清单，辅助企业规范经营。", "from-blue-950 to-slate-800"],
  ["园区与社区", "创业服务缺少标准化工具包，难以规模化复制。", "将 AI员工、SOP、Skill 包和运营看板打包，形成可复制的社区服务能力。", "from-cyan-900 to-blue-700"],
];

function cx(...classes) { return classes.filter(Boolean).join(" "); }
function Arrow({ className = "" }) { return <svg viewBox="0 0 24 24" className={className} fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Search({ className = "" }) { return <svg viewBox="0 0 24 24" className={className} fill="none"><path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function Check({ className = "" }) { return <svg viewBox="0 0 24 24" className={className} fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Icon({ type = "default", className = "" }) {
  const paths = {
    image: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm3 9 3.2-3.6 2.5 2.9 1.8-2.1L18 16H7Z",
    video: "M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5v-11Zm5 3.2v4.6l4-2.3-4-2.3Z",
    ops: "M12 3.5 19 7v5.5c0 4.2-2.8 7-7 8-4.2-1-7-3.8-7-8V7l7-3.5Zm-3 8.8 2 2 4.2-4.4",
    data: "M5 19V9m7 10V5m7 14v-7M4 19h16",
    growth: "M4 17.5 9.5 12l3 3L20 7.5M15 7.5h5v5",
    schedule: "M7 4v3M17 4v3M5 8h14M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm3 7h3m2 0h1",
    stream: "M6 17a8 8 0 0 1 0-10m12 10a8 8 0 0 0 0-10M9 14a4 4 0 0 1 0-4m6 4a4 4 0 0 0 0-4m-3 2h.01",
    ad: "M4 13V7l10-3v16L4 17v-4Zm10-1 5 3V9l-5 3Z",
    finance: "M12 3v18M7 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8",
    risk: "M12 3l8 4v5c0 5-3.2 8-8 9-4.8-1-8-4-8-9V7l8-4Zm-3 9 2 2 4-5",
    procurement: "M6 6h15l-2 8H8L6 6Zm0 0 0-2H3m7 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    training: "M4 6h16v12H4V6Zm4 12v3m8-3v3M8 10h8M8 14h5",
    default: "M5 5h14v14H5z",
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none"><path d={paths[type] || paths.default} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Label({ children, dark = false }) { return <div className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black tracking-[0.18em]", dark ? "border border-white/10 bg-white/10 text-cyan-200" : "border border-blue-100 bg-blue-50 text-blue-700")}><span className="h-2 w-2 rounded-full bg-current" />{children}</div>; }

function Header() {
  return <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-2xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
      <a href="#top" className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 text-lg font-black shadow-[0_0_42px_rgba(34,211,238,.35)]">Y</div><div><div className="text-lg font-black tracking-tight text-white">YATAI Claw</div><div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">AI Employee Platform</div></div></a>
      <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.06] p-1 text-sm font-bold text-slate-200/90 lg:flex">
        {[["#top","首页"],["#skills","AI员工"],["#market","Skill市场"],["#models","模型底座"],["#channels","生态接入"],["#quickstart","快速开始"]].map(([href,label],i)=><a key={href} href={href} className={cx("rounded-full px-4 py-2 transition hover:bg-white/10", i===0 && "bg-white/10 text-white")}>{label}</a>)}
      </nav>
      <button className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10">进入平台</button>
    </div>
  </header>;
}

function CodeBlock({ children }) {
  return <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] shadow-[0_26px_80px_rgba(0,0,0,.35)]"><div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400"/><span className="h-3 w-3 rounded-full bg-yellow-300"/><span className="h-3 w-3 rounded-full bg-green-400"/></div><span className="text-xs font-bold text-slate-400">terminal</span></div><pre className="whitespace-pre-wrap p-6 text-sm leading-7 text-cyan-100"><code>{children}</code></pre></div>;
}

function HeroConsole() {
  return <div className="relative"><div className="absolute -inset-8 rounded-[48px] bg-gradient-to-br from-cyan-400/20 via-blue-600/10 to-violet-500/25 blur-3xl" /><div className="relative rounded-[36px] border border-white/12 bg-white/[.07] p-5 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl"><div className="mb-5 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-4"><div><div className="text-sm font-black text-white">YATAI Claw Runtime</div><div className="mt-1 text-xs text-slate-400">AI员工运行中 · 飞书 / ArkClaw / Runtime</div></div><div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">ONLINE</div></div><div className="grid grid-cols-12 gap-4"><div className="col-span-12 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-blue-500/25 to-violet-500/15 p-5 lg:col-span-7"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-cyan-100"><Icon type="default" className="h-6 w-6"/></div><div><div className="text-xs font-bold text-cyan-100">Lead AI Employee</div><div className="font-black text-white">业务管家AI员工</div></div></div><div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-200"><div className="rounded-2xl bg-white/10 p-3">任务识别</div><div className="rounded-2xl bg-white/10 p-3">员工分配</div><div className="rounded-2xl bg-white/10 p-3">结果汇总</div></div></div><div className="col-span-12 rounded-3xl border border-white/10 bg-white/[.07] p-5 lg:col-span-5"><div className="mb-4 text-xs font-bold text-slate-400">Platform Capacity</div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-950/35 p-3"><div className="text-2xl font-black text-white">24+</div><div className="text-xs text-slate-400">AI员工</div></div><div className="rounded-2xl bg-slate-950/35 p-3"><div className="text-2xl font-black text-cyan-200">80+</div><div className="text-xs text-slate-400">场景</div></div><div className="rounded-2xl bg-slate-950/35 p-3"><div className="text-2xl font-black text-violet-200">120+</div><div className="text-xs text-slate-400">流程</div></div><div className="rounded-2xl bg-slate-950/35 p-3"><div className="text-2xl font-black text-emerald-200">Skill</div><div className="text-xs text-slate-400">可复制包</div></div></div></div>{[["image","商品图像","PSD / SKU"],["ops","店铺运营","Ozon / PDF"],["video","视频生成","Seedance"],["schedule","日程排班","Calendar"]].map(([type,name,desc])=><div key={name} className="col-span-6 rounded-3xl border border-white/10 bg-white/[.07] p-4 lg:col-span-3"><div className="mb-4 flex items-center justify-between"><Icon type={type} className="h-6 w-6 text-cyan-200"/><span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-cyan-100">Ready</span></div><div className="font-black text-white">{name}</div><div className="mt-1 text-xs text-slate-400">{desc}</div></div>)}</div></div></div>;
}

function EmployeeCard({ emp }) {
  const [key, category, title, sub, desc, tags] = emp;
  return <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,.07)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,.13)]"><div className="mb-5 flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-cyan-200"><Icon type={key} className="h-7 w-7"/></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{category}</span></div><div className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">{sub}</div><h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">{title}</h3><p className="mt-3 min-h-[78px] text-sm leading-7 text-slate-600">{desc}</p><div className="mt-5 flex flex-wrap gap-2">{tags.map(t=><span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{t}</span>)}</div><button className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">详情 <Arrow className="h-4 w-4"/></button></div>;
}

export default function YataiClawPlatformDemo() {
  const [active, setActive] = useState("全部");
  const categories = ["全部", "商品素材", "店铺运营", "数据分析", "内容生成", "流媒体", "组织协同", "供应链", "财税经营", "合规风控"];
  const visible = useMemo(()=> active === "全部" ? employees : employees.filter(e => e[1] === active), [active]);

  return <div id="top" className="min-h-screen scroll-smooth bg-slate-950 text-white"><style>{`html{scroll-behavior:smooth}`}</style><Header />
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#17346d_0%,#07111f_42%,#030712_100%)] pt-20"><div className="pointer-events-none absolute inset-0"><div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"/><div className="absolute top-8 right-12 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl"/><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_72%)]"/></div><main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-32 lg:pt-24"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl"><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,.85)]"/>真正能落地的跨境电商 AI员工平台</div><h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-[-0.055em] text-white md:text-7xl">
              <span className="block uppercase tracking-[-0.035em]">YATAI CLAW</span>
              <span className="mt-3 block bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text text-transparent">助力个人电商创业</span>
              <span className="mt-3 block text-white">最后一公里</span>
            </h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">YATAI Claw 将 Skill 市场、AI员工岗位、火山引擎模型能力与跨境电商工作流结合，形成可复制的创业服务平台。</p><div className="mt-9 flex flex-wrap gap-4"><button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_50px_rgba(34,211,238,.25)]">开始体验 <Arrow className="h-4 w-4"/></button><button className="rounded-full border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur-xl">查看 Skill 市场</button></div><div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 text-sm md:grid-cols-4">{[["24+","AI员工岗位"],["80+","业务场景"],["120+","标准流程"],["Skill","可复制包"]].map(([n,l])=><div key={l} className="rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur"><div className="text-2xl font-black text-white">{n}</div><div className="mt-1 text-xs text-slate-400">{l}</div></div>)}</div></div><HeroConsole /></main></section>

    <section className="relative bg-white py-0 text-slate-950">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid border-x border-slate-100 bg-gradient-to-r from-white via-blue-50/40 to-blue-100/50 md:grid-cols-4">
          {homePillars.map(([title, sub], index) => (
            <div key={title} className={cx("relative px-8 py-8 text-center", index === 0 && "border-t-4 border-blue-600", index > 0 && "border-l border-slate-200/80")}>
              <div className="text-xl font-black tracking-tight text-slate-950">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-500">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-24 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Label>AI EMPLOYEE SHOWCASE</Label>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-slate-950 md:text-6xl">普惠AI员工，灵活调度</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">把复杂的电商岗位能力做成可调用、可编排、可交付的 AI员工，让个人创业者也能拥有一支轻量化数字团队。</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="group relative overflow-hidden rounded-[34px] border border-blue-100 bg-[#f3f8ff] p-8 shadow-[0_24px_70px_rgba(30,64,175,.10)] lg:col-span-8 lg:min-h-[390px]">
            <div className="absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
            <div className="relative grid h-full gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">Lumi-Video-2.0</div>
                <h3 className="text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">商品图转带货视频</h3>
                <p className="mt-5 max-w-sm text-base leading-8 text-slate-600">一张图生成带货视频，自动生成口播脚本、动态字幕和平台化视频任务包。</p>
                <button className="mt-10 inline-flex items-center gap-2 text-lg font-black text-blue-600">立即体验 <Arrow className="h-5 w-5" /></button>
              </div>
              <div className="relative flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="grid h-40 w-40 place-items-center rounded-[28px] bg-gradient-to-br from-orange-100 via-white to-blue-100 shadow-[0_24px_60px_rgba(30,64,175,.14)]">
                    <div className="relative h-24 w-24 rounded-[24px] bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg">
                      <div className="absolute left-5 top-5 h-5 w-12 rounded-full bg-white/70" />
                      <div className="absolute bottom-5 right-5 h-10 w-10 rounded-2xl bg-white/40" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-black text-slate-400">输入商品图</div>
                </div>
                <div className="text-4xl font-black text-blue-500">?</div>
                <div className="text-center">
                  <div className="relative h-56 w-36 overflow-hidden rounded-[32px] border-[6px] border-slate-950 bg-gradient-to-b from-blue-100 to-slate-200 shadow-[0_32px_80px_rgba(15,23,42,.20)]">
                    <div className="absolute inset-x-4 top-6 h-20 rounded-[26px] bg-gradient-to-br from-cyan-300 to-blue-500" />
                    <div className="absolute bottom-6 left-4 right-4 h-20 rounded-[22px] bg-white/75" />
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/65 blur-xl" />
                  </div>
                  <div className="mt-4 text-xs font-black text-slate-400">AI 生成预览</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-[#eef4fb] p-8 shadow-[0_24px_70px_rgba(15,23,42,.08)] lg:col-span-4 lg:min-h-[390px]">
            <div className="absolute right-8 top-8 text-3xl text-slate-400">?</div>
            <div className="relative">
              <div className="mb-8 text-sm font-black text-blue-600">Sales-Coach-Pro</div>
              <h3 className="text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">AI 销冠陪练</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">结合企业私有知识库，实时生成销售话术、异议处理和复盘建议。</p>
              <div className="mt-8 rounded-[26px] bg-white/70 p-5 shadow-sm">
                <div className="mb-4 inline-flex rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">客户觉得价格超预算了...</div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 font-black text-blue-600">销冠建议</div>
                  <div className="space-y-2 text-sm text-slate-600"><div>1. 强调全生命周期脚本增效...</div><div>2. 拆解日均使用成本...</div></div>
                </div>
              </div>
              <button className="mt-8 inline-flex items-center gap-2 text-lg font-black text-blue-600">进入陪练 <Arrow className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-slate-800 bg-[#071126] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,.20)] lg:col-span-4">
            <div className="mb-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700">Live-Avatar-3.0</div>
            <h3 className="text-3xl font-black tracking-[-0.035em]">真人口播数字人</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">24小时代替真人出镜，驱动商品口播、直播预热和多语言讲解。</p>
            <div className="mt-8 grid grid-cols-4 gap-3">
              {["直播", "工厂", "展厅", "门店"].map((item, i) => <div key={item} className="h-36 rounded-[22px] bg-gradient-to-b from-blue-500/40 to-slate-950/60 p-3 text-xs font-black text-cyan-100">{item}</div>)}
            </div>
            <button className="mt-8 inline-flex items-center gap-2 text-lg font-black text-cyan-300">立即克隆 <Arrow className="h-5 w-5" /></button>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-[#f3f7fc] p-8 shadow-[0_24px_70px_rgba(15,23,42,.08)] lg:col-span-4">
            <div className="mb-8 text-sm font-black text-blue-600">AI CS Agent</div>
            <h3 className="text-3xl font-black tracking-[-0.035em] text-slate-950">企业AI客服</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">7×24无休解答产品与服务咨询，融合私有知识库，提升整体满意度。</p>
            <div className="mt-10 rounded-[26px] bg-gradient-to-br from-blue-700 to-cyan-400 p-5 text-white shadow-lg"><div className="rounded-2xl bg-white/15 p-4 text-sm">您好，请问这款商品支持俄罗斯本地发货吗？</div><div className="mt-3 rounded-2xl bg-white/25 p-4 text-sm">支持，可根据店铺库存和物流渠道自动回答。</div></div>
            <button className="mt-8 inline-flex items-center gap-2 text-lg font-black text-blue-600">立即进入 <Arrow className="h-5 w-5" /></button>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-[#f3f7fc] p-8 shadow-[0_24px_70px_rgba(15,23,42,.08)] lg:col-span-4">
            <div className="mb-8 text-sm font-black text-blue-600">Industry-PPT-Gen</div>
            <h3 className="text-3xl font-black tracking-[-0.035em] text-slate-950">行业报告 PPT 生成</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">输入行业关键词，自动生成包含产业图谱与深度分析的专业 PPT。</p>
            <div className="mt-10 rounded-[26px] bg-white/70 p-5 shadow-sm"><div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">输入关键词：跨境电商 AI员工</div><div className="mt-4 rounded-2xl bg-white p-4 text-sm font-black text-slate-700 shadow-sm">YATAI-Claw-产业应用报告.pptx</div></div>
            <button className="mt-8 inline-flex items-center gap-2 text-lg font-black text-blue-600">立即生成 <Arrow className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-24 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Label>INDUSTRY SOLUTIONS</Label>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-slate-950 md:text-6xl">面向行业场景的 AI 解决方案</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">从个人电商创业出发，延展到跨境电商、内容增长、供应链、财税合规和园区服务，形成可复制的 AI员工解决方案矩阵。</p>
        </div>
        <div className="relative">
          <button className="absolute left-[-26px] top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,.14)] lg:flex">?</button>
          <div className="flex snap-x gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none]">
            {industrySolutions.map(([title, pain, solution, gradient]) => (
              <div key={title} className={cx("relative min-h-[520px] w-[320px] shrink-0 snap-center overflow-hidden rounded-[34px] bg-gradient-to-br p-7 text-white shadow-[0_26px_80px_rgba(15,23,42,.18)]", gradient)}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(255,255,255,.24),transparent_34%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="relative">
                  <h3 className="text-3xl font-black tracking-[-0.035em]">{title}</h3>
                  <div className="mt-8 border-l border-white/55 pl-4 text-base font-bold leading-8 text-white/90">{pain}</div>
                  <p className="mt-7 text-base leading-8 text-white/78">{solution}</p>
                </div>
                <button className="absolute bottom-8 left-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/18 px-5 py-3 text-sm font-black text-white backdrop-blur">查看方案 <Arrow className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <button className="absolute right-[-26px] top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,.14)] lg:flex">?</button>
        </div>
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 text-lg font-black text-slate-800">查看所有解决方案 <Arrow className="h-5 w-5" /></button>
        </div>
      </div>
    </section>

    <section id="skills" className="bg-white py-20 text-slate-950"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><Label>AI EMPLOYEE MARKET</Label><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">岗位即服务，能力即应用</h2></div><p className="max-w-xl leading-7 text-slate-600">把电商经营中的岗位能力模块化，像选择应用一样选择 AI员工，按场景组合成可落地的业务流程。</p></div><div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-500 lg:w-[360px]"><Search className="h-5 w-5"/><span className="text-sm font-medium">搜索 AI员工 / 场景 / Skill</span></div><div className="flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setActive(c)} className={cx("rounded-full px-4 py-2 text-sm font-black transition", active===c ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100")}>{c}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map(e=><EmployeeCard key={e[2]} emp={e}/>)}</div></div></section>

    <section id="market" className="bg-slate-50 py-20 text-slate-950"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><Label>SKILL DOCK</Label><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">能力沉淀为包，服务可以复制</h2></div><p className="max-w-xl leading-7 text-slate-600">每个 AI员工都可以沉淀为标准化能力包，配套说明、样例、接口和运行规则，便于园区、社区和服务商批量复制。</p></div><div className="grid gap-5 lg:grid-cols-4">{skillCards.map(([name,title,desc,cmd])=><div key={name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-cyan-200">{name}</div><h3 className="text-xl font-black">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-600">{desc}</p><div className="mt-5 rounded-2xl bg-slate-950 p-3 text-xs font-bold leading-6 text-cyan-100">{cmd}</div></div>)}</div></div></section>

    <section id="models" className="relative overflow-hidden bg-[#eef5ff] py-24 text-slate-950"><div className="pointer-events-none absolute inset-0"><div className="absolute left-[-220px] top-[-180px] h-[520px] w-[520px] rounded-full bg-blue-300/30 blur-3xl"/><div className="absolute right-[-160px] top-0 h-[560px] w-[560px] rounded-full bg-cyan-300/30 blur-3xl"/></div><div className="relative mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><Label>VOLCENGINE MODEL LAYER</Label><h2 className="mt-3 text-4xl font-black tracking-[-0.045em] md:text-5xl">模型能力做底座，业务场景做出口</h2></div><p className="max-w-xl leading-8 text-slate-600">将图像、视频、语言、多模态、语音和检索能力，封装成跨境电商 AI员工工作流，让模型能力直接服务经营动作。</p></div><div className="overflow-hidden rounded-[42px] border border-blue-100/80 bg-white/80 shadow-[0_35px_120px_rgba(30,64,175,.18)] backdrop-blur-2xl"><div className="grid lg:grid-cols-[.9fr_1.6fr]"><div className="border-b border-blue-100/70 bg-white/70 p-8 lg:border-b-0 lg:border-r lg:p-12"><div className="mb-8 inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-black tracking-[0.2em] text-white">VOLCENGINE / ARK</div><h3 className="text-3xl font-black leading-tight tracking-[-0.035em] md:text-4xl">从大模型能力，落地为跨境电商 AI员工</h3><p className="mt-5 text-sm leading-8 text-slate-600">模型负责生成、理解、检索与推理；YATAI Claw 负责把模型能力转译成商品、运营、内容、数据和协同岗位能力。</p><div className="mt-10 grid grid-cols-2 gap-4">{[["AIGC","内容生成"],["RAG","知识增强"],["API","开放集成"],["Agent","AI员工"]].map(([a,b])=><div key={a} className="rounded-[26px] border border-blue-100 bg-white p-5 shadow-[0_16px_42px_rgba(37,99,235,.08)]"><div className="mb-4 grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-blue-600 to-cyan-400 text-lg font-black text-white">{a}</div><div className="text-lg font-black">{b}</div></div>)}</div></div><div className="relative bg-[radial-gradient(circle_at_50%_10%,rgba(37,99,235,.18),transparent_32%),linear-gradient(135deg,#f7fbff,#edf5ff_52%,#e3efff)] p-6 lg:p-10"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{models.map(([name,type,desc,tag],i)=><div key={name} className="min-h-[248px] rounded-[30px] border border-white/90 bg-white/78 p-7 shadow-[0_20px_58px_rgba(37,99,235,.13)] backdrop-blur-xl"><div className="mb-7 flex justify-center"><div className="relative grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-400 text-white shadow-[0_24px_48px_rgba(37,99,235,.26)]"><span className="text-3xl font-black">{["?","?","D","?","?","?"][i]}</span></div></div><div className="text-[26px] font-black leading-tight tracking-[-0.03em]">{name}</div><div className="mt-2 text-lg font-black text-blue-700">{type}</div><p className="mt-5 min-h-[68px] text-base leading-8 text-slate-600">{desc}</p><div className="mt-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{tag}</div></div>)}</div></div></div></div></div></section>

    <section id="channels" className="bg-white py-20 text-slate-950"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-10"><Label>ECOSYSTEM</Label><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">多入口接入，多场景运行</h2><p className="mt-5 max-w-2xl leading-8 text-slate-600">不改变企业现有工具习惯，把 AI员工接入聊天、表格、系统和平台，让员工在熟悉入口中调用能力。</p></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">{channels.map(c=><div key={c} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center font-black text-slate-700 shadow-sm">{c}</div>)}</div></div></section>

    <section id="quickstart" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <div>
          <Label dark>IMPLEMENTATION PATH</Label>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">从展示体验，到真实运营</h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-300">这一屏不再强调代码安装，而是展示平台如何交付给个人创业者、运营团队和园区服务方，形成可演示、可试用、可落地的服务路径。</p>
          <div className="mt-8 grid gap-4">
            {[["01", "业务诊断", "梳理经营阶段、店铺情况、商品资料和团队分工。"], ["02", "AI员工配置", "选择商品、运营、内容、数据、供应链和协同岗位能力。"], ["03", "工作流接入", "接入飞书、表格、Ozon API、PSD 模板、PDF 报告和模型服务。"], ["04", "看板运营", "沉淀日报、报告、任务、素材和经营指标，持续复盘优化。"]].map(([n, t, d]) => (
              <div key={n} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[.06] p-5">
                <div className="font-black text-cyan-200">{n}</div>
                <div><div className="font-black">{t}</div><div className="mt-1 text-sm text-slate-400">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <div className="rounded-[34px] border border-white/10 bg-white/[.07] p-7 shadow-[0_26px_80px_rgba(0,0,0,.28)]">
            <div className="mb-5 text-sm font-black text-cyan-200">SERVICE PACKAGE</div>
            <h3 className="text-3xl font-black tracking-tight">个人电商创业服务包</h3>
            <p className="mt-4 leading-8 text-slate-300">面向一人公司和轻团队，提供从工具、模板、AI员工到运营 SOP 的组合式服务。</p>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {["AI员工工作台", "商品上新模板", "店铺巡检报告", "内容生成任务包", "经营数据看板", "日程协同提醒"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[.07] p-4 text-sm font-bold text-slate-200"><Check className="h-4 w-4 text-cyan-200" />{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-blue-600/30 to-cyan-400/10 p-7">
            <div className="text-sm font-black text-cyan-100">DELIVERY RESULT</div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[["7天", "试运营"], ["1套", "创业包"], ["N个", "AI员工"]].map(([num, label]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-4"><div className="text-2xl font-black">{num}</div><div className="mt-1 text-xs text-slate-300">{label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[linear-gradient(135deg,#061026,#0e3d91_55%,#1f7cff)] py-20 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8"><div><h2 className="text-4xl font-black tracking-tight md:text-5xl">把跨境电商岗位能力，变成可复制 AI员工</h2><p className="mt-5 max-w-2xl leading-7 text-blue-100">从单点工具到 Skill 市场，从个人创业到社区化孵化，YATAI Claw 提供跨境电商 AI员工基础设施。</p></div><button className="rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950">申请体验</button></div></section>

    <footer className="bg-slate-950 py-10 text-slate-400"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-8"><div className="flex items-center gap-3 text-white"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 font-black">Y</div><b>YATAI Claw</b></div><div className="text-sm">AI员工 / Skill市场 / 模型底座 / 生态接入 / 快速开始</div></div></footer>
  </div>;
}
