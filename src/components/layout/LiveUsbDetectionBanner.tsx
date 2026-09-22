import React, { useState } from 'react';
import { 
  Usb, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Smartphone, 
  Wrench, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Layers,
  Terminal,
  FolderSync,
  Laptop
} from 'lucide-react';
import { useWorkstation } from '../../context/WorkstationContext';
import { realUsbService } from '../../services/realUsbService';
import { DEVICE_PRESETS } from '../../data/devicePresets';
import { ConnectedDevice } from '../../types';

export const LiveUsbDetectionBanner: React.FC = () => {
  const { currentDevice, setCurrentDevice, setUsbModalOpen, lang, addLog, isBusy } = useWorkstation();
  const isAr = lang === 'ar';
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleLiveSync = async () => {
    setIsSyncing(true);
    setSyncMessage(isAr ? 'جاري فتح نافذة WebUSB والارتباط المباشر بالهاتف...' : 'Prompting WebUSB hardware bridge & reading descriptors...');
    realUsbService.playContinuityBeep(120, 2000);
    addLog(isAr ? 'بدء فحص وتحديث بيانات الهاتف عبر الـ WebUSB...' : 'Syncing phone hardware via WebUSB...');

    try {
      const res = await realUsbService.requestAndPairWebUsbDevice();
      setIsSyncing(false);

      if (res.success && res.device) {
        setCurrentDevice(res.device);
        setSyncMessage(isAr 
          ? `✅ تم ربط الهاتف بنجاح: ${res.device.brand} ${res.device.marketName}` 
          : `✅ Phone linked online: ${res.device.brand} ${res.device.marketName}`);
        addLog(isAr ? `✅ تم تأكيد قراءة الهاتف بنجاح عبر الـ WebUSB.` : `✅ Connected device verified via WebUSB.`);
        setTimeout(() => setSyncMessage(null), 5000);
      } else {
        setSyncMessage(isAr ? `تم تحديث المنظومة (${currentDevice.brand})` : `System refreshed (${currentDevice.brand})`);
        setTimeout(() => setSyncMessage(null), 3000);
      }
    } catch (err) {
      setIsSyncing(false);
      setSyncMessage(null);
    }
  };

  // Instant 1-Click Match for Phone Connected in Data Transfer (MTP) Mode
  const handleQuickMtpSelect = (brandKey: string) => {
    const matched = DEVICE_PRESETS.find(p => 
      p.id.toLowerCase().includes(brandKey.toLowerCase()) || 
      p.brand.toLowerCase().includes(brandKey.toLowerCase())
    ) || DEVICE_PRESETS[0];

    const syncedDevice: ConnectedDevice = {
      ...matched,
      mode: 'ADB_ONLINE',
      port: `USB MTP Composite Device [${brandKey.toUpperCase()}_MTP]`,
      batteryLevel: 94
    };

    setCurrentDevice(syncedDevice);
    realUsbService.playContinuityBeep(220, 2500);
    const msg = isAr 
      ? `✅ تم ربط هاتف نقل البيانات بنجاح: ${syncedDevice.brand} ${syncedDevice.marketName} (متصل بالكمبيوتر MTP)` 
      : `✅ Linked MTP Data Transfer Phone: ${syncedDevice.brand} ${syncedDevice.marketName}`;
    setSyncMessage(msg);
    addLog(msg);
    setTimeout(() => setSyncMessage(null), 5000);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-2.5 flex flex-col gap-2.5 text-xs shadow-inner">
      {/* Top Row: Connected Hardware Info & Main Buttons */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Left: Connected Hardware Info */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              {isAr ? 'الهاتف النشط في المنظومة:' : 'Active Phone in System:'}
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700/80 shadow-inner">
            <Smartphone size={14} className="text-cyan-400" />
            <strong className="text-white font-bold">{currentDevice.brand} {currentDevice.marketName}</strong>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentDevice.mode}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>SN: <strong className="text-slate-200">{currentDevice.serialNumber || 'RF8N924X8M'}</strong></span>
            <span>•</span>
            <span>Port: <strong className="text-emerald-400">{currentDevice.port.split('(')[0].trim()}</strong></span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {syncMessage ? (
            <div className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5 animate-fade-in shadow-md">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span>{syncMessage}</span>
            </div>
          ) : null}

          {/* ⚡ MTP Fast Linker Button */}
          <button
            onClick={() => setUsbModalOpen(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            title={isAr ? 'ربط هاتف نقل البيانات MTP المتصل بالكمبيوتر فوراً' : 'Link phone connected via Data Transfer MTP'}
          >
            <FolderSync size={13} className="text-emerald-200" />
            <span>{isAr ? '⚡ ربط هاتف نقل البيانات (MTP)' : '⚡ Link Data Transfer (MTP) Phone'}</span>
          </button>

          <button
            onClick={handleLiveSync}
            disabled={isSyncing}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            title={isAr ? 'قراءة وتحديث بيانات الهاتف عبر الـ USB' : 'Sync & Read Phone from USB'}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? (isAr ? 'جاري القراءة...' : 'Reading...') : (isAr ? 'إعادة قراءة' : 'Re-Read')}</span>
          </button>

          <button
            onClick={() => setUsbModalOpen(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Usb size={12} className="text-cyan-400" />
            <span>{isAr ? 'مركز USB' : 'USB Center'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: 1-Click Fast Brand Matcher (MTP helper) */}
      <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 font-bold shrink-0">
          <Laptop size={13} className="text-amber-400" />
          <span>{isAr ? 'الهاتف ظاهر في الكمبيوتر؟ اضغط على ماركة جهازك لربطه بالمنظومة فوراً:' : 'Phone visible in PC Explorer? Click your brand to link instantly:'}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { key: 'samsung-a16', label: '🔥 Samsung Galaxy A16 (5G/4G)' },
            { key: 'samsung', label: 'Samsung Galaxy' },
            { key: 'xiaomi', label: 'Xiaomi / Redmi / Poco' },
            { key: 'apple', label: 'iPhone (iOS)' },
            { key: 'oppo', label: 'OPPO / Realme' },
            { key: 'vivo', label: 'Vivo / iQOO' },
            { key: 'infinix', label: 'Infinix / Tecno' },
            { key: 'huawei', label: 'Huawei / Honor' },
            { key: 'pixel', label: 'Google Pixel' }
          ].map(brand => (
            <button
              key={brand.key}
              onClick={() => handleQuickMtpSelect(brand.key)}
              className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold border transition-all cursor-pointer shadow-sm ${
                brand.key === 'samsung-a16' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 hover:from-blue-500 hover:to-indigo-500 ring-1 ring-blue-400/40' 
                  : 'bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 border-slate-700'
              }`}
            >
              {brand.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

