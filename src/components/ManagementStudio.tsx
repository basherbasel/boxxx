import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Package, 
  BarChart3, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { RepairTicket, ClientRecord, InventoryItem, BusinessAnalytics, TicketStatus } from '../types';

export function ManagementStudio({ lang }: { lang: 'en' | 'ar' }) {
  const [activeSubTab, setActiveSubTab] = useState<'tickets' | 'clients' | 'inventory' | 'analytics'>('analytics');

  // Mock Data
  const [tickets] = useState<RepairTicket[]>([
    {
      id: 'TCK-2026-001',
      clientId: 'C-001',
      clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      deviceModel: 'Galaxy S26 Ultra',
      imei: '3589412093842026',
      faultDescription: lang === 'ar' ? 'تخطي حماية KG وتحديث النظام' : 'KG Bypass & System Update',
      estimatedCost: 150,
      deposit: 50,
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      createdAt: '2026-09-20 10:30',
      updatedAt: '2026-09-20 14:15',
      technicianName: 'Apex Agent AI',
      partsUsed: []
    },
    {
      id: 'TCK-2026-002',
      clientId: 'C-002',
      clientName: lang === 'ar' ? 'سارة خالد' : 'Sara Khaled',
      deviceModel: 'iPhone 17 Pro Max',
      imei: '35194019283742026',
      faultDescription: lang === 'ar' ? 'تغيير شاشة أصلية' : 'Original Screen Replacement',
      estimatedCost: 450,
      deposit: 200,
      status: 'AWAITING_PARTS',
      priority: 'NORMAL',
      createdAt: '2026-09-19 16:45',
      updatedAt: '2026-09-20 09:00',
      technicianName: 'Samer Tech',
      partsUsed: [{ partId: 'SCR-IP17PM', name: 'iPhone 17 PM OLED', cost: 300 }]
    }
  ]);

  const analytics: BusinessAnalytics = {
    totalRevenue: 12500,
    totalProfit: 4800,
    ticketsCompleted: 142,
    averageRepairTime: 45, // mins
    topFaults: [
      { fault: lang === 'ar' ? 'تخطي FRP' : 'FRP Bypass', count: 54 },
      { fault: lang === 'ar' ? 'إصلاح بوت ميت' : 'Dead Boot Repair', count: 32 },
      { fault: lang === 'ar' ? 'تغيير شاشات' : 'Screen Replace', count: 28 }
    ]
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'AWAITING_PARTS': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Sub-Header Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4">
        {[
          { id: 'analytics', icon: BarChart3, label: lang === 'ar' ? 'الإحصائيات' : 'Analytics' },
          { id: 'tickets', icon: FileText, label: lang === 'ar' ? 'تذاكر الإصلاح' : 'Repair Tickets' },
          { id: 'clients', icon: Users, label: lang === 'ar' ? 'العملاء' : 'Clients' },
          { id: 'inventory', icon: Package, label: lang === 'ar' ? 'المخزن' : 'Inventory' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-medium ${
              activeSubTab === tab.id 
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeSubTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue', value: `$${analytics.totalRevenue}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: lang === 'ar' ? 'الأرباح الصافية' : 'Net Profit', value: `$${analytics.totalProfit}`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: lang === 'ar' ? 'عمليات مكتملة' : 'Completed', value: analytics.ticketsCompleted, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: lang === 'ar' ? 'متوسط وقت الإصلاح' : 'Avg Time', value: `${analytics.averageRepairTime}m`, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                    <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" />
                  {lang === 'ar' ? 'تحليل الأعطال الأكثر شيوعاً' : 'Top Fault Analysis'}
                </h3>
                <div className="space-y-4">
                  {analytics.topFaults.map((f, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-700">{f.fault}</span>
                        <span className="text-slate-500">{f.count} {lang === 'ar' ? 'حالة' : 'cases'}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${(f.count / analytics.ticketsCompleted) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  {lang === 'ar' ? 'توزيع تذاكر اليوم' : 'Daily Ticket Mix'}
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-slate-600 flex-1">{lang === 'ar' ? 'قيد العمل' : 'In Progress'}</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-sm text-slate-600 flex-1">{lang === 'ar' ? 'انتظار قطع' : 'Waiting Parts'}</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-slate-600 flex-1">{lang === 'ar' ? 'مكتمل' : 'Completed'}</span>
                    <span className="font-bold">28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-96">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={lang === 'ar' ? 'بحث عن تذكرة، عميل، أو IMEI...' : 'Search ticket, client, or IMEI...'}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-bold shadow-lg shadow-indigo-200">
                <Plus size={18} />
                {lang === 'ar' ? 'تذكرة إصلاح جديدة' : 'New Repair Ticket'}
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 font-bold text-slate-700">{lang === 'ar' ? 'التذكرة' : 'Ticket ID'}</th>
                    <th className="px-6 py-4 font-bold text-slate-700">{lang === 'ar' ? 'العميل / الجهاز' : 'Client / Device'}</th>
                    <th className="px-6 py-4 font-bold text-slate-700">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="px-6 py-4 font-bold text-slate-700">{lang === 'ar' ? 'التكلفة' : 'Cost'}</th>
                    <th className="px-6 py-4 font-bold text-slate-700">{lang === 'ar' ? 'الفني' : 'Technician'}</th>
                    <th className="px-6 py-4 font-bold text-slate-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-indigo-600">{t.id}</div>
                        <div className="text-[10px] text-slate-400">{t.createdAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{t.clientName}</div>
                        <div className="text-xs text-slate-500">{t.deviceModel}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">
                        ${t.estimatedCost}
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs font-medium">
                        {t.technicianName}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-bold text-xs">
                          {lang === 'ar' ? 'تفاصيل' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'inventory' && (
          <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-4">
            <Package size={48} className="opacity-20" />
            <p className="font-medium">{lang === 'ar' ? 'سيتم ربط المخزن آلياً بمعدات الإصلاح قريباً' : 'Inventory will be linked to repair tools soon'}</p>
          </div>
        )}

        {activeSubTab === 'clients' && (
          <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-4">
            <Users size={48} className="opacity-20" />
            <p className="font-medium">{lang === 'ar' ? 'إدارة سجلات العملاء والولاء' : 'Manage client records and loyalty'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
