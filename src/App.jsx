import React, { useState, useEffect } from 'react'

// ── SVG Icons (inline, no external deps) ──
const IconRobot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
  </svg>
)

const IconImage = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
)

const IconStore = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const IconTrending = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const IconBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
)

const IconClipboard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
)

const IconBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ── Agent Card Data ──
const agents = [
  {
    id: 'dispatch',
    title: '总调度智能体',
    desc: '识别用户任务，调度对应智能体执行工作，统一返回结果。',
    tags: ['任务识别', '智能分发', '多智能体协作', '工作流编排'],
    icon: <IconBolt />,
    color: 'from-blue-500 to-indigo-600',
    accent: '#3b82f6',
  },
  {
    id: 'image',
    title: '商品图像智能体',
    desc: '基于 PSD 模板、SKU 表格和商品素材，批量生成跨境电商商品主图。',
    tags: ['批量作图', 'PSD 模板', 'SKU 识别', 'ZIP 回传'],
    icon: <IconImage />,
    color: 'from-violet-500 to-purple-600',
    accent: '#8b5cf6',
  },
  {
    id: 'shop',
    title: '店铺运营智能体',
    desc: '面向 Ozon 店铺的日常运营检查能力，可用于店铺状态、商品体检、库存预警和经营异常分析。',
    tags: ['每日巡检', '商品体检', '库存预警', '订单预警', 'PDF 报告'],
    icon: <IconStore />,
    color: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
  },
  {
    id: 'data',
    title: '经营数据智能体',
    desc: '读取订单导出表，自动分析 GMV、订单数、SKU 销售、成本缺失和价格异常。',
    tags: ['订单分析', 'GMV', 'SKU Top', '成本异常', '经营日报'],
    icon: <IconChart />,
    color: 'from-amber-500 to-orange-600',
    accent: '#f59e0b',
  },
  {
    id: 'selection',
    title: '选品增长智能体',
    desc: '基于市场表格和品牌数据，筛选增长商品、利润机会和风险品类。',
    tags: ['选品评分', '增长分析', '利润筛选', '风险识别'],
    icon: <IconTrending />,
    color: 'from-rose-500 to-red-600',
    accent: '#ef4444',
  },
  {
    id: 'intel',
    title: '市场情报智能体',
    desc: '自动整理跨境电商资讯、平台政策、行业趋势和商品机会。',
    tags: ['资讯采集', '政策摘要', '市场简报', '趋势判断'],
    icon: <IconGlobe />,
    color: 'from-cyan-500 to-sky-600',
    accent: '#06b6d4',
  },
]

const packs = [
  {
    title: '新手启动包',
    target: '刚开始做跨境电商的个人创业者',
    items: ['选品模板', '商品图模板', '基础运营 SOP'],
    icon: <IconRobot />,
  },
  {
    title: '店铺运营包',
    target: '已有 Ozon 店铺的卖家',
    items: ['每日巡检', '库存预警', '订单预警', '经营异常检测'],
    icon: <IconClipboard />,
  },
  {
    title: '商品上新包',
    target: '需要批量上新和批量作图的团队',
    items: ['SKU 表格', '主图模板', '批量出图', '结果 ZIP'],
    icon: <IconBox />,
  },
  {
    title: '数据增长包',
    target: '需要看经营表现和增长机会的卖家',
    items: ['GMV 分析', 'SKU 排行', '成本缺失', '价格异常'],
    icon: <IconTrending />,
  },
]

const cases = [
  {
    title: '商品主图批量生成',
    input: 'SKU 表格 + 产品图 + 系列标识',
    output: '批量 PNG + ZIP',
    color: 'from-violet-500/20 to-purple-500/10',
  },
  {
    title: 'Ozon 店铺每日巡检',
    input: '店铺 API 配置',
    output: '巡检摘要 + PDF 报告',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: '订单经营分析',
    input: '订单导出表',
    output: '销售日报 + SKU 分析 + 成本异常提醒',
    color: 'from-amber-500/20 to-orange-500/10',
  },
]

