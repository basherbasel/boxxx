import React from 'react';
import { 
  Cpu, 
  Usb, 
  ShieldAlert, 
  Activity, 
  Terminal, 
  Globe, 
  RefreshCw,
  Power,
  ChevronDown,
  Sparkles,
  Zap,
  Wrench,
  Smartphone,
  Radio,
  Flame,
  Cloud,
  Monitor,
  Database,
  RotateCcw,
  Search,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConnectedDevice } from '../types';
import { DEVICE_PRESETS } from '../data/devicePresets';

interface NavbarProps {
  currentDevice: ConnectedDevice;
  onSelectDevice: (device: ConnectedDevice) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isBusy: boolean;
  onEmergencyStop: () => void;
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  onOpenUsbModal: () => void;
  onOpenWindowsInstaller?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDevice,
  onSelectDevice,
  activeTab,
  setActiveTab,
  isBusy,
  onEmergencyStop,
  lang,
  setLang,
  onOpenUsbModal,
  onOpenWindowsInstaller,
  onOpenCommandPalette
}) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = React.useState<string>('smart');

  const navTabs = [
    { id: 'apex-agent', category: 'smart', labelEn: 'ApexAgent AI Multi-Core', labelAr: 'الوكيل الذكي ApexAgent', icon: Cpu, badge: 'PRO v2.0' },
    { id: 'smart-1click', category: 'smart', labelEn: 'Smart 1-Click Studio', labelAr: 'الاستوديو الذكي للضغط الواحدة', icon: Sparkles, badge: 'AUTO 2026' },
    { id: 'dead-boot', category: 'smart', labelEn: 'Dead Boot Recovery', labelAr: 'إحياء الهواتف الميتة', icon: RotateCcw, badge: 'UNBRICK' },
    { id: 'quantum-bypass', category: 'smart', labelEn: 'Quantum Ultra Bypass', labelAr: 'التخطي السريع والفك الفائق', icon: Zap, badge: 'ULTRA 0.4ms' },
    { id: 'frp', category: 'smart', labelEn: 'FRP & Account Bypass', labelAr: 'تخطي الحسابات و FRP', icon: ShieldAlert },
    { id: 'forensic-decrypt', category: 'smart', labelEn: 'Forensic & Data Recovery', labelAr: 'الاسترداد الجنائي وفك التشفير', icon: HardDrive, badge: 'FORENSIC 2026' },

    { id: 'ai-diagnostics', category: 'diagnostics', labelEn: 'AI Diagnostics & Panic', labelAr: 'التشخيص الذكي واللوج', icon: Sparkles },
    { id: 'fault-repair', category: 'diagnostics', labelEn: 'Universal Fault Repair', labelAr: 'مركز إصلاح كافة الأعطال', icon: Wrench, badge: 'PRO' },
    { id: 'ai-oscilloscope', category: 'diagnostics', labelEn: 'AI Oscilloscope 60FPS', labelAr: 'راسم الإشارات والأوسيلوسكوب', icon: Activity, badge: '2.5 GSa/s' },
    { id: 'thermal-rosin', category: 'diagnostics', labelEn: 'Thermal & Rosin Short', labelAr: 'الكاميرا الحرارية وفاحص الشورت', icon: Flame, badge: 'DC INJECT' },

    { id: 'flasher', category: 'advanced', labelEn: 'Multi-ROM Flasher', labelAr: 'تفليش الأنظمة والرومات', icon: Zap },
    { id: 'network', category: 'advanced', labelEn: 'NVRAM & IMEI Repair', labelAr: 'إصلاح الشبكة والسيريال', icon: Activity },
    { id: 'ufs-memory', category: 'advanced', labelEn: 'UFS & eMMC Programmer', labelAr: 'برمجية ذاكرات UFS/eMMC', icon: HardDrive, badge: 'UFS 4.0' },
    { id: 'localization', category: 'advanced', labelEn: 'Language & CSC Switch', labelAr: 'التعريب وتغيير CSC', icon: Globe },
    { id: 'safety', category: 'advanced', labelEn: 'Anti-Brick & Backups', labelAr: 'الحماية والنسخ الاحتياطي', icon: ShieldAlert },
    { id: 'device-reader', category: 'advanced', labelEn: 'Multi-Mode Telemetry', labelAr: 'قارئ الهاتف بكافة الأوضاع', icon: Smartphone },

    { id: 'oem-database', category: 'database', labelEn: '2018-2026 OEM Database', labelAr: 'قاعدة الموديلات الشاملة JSON', icon: Database, badge: 'OEM JSON' },
    { id: 'hardware-workbench', category: 'database', labelEn: 'Hardware & Micro-Soldering', labelAr: 'المخططات والمايكروسولدرينغ', icon: Cpu, badge: 'SCHEMATICS' },
    { id: 'cloud-security', category: 'database', labelEn: '0-Day Cloud & Exploit Hub', labelAr: 'سحابة الثغرات والتحديثات 0-Day', icon: Flame, badge: 'LIVE 2026' },
    { id: 'firmware-matching', category: 'database', labelEn: 'Verified Stock ROMs', labelAr: 'الفلاشات الرسمية المعتمدة', icon: ShieldAlert, badge: 'SHA-256' },
    { id: 'box-emulation', category: 'database', labelEn: 'Native Box & Dongle Tools', labelAr: 'أدوات البوكسات والدونجلات المباشرة', icon: Wrench, badge: 'NATIVE BOX' },
    { id: 'codelab', category: 'database', labelEn: 'Native Protocol Code Lab', labelAr: 'أكواد ومكتبات البروتوكول', icon: Terminal },
  ];

  const categories = [
    { id: 'all', labelEn: 'All Tools', labelAr: 'كل الأدوات', icon: Smartphone, color: 'text-slate-400' },
    { id: 'smart', labelEn: '1-Click & Bypass', labelAr: 'نقرة واحدة وتخطي', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'diagnostics', labelEn: 'AI & Diagnostics', labelAr: 'التشخيص الذكي', icon: Activity, color: 'text-emerald-400' },
    { id: 'advanced', labelEn: 'Programming & Network', labelAr: 'البرمجة والشبكات', icon: Cpu, color: 'text-blue-400' },
    { id: 'database', labelEn: 'Schematics & Cloud', labelAr: 'المخططات وقواعد البيانات', icon: Database, color: 'text-indigo-400' },
  ];

  React.useEffect(() => {
    const activeTabObj = navTabs.find(t => t.id === activeTab);
    if (activeTabObj) {
      setSelectedCategory(activeTabObj.category);
    }
  }, [activeTab]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      const firstTabOfCategory = navTabs.find(tab => tab.category === categoryId);
      if (firstTabOfCategory) {
        setActiveTab(firstTabOfCategory.id);
      }
    }
  };

  const filteredTabs = selectedCategory === 'all' 
    ? navTabs 
    : navTabs.filter(tab => tab.category === selectedCategory);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 text-slate-900 sticky top-0 z-40 shadow-sm">
      {/* Top Bar: Brand & USB Connection Header */}
      <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Cpu className="w-7 h-7 text-white relative z-10" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-2xl tracking-tighter text-slate-900">OMNIFIX</h1>
              <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 shadow-sm">PRO v5.0</span>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NEURAL CLOUD ACTIVE
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5 hidden md:block opacity-80">
              {isAr ? 'منظومة الصيانة الذكية الشاملة لكافة شركات وموديلات الهواتف' : 'Universal Mobile Intelligent Repair Workstation • AI Core Enabled'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 rounded-xl transition-all shadow-sm group"
            >
              <Search className="w-4 h-4 text-cyan-600 group-hover:scale-125 transition-transform" />
              <span className="hidden sm:inline">{isAr ? 'بحث سريع' : 'Quick Command'}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-white text-cyan-600 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenUsbModal}
            className="flex items-center gap-2 px-5 py-2 text-xs font-black bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-cyan-600/20 border border-white/10 transition-all cursor-pointer overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <Usb className="w-4 h-4 text-white animate-pulse relative z-10" />
            <span className="relative z-10">{isAr ? '⚡ اتصال USB فوري' : '⚡ Connect Hardware'}</span>
          </motion.button>

          <div className="relative group">
            <select
              aria-label="Target Test Device"
              value={currentDevice.id}
              onChange={(e) => {
                const found = DEVICE_PRESETS.find(d => d.id === e.target.value);
                if (found) onSelectDevice(found);
              }}
              className="bg-slate-100 text-xs font-black text-slate-700 border border-slate-200 rounded-xl px-4 py-2 pr-10 appearance-none hover:border-cyan-500 focus:outline-none transition-all cursor-pointer shadow-sm"
            >
              {DEVICE_PRESETS.map((dev) => (
                <option key={dev.id} value={dev.id} className="bg-white">
                  [{dev.brand}] {dev.marketName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none group-hover:text-cyan-600 transition-colors" />
          </div>

          <div 
            onClick={onOpenUsbModal}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs font-black transition-all hover:bg-emerald-500/10 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-600 truncate max-w-[120px]">{currentDevice.port}</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Neural Latency</span>
              <span className="text-[11px] font-mono font-black text-emerald-600">0.24ms</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Engine Load</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isBusy ? '85%' : '12%' }}
                    className={`h-full ${isBusy ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]' : 'bg-emerald-500/40'}`} 
                  />
                </div>
                <span className="text-[10px] font-mono font-black text-slate-500">{isBusy ? '85%' : '12%'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[11px] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 font-black transition-all cursor-pointer group shadow-sm"
          >
            <Globe className="w-4 h-4 text-cyan-600 group-hover:rotate-12 transition-transform" />
            <span>{lang === 'en' ? 'ARABIC' : 'ENGLISH'}</span>
          </button>

          <AnimatePresence>
            {isBusy && (
              <motion.button
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                onClick={onEmergencyStop}
                className="flex items-center gap-2 px-4 py-2 text-xs font-black bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-600/40 animate-pulse border border-white/10 cursor-pointer"
              >
                <Power className="w-4 h-4" />
                <span>{isAr ? 'إيقاف' : 'KILL'}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tool Categories Selection Bar */}
      <div className="bg-slate-50/50 px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] shrink-0">
          <Wrench className="w-4 h-4 text-cyan-600" />
          <span>{isAr ? 'الأقسام الرئيسية' : 'Core Systems'}</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-black rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-white text-indigo-600 border-indigo-200 shadow-sm'
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{isAr ? cat.labelAr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="px-6 flex items-center gap-1 overflow-x-auto scrollbar-none py-2 bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-50" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none opacity-50" />
        
        {filteredTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-black rounded-xl whitespace-nowrap transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-inner'
                  : 'text-slate-400 hover:text-slate-600 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-indigo-500/5 blur-lg rounded-xl"
                />
              )}
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
              <span className="relative z-10 uppercase tracking-tighter">{isAr ? tab.labelAr : tab.labelEn}</span>
              {tab.badge && (
                <span className={`px-2 py-0.5 text-[8px] font-black rounded-full border relative z-10 ${
                  tab.id === 'cloud-security' || tab.id === 'quantum-bypass'
                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}>
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </header>
  );
};
