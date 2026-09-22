import React from 'react';
import { Smartphone, Zap, ShieldCheck, Battery } from 'lucide-react';
import { ConnectedDevice } from '../../types';
import { useWorkstation } from '../../context/WorkstationContext';

interface ConnectedDeviceStatusProps {
  device: ConnectedDevice;
  isBusy: boolean;
  lang: 'en' | 'ar';
}

export function ConnectedDeviceStatus({ device, isBusy, lang }: ConnectedDeviceStatusProps) {
  const isAr = lang === 'ar';
  const { setUsbModalOpen } = useWorkstation();
  
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'EDL_9008': return 'text-amber-500 bg-amber-500/10';
      case 'MTK_BROM': return 'text-purple-500 bg-purple-500/10';
      case 'ADB_ONLINE': return 'text-emerald-500 bg-emerald-500/10';
      case 'FASTBOOT': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div 
      onClick={() => setUsbModalOpen(true)}
      className="flex items-center gap-4 cursor-pointer hover:opacity-90 group transition-opacity"
      title={isAr ? 'انقر لتغيير أو فحص الجهاز المتصل' : 'Click to inspect or change target device'}
    >
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {device.brand} {device.marketName}
          </span>
          <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${getModeColor(device.mode)}`}>
            {device.mode}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Battery size={10} className={device.batteryLevel > 20 ? 'text-emerald-500' : 'text-rose-500'} />
            <span className="text-[9px] font-bold text-slate-500">{device.batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck size={10} className="text-indigo-500" />
            <span className="text-[9px] font-bold text-slate-500">FRP: {device.frpStatus}</span>
          </div>
        </div>
      </div>
      
      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 relative group-hover:border-indigo-500 transition-colors">
        <Smartphone size={20} className="group-hover:scale-110 transition-transform" />
        {isBusy && (
           <div className="absolute inset-0 rounded-xl border-2 border-indigo-500 animate-ping opacity-75" />
        )}
      </div>
    </div>
  );
}
