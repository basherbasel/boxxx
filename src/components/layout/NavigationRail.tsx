import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Activity, 
  Cpu, 
  Database, 
  Briefcase,
  Settings,
  Usb,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWorkstation } from '../../context/WorkstationContext';

export function NavigationRail() {
  const { lang, activeTab, setActiveTab, requestUsbConnection, isBusy } = useWorkstation();
  const isAr = lang === 'ar';

  const categories = [
    { id: 'dashboard', labelEn: 'Dashboard', labelAr: 'الرئيسية', icon: LayoutDashboard },
    { id: 'cloud-security', labelEn: 'Cloud Intel', labelAr: 'ذكاء السحابة', icon: Globe },
    { id: 'smart', labelEn: '1-Click', labelAr: 'نقرة واحدة', icon: Sparkles },
    { id: 'diagnostics', labelEn: 'AI Logic', labelAr: 'منطق الذكاء', icon: Activity },
    { id: 'advanced', labelEn: 'Pro Tools', labelAr: 'أدوات برو', icon: Cpu },
    { id: 'database', labelEn: 'Resources', labelAr: 'المصادر', icon: Database },
    { id: 'business', labelEn: 'Business', labelAr: 'الأعمال', icon: Briefcase },
  ];

  // Helper to determine active category based on activeTab
  // In a more complex app, we'd store selectedCategory in Context
  // For now, we'll infer it or use the context's tab logic

  return (
    <aside className="w-16 lg:w-20 bg-slate-900 border-r border-white/5 flex flex-col items-center py-6 gap-6 z-50 shrink-0">
      <div className="flex flex-col gap-4 w-full px-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          // Simple logic to highlight the category
          const isActive = activeTab === cat.id || 
            (cat.id === 'smart' && ['smart-1click', 'apex-agent', 'dead-boot', 'frp'].includes(activeTab)) ||
            (cat.id === 'diagnostics' && ['ai-diagnostics', 'fault-repair', 'ai-oscilloscope', 'thermal-rosin'].includes(activeTab)) ||
            (cat.id === 'advanced' && ['flasher', 'network', 'ufs-memory', 'pcb-explorer', 'power-lab'].includes(activeTab)) ||
            (cat.id === 'database' && ['oem-database', 'firmware-matching', 'isp-hub'].includes(activeTab)) ||
            (cat.id === 'business' && activeTab === 'management');

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative group flex flex-col items-center gap-1 py-3 w-full rounded-2xl transition-all"
            >
              {isActive && (
                <motion.div 
                  layoutId="railActive"
                  className="absolute inset-0 bg-indigo-500/10 border-r-2 border-indigo-500 rounded-none"
                />
              )}
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                <Icon size={22} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-tighter transition-all ${isActive ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                {isAr ? cat.labelAr : cat.labelEn}
              </span>

              {/* Tooltip */}
              <div className={`absolute ${isAr ? 'right-full mr-4' : 'left-full ml-4'} px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[100] shadow-xl border border-white/5`}>
                {isAr ? cat.labelAr : cat.labelEn}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-4 w-full px-2">
        <button 
          onClick={requestUsbConnection}
          disabled={isBusy}
          className={`relative group flex flex-col items-center gap-1 py-3 w-full rounded-2xl transition-all ${isBusy ? 'animate-pulse' : ''}`}
        >
          <div className={`p-2 rounded-xl transition-all ${isBusy ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-white bg-white/5'}`}>
            <Usb size={22} />
          </div>
          <span className="text-[7px] font-black uppercase tracking-tighter text-slate-500">USB CONNECT</span>
          
          <div className={`absolute ${isAr ? 'right-full mr-4' : 'left-full ml-4'} px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[100] shadow-xl border border-white/10`}>
            {isAr ? 'بدء اتصال USB حقيقي' : 'Initiate Real USB Handshake'}
          </div>
        </button>

        <button className="p-3 text-slate-500 hover:text-white transition-colors flex justify-center">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
}
