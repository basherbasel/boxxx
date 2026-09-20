import React from 'react';
import { useWorkstation } from '../../context/WorkstationContext';
import { CentralDashboard } from '../CentralDashboard';
import { ApexAgentDashboard } from '../ApexAgentDashboard';
import { AiDiagnosticEngine } from '../AiDiagnosticEngine';
import { SmartUsbOneClickStudio } from '../SmartUsbOneClickStudio';
import { FlasherWorkspace } from '../FlasherWorkspace';
import { DeadBootRecoveryStudio } from '../DeadBootRecoveryStudio';
import { UltimateFaultRepairHub } from '../UltimateFaultRepairHub';
import { FrpBypassHub } from '../FrpBypassHub';
import { QuantumBypassEngine } from '../QuantumBypassEngine';
import { HardwareMicroSolderingEngine } from '../HardwareMicroSolderingEngine';
import { NetworkNvramStudio } from '../NetworkNvramStudio';
import { UfsMemoryProgrammerStudio } from '../UfsMemoryProgrammerStudio';
import { AiOscilloscopeStudio } from '../AiOscilloscopeStudio';
import { ThermalRosinCameraStudio } from '../ThermalRosinCameraStudio';
import { InteractivePcbBitmapExplorer } from '../InteractivePcbBitmapExplorer';
import { PowerSignatureLab } from '../PowerSignatureLab';
import { IspTestPointHub } from '../IspTestPointHub';
import { MultimeterStudio } from '../MultimeterStudio';
import { OemDatabaseBrowser } from '../OemDatabaseBrowser';
import { FirmwareMatchingService } from '../FirmwareMatchingService';
import { QuickWizardGuide } from '../QuickWizardGuide';
import { ForensicDecryptSuite } from '../ForensicDecryptSuite';
import { ManagementStudio } from '../ManagementStudio';
import { CloudSecurityHub } from '../tools/CloudSecurityHub';

export function ToolCanvas() {
  const { 
    activeTab, 
    lang, 
    currentDevice, 
    isBusy, 
    setIsBusy, 
    setActiveTab, 
    addLog 
  } = useWorkstation();

  const handleApplyFix = (fix: any) => {
    addLog(`Applying Fix: ${fix}`);
  };

  switch (activeTab) {
    case 'dashboard':
      return <CentralDashboard lang={lang} onNavigate={setActiveTab} />;
    case 'apex-agent':
      return <ApexAgentDashboard device={currentDevice} onNavigate={setActiveTab} lang={lang} />;
    case 'ai-diagnostics':
      return (
        <AiDiagnosticEngine 
          device={currentDevice} 
          onApplyFix={handleApplyFix} 
          lang={lang} 
          isBusy={isBusy}
          onNavigateToHardwareRepair={(id) => setActiveTab('pcb-explorer')}
        />
      );
    case 'smart-1click':
      return <SmartUsbOneClickStudio device={currentDevice} lang={lang} onAddLog={addLog} />;
    case 'flasher':
      return (
        <FlasherWorkspace 
          device={currentDevice} 
          lang={lang} 
          isBusy={isBusy}
          onExecuteFlash={(p) => addLog(`Executing Flash Protocol: ${p}`)}
        />
      );
    case 'dead-boot':
      return <DeadBootRecoveryStudio device={currentDevice} lang={lang} onAddLog={addLog} />;
    case 'fault-repair':
      return (
        <UltimateFaultRepairHub 
          device={currentDevice} 
          lang={lang} 
          isBusy={isBusy}
          onExecuteRepairPipeline={(p) => addLog(`Executing Repair Pipeline: ${p.id}`)}
        />
      );
    case 'frp':
      return (
        <FrpBypassHub 
          device={currentDevice} 
          lang={lang} 
          isBusy={isBusy} 
          onExecuteBypass={(m) => addLog(`Executing FRP Bypass: ${m.name}`)} 
        />
      );
    case 'icloud':
      return (
        <QuantumBypassEngine 
          device={currentDevice} 
          lang={lang} 
          isBusy={isBusy}
          onExecuteQuantumBypass={(m) => addLog(`Executing Quantum Bypass: ${m}`)}
        />
      );
    case 'hardware-workbench':
      return <HardwareMicroSolderingEngine device={currentDevice} lang={lang} />;
    case 'network':
      return (
        <NetworkNvramStudio 
          device={currentDevice} 
          lang={lang} 
          isBusy={isBusy}
          onExecuteNvramAction={(a) => addLog(`Executing NVRAM Action: ${a}`)}
        />
      );
    case 'ufs-memory':
      return <UfsMemoryProgrammerStudio device={currentDevice} lang={lang} />;
    case 'ai-oscilloscope':
      return <AiOscilloscopeStudio lang={lang} device={currentDevice} />;
    case 'thermal-rosin':
      return <ThermalRosinCameraStudio lang={lang} device={currentDevice} />;
    case 'pcb-explorer':
      return <InteractivePcbBitmapExplorer lang={lang} device={currentDevice} />;
    case 'power-lab':
      return <PowerSignatureLab lang={lang} />;
    case 'isp-hub':
      return <IspTestPointHub lang={lang} />;
    case 'multimeter':
      return <MultimeterStudio lang={lang} />;
    case 'oem-database':
      return <OemDatabaseBrowser lang={lang} />;
    case 'firmware-matching':
      return (
        <FirmwareMatchingService 
          lang={lang} 
          device={currentDevice} 
          onSelectFirmwareForFlash={(f) => addLog(`Selected Firmware: ${f.osVersion}`)}
        />
      );
    case 'quick-wizard':
      return <QuickWizardGuide lang={lang} setActiveTab={setActiveTab} />;
    case 'forensic-decrypt':
      return <ForensicDecryptSuite lang={lang} device={currentDevice} onAddLog={addLog} isBusy={isBusy} />;
    case 'management':
      return <ManagementStudio lang={lang} />;
    case 'cloud-security':
      return <CloudSecurityHub />;
    default:
      return <CentralDashboard lang={lang} onNavigate={setActiveTab} />;
  }
}
