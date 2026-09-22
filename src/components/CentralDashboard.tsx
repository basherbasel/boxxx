import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  Wrench, 
  Activity, 
  Database, 
  LayoutDashboard,
  Smartphone,
  Flame,
  Globe,
  HardDrive,
  RotateCcw,
  Terminal,
  Search,
  ArrowRight,
  BookOpen,
  Layers,
  ShieldCheck,
  Scissors,
  Award
} from 'lucide-react';

interface CentralDashboardProps {
  onNavigate: (tabId: string) => void;
  lang: 'en' | 'ar';
}

export const CentralDashboard: React.FC<CentralDashboardProps> = ({ onNavigate, lang }) => {
  const isAr = lang === 'ar';

  const quickActions = [
    { id: 'apex-agent', titleEn: 'AI ApexAgent', titleAr: 'الوكيل الذكي', icon: Cpu, color: 'bg-indigo-500', descEn: 'Autonomous multi-core AI repair assistant.', descAr: 'مساعد إصلاح ذكي متعدد الأنوية.' },
    { id: 'agent-encyclopedia', titleEn: 'Skills Encyclopedia', titleAr: 'موسوعة خبرات الوكيل', icon: BookOpen, color: 'bg-violet-600', descEn: 'Software, Hardware, Low-Level & OS Knowledge.', descAr: 'علوم السوفت وير والهارد وير ولغات البرمجة والأنظمة.' },
    { id: 'smart-1click', titleEn: '1-Click Studio', titleAr: 'استوديو النقرة الواحدة', icon: Sparkles, color: 'bg-emerald-500', descEn: 'Automated unbrick and bypass procedures.', descAr: 'إجراءات الإحياء والتخطي الآلية.' },
    { id: 'fault-repair', titleEn: 'Universal Faults', titleAr: 'إصلاح كافة الأعطال', icon: Wrench, color: 'bg-amber-500', descEn: 'Library of thousands of repair protocols.', descAr: 'مكتبة تضم آلاف بروتوكولات الإصلاح.' },
    { id: 'frp', titleEn: 'FRP Bypass Hub', titleAr: 'تخطي حساب جوجل', icon: ShieldAlert, color: 'bg-rose-500', descEn: 'Advanced account and security removal.', descAr: 'إزالة الحسابات والحماية المتقدمة.' },
  ];

  const categories = [
    { 
      nameEn: 'Diagnostics & Logic', 
      nameAr: 'التشخيص والمنطق',
      tools: [
        { id: 'ai-diagnostics', nameEn: 'AI Diagnostics', nameAr: 'التشخيص الذكي', icon: Activity },
        { id: 'ai-oscilloscope', nameEn: 'Oscilloscope', nameAr: 'الأوسيلوسكوب', icon: Activity },
        { id: 'thermal-rosin', nameEn: 'Thermal Analysis', nameAr: 'التحليل الحراري', icon: Flame },
        { id: 'pcb-explorer', nameEn: 'PCB Explorer', nameAr: 'مستعرض البوردة', icon: LayoutDashboard },
      ]
    },
    { 
      nameEn: 'Programming & Network', 
      nameAr: 'البرمجة والشبكة',
      tools: [
        { id: 'flasher', nameEn: 'Multi-Flasher', nameAr: 'التفليش المتعدد', icon: Zap },
        { id: 'firmware-slicer', nameEn: 'Firmware Slicer', nameAr: 'تقطيع الفلاشات الفوري', icon: Scissors },
        { id: 'network', nameEn: 'IMEI/NVRAM', nameAr: 'الشبكة والسيريال', icon: Globe },
        { id: 'ufs-memory', nameEn: 'UFS/eMMC', nameAr: 'برمجة الذاكرة', icon: HardDrive },
        { id: 'quantum-bypass', nameEn: 'Quantum Bypass', nameAr: 'التخطي الفائق', icon: Zap },
      ]
    },
    { 
      nameEn: 'Research & Data', 
      nameAr: 'الأبحاث والبيانات',
      tools: [
        { id: 'oem-database', nameEn: 'OEM JSON DB', nameAr: 'قاعدة الموديلات', icon: Database },
        { id: 'firmware-matching', nameEn: 'Firmware Hub', nameAr: 'مركز الفلاشات', icon: ShieldAlert },
        { id: 'forensic-cert', nameEn: 'QA Lab Certificate', nameAr: 'شهادات الفحص وضمان الجودة', icon: Award },
        { id: 'hardware-workbench', nameEn: 'Workbench', nameAr: 'بيئة الهاردوير', icon: Cpu },
        { id: 'os-security-lab', nameEn: 'OS & Security Lab', nameAr: 'مختبر نظم التشغيل والحماية', icon: Layers },
        { id: 'codelab', nameEn: 'Protocol Lab', nameAr: 'مختبر الأكواد', icon: Terminal },
      ]
    }
  ];

  return (
    <div className="p-10 space-y-16 bg-slate-50/30 min-h-screen">
      {/* Hero Mission Control Section */}
      <div className="relative overflow-hidden rounded-[3.5rem] bg-slate-950 p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#4f46e522,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/[0.03] to-transparent" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.4em]"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {isAr ? 'نظام التشغيل الهندسي الجيل الخامس' : 'Engineering OS v5.0 Active'}
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
              >
                {isAr ? 'مركز العمليات الذكي' : 'Strategic Mission Control'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-xl leading-relaxed font-medium max-w-xl"
              >
                {isAr ? 'تحكم كامل في كافة أدوات البرمجة، التشخيص، وفك الحمايات عبر واجهة موحدة فائقة السرعة.' : 'Centralized orchestration for programming, diagnostics, and security bypass tools in a high-velocity environment.'}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-5"
            >
              <button 
                onClick={() => onNavigate('apex-agent')}
                className="px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-4"
              >
                <Cpu className="w-4 h-4" />
                {isAr ? 'بدء فحص المنظومة' : 'INITIALIZE SYSTEM SCAN'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('os-security-lab')}
                className="px-8 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(99,102,241,0.4)] hover:-translate-y-1 transition-all backdrop-blur-xl flex items-center gap-3"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                {isAr ? 'مختبر الحمايات ونظم التشغيل' : 'OS & SECURITY LAB'}
              </button>
              <button 
                onClick={() => onNavigate('agent-encyclopedia')}
                className="px-8 py-5 bg-white/10 hover:bg-white/15 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-white/20 transition-all backdrop-blur-xl flex items-center gap-3"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                {isAr ? 'موسوعة خبرات الوكيل واللغات' : 'SKILLS & OS ENCYCLOPEDIA'}
              </button>
              <button className="px-10 py-5 bg-white/5 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl">
                {isAr ? 'إحصائيات الشبكة' : 'NETWORK TELEMETRY'}
              </button>
            </motion.div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="grid grid-cols-2 gap-6 rotate-12 scale-110">
                {[Zap, ShieldAlert, Activity, Database].map((Icon, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, type: 'spring' }}
                    className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl flex items-center justify-center relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Core Operational Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[240px]">
        {/* Large Primary Action */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onClick={() => onNavigate('smart-1click')}
          className="md:col-span-8 md:row-span-2 group relative p-12 bg-white border border-slate-200 rounded-[3rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-indigo-200 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/[0.02] to-transparent pointer-events-none" />
          <div className="w-20 h-20 rounded-[2rem] bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform duration-700 mb-10">
            <Sparkles className="w-10 h-10" />
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              {isAr ? 'استوديو النقرة الواحدة' : 'Smart 1-Click Studio'}
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              {isAr ? 'أقوى محرك للأتمتة لإصلاح الهواتف، تخطي الحمايات، وإحياء الأجهزة الميتة بضغطة زر واحدة.' : 'The most powerful automation engine for repairing phones, bypassing security, and reviving dead devices with a single click.'}
            </p>
          </div>
          <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-500">
            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </motion.button>

        {/* Medium Action */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onClick={() => onNavigate('apex-agent')}
          className="md:col-span-4 md:row-span-1 group relative p-8 bg-slate-900 border border-slate-800 rounded-[3rem] shadow-xl hover:bg-slate-800 transition-all text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6">
            <Cpu className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">AI ApexAgent</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">
            {isAr ? 'فحص ذكي متعدد الأنوية' : 'Multi-Core Neural Inspector'}
          </p>
        </motion.button>

        {/* Small Action 1 */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onClick={() => onNavigate('frp')}
          className="md:col-span-4 md:row-span-1 group relative p-8 bg-white border border-slate-200 rounded-[3rem] shadow-sm hover:shadow-xl transition-all text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mb-6">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1">{isAr ? 'تخطي حساب جوجل' : 'FRP Bypass Hub'}</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Security Protocol</span>
        </motion.button>

        {/* Categories Refined */}
        <div className="md:col-span-12 mt-12 space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-8">
              <div className="flex items-center gap-6">
                <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.6em] whitespace-nowrap">
                  {isAr ? cat.nameAr : cat.nameEn}
                </h2>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {cat.tools.map((tool, toolIdx) => (
                  <button
                    key={toolIdx}
                    onClick={() => onNavigate(tool.id)}
                    className="p-8 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:border-indigo-200 transition-all group flex flex-col items-center text-center gap-5"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all duration-500">
                      <tool.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[12px] font-black text-slate-600 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                      {isAr ? tool.nameAr : tool.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ultra-Precision Footer HUD */}
      <div className="bg-slate-900 border border-white/5 rounded-[4rem] p-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
              <Activity className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{isAr ? 'كفاءة التشغيل' : 'GLOBAL UPTIME'}</span>
              <div className="text-4xl font-black text-white tracking-tighter mt-1">99.998%</div>
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden lg:block" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{isAr ? 'البيانات المعالجة' : 'REPAIRS SYNCED'}</span>
              <div className="text-4xl font-black text-white tracking-tighter mt-1">14.2M+</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className={`w-3 h-12 rounded-full ${i <= 4 ? 'bg-indigo-500' : 'bg-slate-800'}`} />
           ))}
        </div>
      </div>
    </div>
  );
};
