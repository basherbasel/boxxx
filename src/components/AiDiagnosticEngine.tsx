import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  Wrench, 
  FileText, 
  HardDrive, 
  Cpu, 
  Layers, 
  Terminal,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConnectedDevice } from '../types';
import { FaultDecisionTree } from './FaultDecisionTree';
import { HARDWARE_REPAIR_GUIDES } from '../data/hardwareRepairGuides';

const detectHardwareGuideId = (text: string): string => {
  const lower = (text || '').toLowerCase();
  if (lower.includes('charg') || lower.includes('vbus') || lower.includes('type-c') || lower.includes('battery')) {
    return 'charging-vbus-failure';
  }
  if (lower.includes('display') || lower.includes('lcd') || lower.includes('amoled') || lower.includes('backlight') || lower.includes('screen')) {
    return 'display-backlight-oled';
  }
  if (lower.includes('baseband') || lower.includes('ril') || lower.includes('sim') || lower.includes('modem') || lower.includes('imei') || lower.includes('nvram')) {
    return 'baseband-rf-transceiver';
  }
  return 'power-pmic-buck-rail-failure';
};

const HardwarePcbLinkCard: React.FC<{
  guideId: string;
  onNavigateToHardwareRepair?: (guideId: string) => void;
  lang: 'en' | 'ar';
}> = ({ guideId, onNavigateToHardwareRepair, lang }) => {
  const isAr = lang === 'ar';
  const guide = HARDWARE_REPAIR_GUIDES.find(g => g.id === guideId) || HARDWARE_REPAIR_GUIDES[0];

  return (
    <div className="p-3.5 bg-gradient-to-r from-white via-slate-50 to-white border border-indigo-200 rounded-xl space-y-3 shadow-md">
      <div className="flex items-center justify-between border-b border-indigo-100 pb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <h5 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            {isAr ? 'خريطة الـ PCB والخطوات التوجيهية للإصلاح الفيزيائي (Auto-Linked PCB Hardware Guide)' : 'Auto-Linked Hardware PCB & Micro-Soldering Guide'}
          </h5>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-600 border border-amber-200">
          HARDWARE DIAGNOSIS LINKED
        </span>
      </div>

      <div className="space-y-1">
        <h6 className="text-xs font-bold text-slate-900">
          {isAr ? guide.titleAr : guide.titleEn}
        </h6>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          {isAr ? guide.symptomAr : guide.symptomEn}
        </p>
      </div>

      {/* Target Chips & Testpads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="p-2 rounded bg-slate-100 border border-slate-200">
          <span className="text-slate-400 block mb-0.5">{isAr ? 'الآيسيهات المسببة للعطل:' : 'Affected Board Chips:'}</span>
          <span className="text-cyan-700 font-bold">{guide.affectedComponents.join(', ')}</span>
        </div>
        <div className="p-2 rounded bg-slate-100 border border-slate-200">
          <span className="text-slate-400 block mb-0.5">{isAr ? 'حرارة الهوت أير الموصى بها:' : 'Recommended Hot-Air Temp:'}</span>
          <span className="text-amber-700 font-bold">{guide.microSolderingSteps[0]?.hotAirTemp || '350°C - 365°C'}</span>
        </div>
      </div>

      {/* Test points preview */}
      {guide.testPoints?.length > 0 && (
        <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1 font-mono text-[10px]">
          <span className="text-slate-400 font-bold block">{isAr ? 'نقاط فحص الملتيميتر المباشرة (DMM Testpads):' : 'Key Multimeter Test Points:'}</span>
          {guide.testPoints.slice(0, 2).map((tp, idx) => (
            <div key={idx} className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1 last:border-0 last:pb-0">
              <span className="text-cyan-700 font-bold">{tp.name}</span>
              <span className="text-emerald-700 font-bold">Diode: {tp.diodeModeHealthy}</span>
              <span className="text-slate-500">{tp.voltageWorking}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation button */}
      <button
        onClick={() => onNavigateToHardwareRepair?.(guide.id)}
        className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
      >
        <Wrench className="w-4 h-4" />
        <span>
          {isAr
            ? `فتح خريطة الـ PCB والمايكروسولدرينغ التفاعلية لـ (${guide.affectedComponents[0] || 'Hardware'})`
            : `OPEN INTERACTIVE PCB BITMAP & DMM WORKBENCH (${guide.affectedComponents[0] || 'Hardware'})`}
        </span>
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
      </button>
    </div>
  );
};

interface AiDiagnosticEngineProps {
  device: ConnectedDevice;
  onApplyFix: (fixCommand: string) => void;
  onNavigateToHardwareRepair?: (guideId?: string) => void;
  onNavigateToFirmwareMatch?: () => void;
  isBusy: boolean;
  lang: 'en' | 'ar';
}

const SAMPLE_LOGS = {
  kernel_panic: `[   14.281902] c1   1042 Unable to handle kernel NULL pointer dereference at virtual address 0000000000000048
[   14.281920] c1   1042 Mem abort info:
[   14.281925] c1   1042   ESR = 0x96000005
[   14.281931] c1   1042   EC = 0x25: DABT (current EL), IL = 32 bits
[   14.281936] c1   1042   SET = 0, FnV = 0
[   14.281941] c1   1042   EA = 0, S1PTW = 0
[   14.281946] c1   1042   FSC = 0x05: level 1 translation fault
[   14.281951] c1   1042 Data abort info:
[   14.281956] c1   1042   ISV = 0, ISS = 0x00000005
[   14.281961] c1   1042   CM = 0, WnR = 0
[   14.281969] c1   1042 Internal error: Oops: 96000005 [#1] PREEMPT SMP
[   14.281977] c1   1042 Modules linked in: qcom_q6v5_pas qcom_q6v5 qcom_common smd_rpm msm_drm
[   14.282045] c1   1042 CPU: 1 PID: 1042 Comm: system_server Tainted: G        W  O      5.15.123-android14-9-g8a9 #1
[   14.282052] c1   1042 Hardware name: Qualcomm Technologies, Inc. SM8650 (DT)
[   14.282058] c1   1042 pstate: 60400005 (nZCv daif +PAN -UAO -TCO -DIT -SSBS BTYPE=--)
[   14.282067] c1   1042 pc : q6v5_wcss_start+0x88/0x1a4 [qcom_q6v5]
[   14.282078] c1   1042 lr : qcom_subdev_start+0x4c/0x90
[   14.282210] c1   1042 Kernel panic - not syncing: Fatal exception in interrupt`,
  
  dm_verity: `[    2.109281] init: [libfs_avb] [AVB Failed]: Error verifying vbmeta digest (hash mismatch).
[    2.109310] init: [libfs_avb] super partition hash tree root 9a4f8b2c does not match vbmeta struct.
[    2.109335] init: Failed to verify partition 'system' with error -2.
[    2.109350] init: Entering recovery mode: RED STATE (Your device has failed verification and may not work properly).
[    2.109380] init: Halting system boot. Bootloader lock state: LOCKED. Rollback index: 2`,

  baseband_null: `09-19 15:21:04.120   890  1204 E RILC    : RIL_onRequestComplete: [0012] < GET_SIM_STATUS failed with E_RADIO_NOT_AVAILABLE
09-19 15:21:04.122   890  1204 E QMI_RIL : qmi_err=0x000e (QMI_ERR_DEVICE_NOT_READY)
09-19 15:21:04.125   890  1204 E QC-QMI  : [qmi_client] open failed: /dev/subsys_modem not responding
09-19 15:21:04.130  1042  1042 E TelephonyRegistry: notifyRadioPowerStateChanged: RADIO_POWER_UNAVAILABLE
09-19 15:21:04.135  1042  1042 W PhoneGlobals: Baseband version query returned NULL or UNKNOWN.
09-19 15:21:04.140  1042  1042 E ImeiProvider: read_nv_item(NV_UE_IMEI_I) failed: NV_NOT_ALLOCATED (EFS corrupted)`
};

export const AiDiagnosticEngine: React.FC<AiDiagnosticEngineProps> = ({
  device,
  onApplyFix,
  onNavigateToHardwareRepair,
  onNavigateToFirmwareMatch,
  isBusy,
  lang
}) => {
  const isAr = lang === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'COPILOT' | 'DECISION_TREE' | 'LOG_ANALYZER'>('COPILOT');
  const [logText, setLogText] = useState(SAMPLE_LOGS.kernel_panic);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // MasterFix Copilot Query State
  const [copilotQuery, setCopilotQuery] = useState(
    isAr 
      ? `[Samsung Galaxy S24 Ultra SM-S928B] + [العرض: الهاتف لا يشحن نهائياً وميت] + [سحب التيار على الباور سبلاي 0.00A ثابت]`
      : `[Samsung Galaxy S24 Ultra SM-S928B] + [Symptom: Dead phone, no charge] + [Current draw: 0.00A on DC Power Supply]`
  );
  const [copilotDomain, setCopilotDomain] = useState<'HARDWARE' | 'SOFTWARE' | 'NETWORK' | 'ANTI_BRICK'>('HARDWARE');
  const [isCopilotConsulting, setIsCopilotConsulting] = useState(false);
  const [copilotResponse, setCopilotResponse] = useState<any>(null);

  const handleCopilotConsult = async () => {
    if (!copilotQuery.trim()) return;
    setIsCopilotConsulting(true);
    setCopilotResponse(null);

    try {
      const response = await fetch('/api/ai/copilot-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: copilotQuery,
          deviceContext: device,
          domainType: copilotDomain,
          lang
        })
      });

      const data = await response.json();
      if (data.success && data.result) {
        setCopilotResponse(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCopilotConsulting(false);
    }
  };

  const handleDiagnose = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logContent: logText,
          deviceContext: device,
          logType: 'Kernel Panic / Logcat',
          lang
        })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 perspective-1000 preserve-3d">
      {/* Subtab navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-slate-950/40 backdrop-blur-3xl border border-white/10 p-3 rounded-[2rem] flex-wrap gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] preserve-3d"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubTab('COPILOT')}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border ${
              activeSubTab === 'COPILOT'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl'
                : 'text-slate-500 border-transparent hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'المساعد الذكي MasterFix' : 'MasterFix Copilot'}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('DECISION_TREE')}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border ${
              activeSubTab === 'DECISION_TREE'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl'
                : 'text-slate-500 border-transparent hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'شجرة القرار' : 'Decision Tree'}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('LOG_ANALYZER')}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border ${
              activeSubTab === 'LOG_ANALYZER'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl'
                : 'text-slate-500 border-transparent hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'تحليل السجلات' : 'Log Analyzer'}</span>
          </button>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">
            MASTERFIX PRO v5.2
          </span>
        </div>
      </motion.div>

      {activeSubTab === 'COPILOT' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Prompt Templates and Guidelines Box */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 10 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl space-y-8 relative overflow-hidden preserve-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-8 flex-wrap gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tight leading-tight">
                    {isAr ? 'استشارة خبير الصيانة MasterFix AI' : 'MasterFix AI Field Copilot'}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-black uppercase tracking-widest opacity-60">
                    {isAr ? 'تشخيص فوري للأعطال المعقدة في الميدان' : 'Query format: [Brand] + [Symptom] + [DC Draw/Error]'}
                  </p>
                </div>
              </div>

              {/* Domain Switcher */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest shadow-inner">
                {[
                  { id: 'HARDWARE', labelAr: 'هاردوير', labelEn: 'Hardware' },
                  { id: 'SOFTWARE', labelAr: 'سوفتوير', labelEn: 'Software' },
                  { id: 'NETWORK', labelAr: 'شبكة', labelEn: 'Network' },
                  { id: 'ANTI_BRICK', labelAr: 'حماية', labelEn: 'Safety' },
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setCopilotDomain(d.id as any)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      copilotDomain === d.id 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                    }`}
                  >
                    {isAr ? d.labelAr : d.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Template Fillers */}
            <div className="flex items-center gap-3 flex-wrap relative z-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{isAr ? 'نماذج جاهزة:' : 'Presets:'}</span>
              {[
                { 
                  icon: '🔌', 
                  label: isAr ? 'عطل شحن' : 'Charging',
                  domain: 'HARDWARE',
                  query: isAr 
                    ? `[Samsung S24 Ultra] + [لا يشحن ويسخن] + [سحب 0.05A ثابت]`
                    : `[Samsung S24 Ultra] + [No charging, heating] + [0.05A stuck]`
                },
                { 
                  icon: '⚠️', 
                  label: isAr ? 'بوتلوب' : 'Bootloop',
                  domain: 'SOFTWARE',
                  query: isAr 
                    ? `[Samsung A54] + [معلق على الشعار بعد تحديث] + [Red State]`
                    : `[Samsung A54] + [Bootloop after OTA] + [Red State]`
                },
                { 
                  icon: '📶', 
                  label: isAr ? 'فقدان شبكة' : 'Network',
                  domain: 'NETWORK',
                  query: isAr 
                    ? `[Xiaomi Redmi Note 13] + [طوارئ فقط] + [WTR 1.0V inquiry]`
                    : `[Xiaomi Redmi Note 13] + [Emergency Only] + [WTR 1.0V inquiry]`
                }
              ].map((p, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCopilotDomain(p.domain as any);
                    setCopilotQuery(p.query);
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-indigo-600 font-black uppercase tracking-widest flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Technician Field Query Input */}
            <div className="space-y-4 relative z-10">
              <div className="relative group">
                <textarea
                  value={copilotQuery}
                  onChange={(e) => setCopilotQuery(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 text-slate-900 text-sm p-6 rounded-[2rem] border border-slate-200 focus:outline-none focus:border-indigo-500 font-mono resize-none leading-relaxed shadow-inner group-hover:border-slate-300 transition-all"
                  placeholder={isAr 
                    ? '[اسم الجهاز] + [العرض] + [سحب التيار]'
                    : '[Model] + [Symptom] + [DC Draw]'}
                />
                <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
                  <Terminal className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopilotConsult}
                disabled={isCopilotConsulting || !copilotQuery.trim()}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all border border-white/20 flex items-center justify-center gap-4"
              >
                <Sparkles className={`w-5 h-5 ${isCopilotConsulting ? 'animate-spin' : 'animate-pulse'}`} />
                <span>
                  {isCopilotConsulting
                    ? (isAr ? 'جاري التحليل...' : 'ANALYZING FAULT...')
                    : (isAr ? 'طلب التشخيص من MasterFix' : 'CONSULT AI EXPERT')}
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* MasterFix AI Structured Response Card */}
          {copilotResponse && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl space-y-8 relative overflow-hidden preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-6 flex-wrap gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-widest leading-tight">
                    {isAr ? 'تقرير التشخيص الهندسي المعتمد' : 'Verified Engineering Diagnostic Report'}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black uppercase tracking-widest italic shadow-sm">
                    DOMAIN: {copilotResponse.category || copilotDomain}
                  </span>
                </div>
              </div>

              {/* 4 Required Response Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* 1. Problem Diagnosis & Root Cause */}
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 hover:border-indigo-200 transition-all shadow-inner">
                  <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Search className="w-4 h-4" />
                    <span>{isAr ? 'التشخيص والسبب الجذري' : 'Root Cause Analysis'}</span>
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    {copilotResponse.problemDiagnosis?.includes(':') 
                      ? copilotResponse.problemDiagnosis.split(':').slice(1).join(':').trim() 
                      : copilotResponse.problemDiagnosis}
                  </p>
                </div>

                {/* 2. Required Tools & Measurements */}
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 hover:border-amber-300 transition-all shadow-inner">
                  <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Wrench className="w-4 h-4" />
                    <span>{isAr ? 'الأدوات والقياسات المطلوبة' : 'Tools & Measurements'}</span>
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed font-mono italic">
                    {copilotResponse.requiredTools?.includes(':') 
                      ? copilotResponse.requiredTools.split(':').slice(1).join(':').trim() 
                      : copilotResponse.requiredTools}
                  </p>
                </div>
              </div>

              {/* 3. Step-by-Step Action Plan */}
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6 relative z-10 shadow-inner hover:border-emerald-300 transition-all">
                <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>{isAr ? 'خطة العمل والإصلاح المتسلسلة' : 'Step-by-Step Action Plan'}</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.isArray(copilotResponse.actionPlan) ? (
                    copilotResponse.actionPlan.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[10px] shrink-0 font-mono shadow-inner">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] text-slate-600 leading-relaxed font-medium">{step}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-700 leading-relaxed col-span-2 italic">{copilotResponse.actionPlan}</p>
                  )}
                </div>
              </div>

              {/* 4. Safety & Prevention Warnings */}
              <div className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100 space-y-4 relative z-10 hover:border-rose-200 transition-all shadow-inner">
                <h5 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'تحذيرات السلامة والوقاية' : 'Safety & Prevention'}</span>
                </h5>
                <p className="text-sm text-rose-900/80 leading-relaxed italic">
                  {copilotResponse.safetyWarnings?.includes(':') 
                    ? copilotResponse.safetyWarnings.split(':').slice(1).join(':').trim() 
                    : copilotResponse.safetyWarnings}
                </p>
              </div>

              {/* Hardware PCB Map Auto-Linked Card */}
              {copilotDomain === 'HARDWARE' && (
                <div className="relative z-10 preserve-3d">
                  <HardwarePcbLinkCard
                    guideId={detectHardwareGuideId(`${copilotResponse.problemDiagnosis} ${copilotResponse.category}`)}
                    onNavigateToHardwareRepair={onNavigateToHardwareRepair}
                    lang={lang}
                  />
                </div>
              )}

              {/* Dynamic Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap pt-4 relative z-10">
                {copilotDomain === 'HARDWARE' && (
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigateToHardwareRepair?.()}
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Wrench className="w-5 h-5" />
                    <span>{isAr ? 'فتح مخططات البوردة والمايكروسولدرينغ' : 'OPEN HARDWARE WORKBENCH'}</span>
                  </motion.button>
                )}

                {copilotDomain === 'SOFTWARE' && (
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigateToFirmwareMatch?.()}
                    className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-cyan-600/20 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{isAr ? 'مطابقة الفلاشة وحماية ARB' : 'MATCH VERIFIED FIRMWARE'}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      ) : activeSubTab === 'DECISION_TREE' ? (
        <div className="animate-in fade-in duration-500">
          <FaultDecisionTree
            onNavigateToSoftwareRepair={(cmd) => {
              if (cmd) onApplyFix(cmd);
            }}
            onNavigateToHardwareRepair={onNavigateToHardwareRepair}
            onNavigateToFirmwareMatch={onNavigateToFirmwareMatch}
            lang={lang}
          />
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Top Storage & Memory Health Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: HardDrive, 
                labelEn: 'STORAGE HEALTH', 
                labelAr: 'صحة الذاكرة', 
                valueEn: `${device.storageType} (98%)`, 
                valueAr: `${device.storageType} (98%)`,
                status: 'HEALTHY',
                color: 'indigo'
              },
              { 
                icon: ShieldCheck, 
                labelEn: 'AVB 2.0 / VERITY', 
                labelAr: 'حماية النظام', 
                valueEn: 'Hash Integrity OK', 
                valueAr: 'سلامة الهاش مؤكدة',
                status: 'ENFORCING',
                color: 'cyan'
              },
              { 
                icon: Activity, 
                labelEn: 'RIL MODEM SUBSYSTEM', 
                labelAr: 'نظام المودم والشبكة', 
                valueEn: device.basebandVersion || 'Online', 
                valueAr: device.basebandVersion || 'متصل',
                status: 'ACTIVE',
                color: 'purple'
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[2rem] p-6 flex items-center justify-between shadow-md hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 border border-${stat.color}-100 shadow-sm`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{isAr ? stat.labelAr : stat.labelEn}</span>
                    <span className="text-xs font-black text-slate-900 uppercase italic">{isAr ? stat.valueAr : stat.valueEn}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-${stat.color}-50 text-${stat.color}-600 border border-${stat.color}-100`}>
                  {stat.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Main Diagnostic Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch preserve-3d">
            {/* Left Col: Raw Log Input */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[2.5rem] p-8 shadow-xl space-y-8 relative overflow-hidden preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-6 relative z-10">
                <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <span>{isAr ? 'مدخل سجلات Logcat' : 'Logcat / Kernel Backtrace'}</span>
                </h4>

                <div className="flex items-center gap-2">
                  {['Kernel', 'dm-verity', 'Baseband'].map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setLogText(i === 0 ? SAMPLE_LOGS.kernel_panic : i === 1 ? SAMPLE_LOGS.dm_verity : SAMPLE_LOGS.baseband_null)}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                rows={14}
                className="w-full bg-slate-100 text-slate-800 font-mono text-[11px] p-6 rounded-[2rem] border border-slate-200 focus:outline-none focus:border-indigo-500 resize-none shadow-inner leading-relaxed"
                placeholder="Paste logs here..."
              />

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDiagnose}
                disabled={isAnalyzing || !logText.trim()}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all border border-indigo-400 flex items-center justify-center gap-4"
              >
                <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>
                  {isAnalyzing ? (isAr ? 'جاري التحليل...' : 'ANALYZING...') : (isAr ? 'بدء تشخيص العطل' : 'START DIAGNOSIS')}
                </span>
              </motion.button>
            </motion.div>

            {/* Right Col: AI Diagnostics Result */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-transparent to-transparent pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100 shadow-sm">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-widest">
                      {isAr ? 'تقرير التشخيص الهندسي' : 'Diagnostic Output'}
                    </h4>
                  </div>

                  {analysisResult?.severity && (
                    <span className="px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-black uppercase tracking-widest italic shadow-sm">
                      {analysisResult.severity}
                    </span>
                  )}
                </div>

                {analysisResult ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{isAr ? 'ملخص التنفيذي' : 'EXECUTIVE SUMMARY'}</span>
                      <p className="text-xs text-slate-800 leading-relaxed italic">{analysisResult.summary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">CULPRIT</span>
                        <span className="text-indigo-600 font-black text-[10px] font-mono">{analysisResult.culpritModule}</span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">RISK</span>
                        <span className="text-amber-600 font-black text-[10px] font-mono">{analysisResult.riskAssessment}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{isAr ? 'خطوات الإصلاح الموصى بها' : 'RECOMMENDED FIX STEPS'}</span>
                      <div className="space-y-2">
                        {analysisResult.recommendedSteps?.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 text-[11px] text-slate-600 shadow-sm">
                            <span className="text-indigo-600 font-black font-mono">{idx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-24 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto border border-slate-100">
                      <Sparkles className="w-10 h-10 text-slate-300 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] italic">
                      {isAr ? 'بانتظار تحليل السجلات...' : 'AWAITING LOG INPUT...'}
                    </p>
                  </div>
                )}
              </div>

              {analysisResult && (
                <motion.button
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onApplyFix(analysisResult.exactFastbootOrAdbCommands?.[0] || 'fastboot reboot')}
                  disabled={isBusy}
                  className="w-full mt-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all border border-emerald-400 flex items-center justify-center gap-4"
                >
                  <Wrench className="w-5 h-5" />
                  <span>{isAr ? 'تطبيق خطة الإصلاح' : 'EXECUTE REPAIR'}</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Full-screen Neural Processing Overlay */}
      <AnimatePresence>
        {(isCopilotConsulting || isAnalyzing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 noise-layer opacity-5 pointer-events-none" />
            <div className="relative text-center space-y-12 max-w-lg px-8">
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full"
                />
                <div className="relative w-32 h-32 mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-indigo-500/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-2 border-dashed border-cyan-500/30 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-indigo-600 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[0.4em] italic">
                  {isAr ? 'جاري معالجة البيانات' : 'NEURAL PROCESSING'}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ x: [-200, 200] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    />
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                  {isAr 
                    ? 'يتم الآن مطابقة السجلات مع قاعدة بيانات الثغرات السحابية... فك تشفير مسارات الهاردوير... محاكاة خطة الإصلاح'
                    : 'MATCHING LOGS WITH CLOUD VULNERABILITY REPOSITORY... DECODING HARDWARE PATHS... SIMULATING REPAIR PIPELINE'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
