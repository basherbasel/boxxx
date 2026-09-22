import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConnectedDevice, DeviceMode } from '../types';
import { DEVICE_PRESETS } from '../data/devicePresets';

interface WorkstationState {
  activeTab: string;
  currentDevice: ConnectedDevice;
  isBusy: boolean;
  lang: 'en' | 'ar';
  isCommandPaletteOpen: boolean;
  isUsbModalOpen: boolean;
  isWindowsInstallerOpen: boolean;
  isAgentInspectorOpen: boolean;
  terminalLogs: string[];
  cloudStatus: 'online' | 'syncing' | 'updated' | 'offline';
  lastUpdate: string;
}

interface WorkstationContextType extends WorkstationState {
  setActiveTab: (tab: string) => void;
  setCurrentDevice: (device: ConnectedDevice) => void;
  setIsBusy: (busy: boolean) => void;
  setLang: (lang: 'en' | 'ar') => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setUsbModalOpen: (open: boolean) => void;
  setWindowsInstallerOpen: (open: boolean) => void;
  setAgentInspectorOpen: (open: boolean) => void;
  addLog: (log: string) => void;
  clearLogs: () => void;
  requestUsbConnection: () => Promise<void>;
  checkCloudUpdates: () => Promise<void>;
}

const WorkstationContext = createContext<WorkstationContextType | undefined>(undefined);

export function WorkstationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDevice, setCurrentDevice] = useState<ConnectedDevice>(DEVICE_PRESETS[0]);
  const [isBusy, setIsBusy] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isUsbModalOpen, setUsbModalOpen] = useState(false);
  const [isWindowsInstallerOpen, setWindowsInstallerOpen] = useState(false);
  const [isAgentInspectorOpen, setAgentInspectorOpen] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'online' | 'syncing' | 'updated' | 'offline'>('online');
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleDateString());
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[SYSTEM] OmniFix Pro Ultra Engine Initialized...', '[CLOUD] Connection to Neural-Hub Established.']);

  const addLog = (log: string) => setTerminalLogs(prev => [...prev.slice(-49), `[${new Date().toLocaleTimeString()}] ${log}`]);
  const clearLogs = () => setTerminalLogs([]);

  const checkCloudUpdates = async () => {
    setCloudStatus('syncing');
    addLog('Checking for global security patches and device definitions...');
    
    // Simulate API call to fetch latest exploits and models
    await new Promise(r => setTimeout(r, 2000));
    
    addLog('New Samsung Odin-V5 Patch Detected (0-Day)');
    addLog('Xiaomi HyperOS 2.0 Auth Loader Synced.');
    addLog('Apple iOS 18.2 Diagnostic Profiles Updated.');
    
    setCloudStatus('updated');
    setLastUpdate(new Date().toLocaleDateString());
    addLog('System successfully synchronized with OmniFix Global Cloud.');
    
    setTimeout(() => setCloudStatus('online'), 3000);
  };

  // Initial Sync
  React.useEffect(() => {
    checkCloudUpdates();
  }, []);

  const requestUsbConnection = async () => {
    addLog('Initiating Hardware Discovery Protocol...');
    try {
      // In a real environment, navigator.usb would be used
      // For the preview, we simulate the handshake
      if ('usb' in navigator) {
        addLog('WebUSB API Detected. Waiting for user permission...');
        // const device = await (navigator as any).usb.requestDevice({ filters: [] });
        setIsBusy(true);
        setTimeout(() => {
          addLog('Device Handshake Successful: VendorID 0x18D1 ProductID 0x4EE7');
          addLog('Mode: FASTBOOT / ADB Interface Active');
          setIsBusy(false);
        }, 1500);
      } else {
        addLog('Error: WebUSB not supported in this browser. Please use Chrome/Edge.');
      }
    } catch (err) {
      addLog(`Connection Failed: ${err}`);
    }
  };

  return (
    <WorkstationContext.Provider value={{
      activeTab, setActiveTab,
      currentDevice, setCurrentDevice,
      isBusy, setIsBusy,
      lang, setLang,
      isCommandPaletteOpen, setCommandPaletteOpen,
      isUsbModalOpen, setUsbModalOpen,
      isWindowsInstallerOpen, setWindowsInstallerOpen,
      isAgentInspectorOpen, setAgentInspectorOpen,
      terminalLogs, addLog, clearLogs,
      requestUsbConnection,
      cloudStatus, lastUpdate, checkCloudUpdates
    }}>
      {children}
    </WorkstationContext.Provider>
  );
}

export function useWorkstation() {
  const context = useContext(WorkstationContext);
  if (context === undefined) throw new Error('useWorkstation must be used within a WorkstationProvider');
  return context;
}