// ── Navbar ──
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: '首页', href: '#hero' },
    { label: 'AI 应用', href: '#apps' },
    { label: '行业解决方案', href: '#solutions' },
    { label: '跨境电商专区', href: '#packs' },
    { label: '智能体大厅', href: '#agents' },
    { label: '服务支持', href: '#cta' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              YC
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">YATAI</span>
              <span className="text-cyan-400 font-bold text-lg tracking-tight ml-1">Claw</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20"
            >
              进入平台
              <IconArrowRight />
            </a>
            {/* Mobile toggle */}
            <button
              className="lg:hidden text-slate-300 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-white/5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm text-slate-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block text-center py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium"
            >
              进入平台
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

// ── Section Wrapper ──
const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative ${className}`}>
    {children}
  </section>
)

// ── Hero ──
const Hero = () => (
  <Section id="hero" className="min-h-screen flex items-center tech-grid overflow-hidden pt-20">
    {/* Background orbs */}
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI 智能体工作台 · 正式公测中
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            <span className="gradient-text">YATAI Claw</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-medium mt-2">
            跨境电商 AI 公共服务平台
          </p>
          <p className="text-slate-400 leading-relaxed mt-6 max-w-xl text-sm sm:text-base">
            以 AI 智能体重构跨境电商经营流程，为创业者、中小卖家和运营团队提供可直接使用的商品作图、店铺巡检、数据分析、选品增长和市场情报能力。
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#apps"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/25"
            >
              进入 AI 应用大厅
              <IconArrowRight />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
            >
              查看跨境电商解决方案
            </a>
          </div>
        </div>

        {/* Right - Agent Panel */}
        <div className="relative z-10">
          <div className="glass rounded-2xl p-6 sm:p-8 glow-blue">
            <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <IconBolt />
              智能体矩阵
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {agents.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ background: a.accent }}
                    >
                      {a.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{a.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Flow line decoration */}
            <div className="mt-5 flex items-center justify-center gap-1 text-slate-600 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="w-12 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              <span>AI 智能体协作</span>
              <span className="w-12 h-px bg-gradient-to-l from-cyan-500/40 to-transparent" />
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
)

// ── Stats ──
const Stats = () => {
  const stats = [
    { value: '6+', label: 'AI 智能体模块' },
    { value: '20+', label: '跨境电商场景' },
    { value: '30+', label: '标准业务流程' },
    { value: 'N+', label: '可复制创业包' },
  ]

  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── AI Application Center ──
const AppCenter = () => (
  <Section id="apps" className="py-24 tech-grid">
    {/* Background */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
          AI APPLICATIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text">AI 应用中心</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          覆盖跨境电商全链路的 AI 智能体应用，按需选用，即开即用。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((a) => (
          <div
            key={a.id}
            className="glass rounded-xl p-6 card-hover"
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br"
              style={{ background: `linear-gradient(135deg, ${a.accent}dd, ${a.accent}88)` }}
            >
              {a.icon}
            </div>

            <h3 className="text-white font-semibold text-base mb-2">{a.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{a.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {a.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#cta"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center gap-1"
              >
                立即体验
                <IconArrowRight />
              </a>
              <a
                href="#cta"
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                查看详情
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

// ── Solutions ──
const Solutions = () => (
  <Section id="solutions" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
          SOLUTIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text">跨境电商全流程 AI 解决方案</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          从选品到复盘，每一个环节都有对应的智能体支撑。
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-0">
        {[
          { step: '01', label: '选品', agent: '选品增长智能体' },
          { step: '02', label: '商品素材', agent: '商品图像智能体' },
          { step: '03', label: '上架准备', agent: '总调度智能体 + 模板中心' },
          { step: '04', label: '店铺运营', agent: '店铺运营智能体' },
          { step: '05', label: '数据复盘', agent: '经营数据智能体' },
        ].map((item, idx) => (
          <React.Fragment key={item.step}>
            <div className="glass rounded-xl p-5 text-center min-w-[140px] flex-1 max-w-[200px] card-hover">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
                {item.step}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{item.label}</h4>
              <p className="text-slate-500 text-[11px]">{item.agent}</p>
            </div>
            {idx < 4 && (
              <div className="hidden lg:flex items-center text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            )}
            {idx < 4 && <div className="lg:hidden w-px h-6 bg-white/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </Section>
)

// ── OPC Packs ──
const Packs = () => (
  <Section id="packs" className="py-24 tech-grid">
    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          OPC PACKS
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text">OPC 跨境电商创业包</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          为一人公司、轻团队和跨境电商创业者提供标准化启动包，包含 AI 智能体、运营模板、商品图像生产、选品分析、店铺巡检和经营数据分析能力。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {packs.map((p) => (
          <div key={p.title} className="glass rounded-xl p-6 card-hover">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-4">
              {p.icon}
            </div>
            <h3 className="text-white font-semibold text-base mb-1">{p.title}</h3>
            <p className="text-slate-500 text-xs mb-4">适合：{p.target}</p>
            <ul className="space-y-2">
              {p.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-emerald-400 flex-shrink-0">
                    <IconCheck />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

// ── Architecture ──
const Architecture = () => (
  <Section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
          ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text">平台能力架构</h2>
      </div>

      <div className="flex flex-col items-center gap-2">
        {/* Layer 1 - User */}
        <div className="glass rounded-xl px-8 py-4 text-center">
          <div className="text-sm text-white font-medium">用户需求</div>
        </div>

        <div className="text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Layer 2 - Dispatch */}
        <div className="glass rounded-xl px-8 py-4 text-center border-blue-500/30">
          <div className="text-sm text-white font-medium">YATAI Claw 总调度</div>
        </div>

        <div className="text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Layer 3 - Agent Matrix */}
        <div className="glass rounded-xl p-6 w-full max-w-3xl">
          <div className="text-xs text-slate-500 mb-3 text-center font-medium">AI 智能体矩阵</div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {agents.map((a) => (
              <div key={a.id} className="text-center">
                <div className="w-10 h-10 rounded-xl mx-auto mb-1.5 flex items-center justify-center text-white" style={{ background: a.accent }}>
                  {a.icon}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">{a.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Layer 4 - Runtime */}
        <div className="glass rounded-xl p-6 w-full max-w-3xl">
          <div className="text-xs text-slate-500 mb-3 text-center font-medium">Runtime 能力层</div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Ozon API', 'PSD 模板引擎', 'Excel 数据分析', 'PDF 报告生成', 'ArkClaw Skill', '飞书 / 企业协作'].map((r) => (
              <span key={r} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Layer 5 - Output */}
        <div className="glass rounded-xl px-8 py-4 text-center border-cyan-500/30">
          <div className="text-sm text-white font-medium">输出结果</div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {['商品图 ZIP', '巡检报告 PDF', '经营日报', '选品评分表', '资讯简报'].map((o) => (
              <span key={o} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
)

// ── Cases ──
const Cases = () => (
  <Section className="py-24 tech-grid">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
          USE CASES
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text">案例场景</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          真实跨境电商工作场景中的 AI 智能体应用效果。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {cases.map((c) => (
          <div key={c.title} className="glass rounded-xl p-6 card-hover">
            <h3 className="text-white font-semibold text-base mb-4">{c.title}</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">输入</div>
                <div className="text-sm text-slate-300 bg-white/5 rounded-lg px-3 py-2">{c.input}</div>
              </div>
              <div className="flex items-center justify-center text-slate-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">输出</div>
                <div className="text-sm text-emerald-300 bg-emerald-500/10 rounded-lg px-3 py-2">{c.output}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

// ── CTA ──
const CTA = () => (
  <Section id="cta" className="py-24">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="glass rounded-2xl p-10 sm:p-16 text-center glow-blue max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
          用 AI 智能体，启动你的跨境电商经营系统
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
          从一个人开始，用 AI 智能体覆盖跨境电商全流程。不需要组建团队，不需要等待培训。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#apps"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/25"
          >
            进入平台
            <IconArrowRight />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
          >
            申请体验
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
          >
            查看解决方案
          </a>
        </div>
      </div>
    </div>
  </Section>
)

// ── Footer ──
const Footer = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
              YC
            </div>
            <div>
              <span className="text-white font-bold text-base">YATAI</span>
              <span className="text-cyan-400 font-bold text-base ml-1">Claw</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            跨境电商 AI 公共服务平台
          </p>
        </div>
        {[
          {
            title: '平台',
            links: ['AI 应用', '行业解决方案', '智能体大厅', '服务支持', '关于平台'],
          },
          {
            title: '资源',
            links: ['开发文档', 'API 参考', '更新日志', 'FAQ'],
          },
          {
            title: '联系',
            links: ['技术支持', '商务合作', '社区论坛'],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white text-sm font-medium mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} YATAI Claw. All rights reserved.
      </div>
    </div>
  </footer>
)

// ── App ──
export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AppCenter />
        <Solutions />
        <Packs />
        <Architecture />
        <Cases />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
