import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, SlidersHorizontal, Loader2, BarChart2 } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';

const reportOptions = [
  { value: 'summary', label: 'Order Summary Report' },
  { value: 'performance', label: 'Delivery Performance Report' },
  { value: 'handover', label: 'Handover Accuracy' },
  { value: 'feedback', label: 'Customer Feedback Overview' },
];

const generateSummaryData = () => [
  { name: 'Mon', orders: 120 }, { name: 'Tue', orders: 150 }, { name: 'Wed', orders: 130 },
  { name: 'Thu', orders: 160 }, { name: 'Fri', orders: 180 }, { name: 'Sat', orders: 200 }, { name: 'Sun', orders: 90 },
];
const generatePerformanceData = () => [
  { name: 'On-Time', value: 450 }, { name: 'Delayed', value: 30 },
];
const generateHandoverData = () => [
  { name: 'Successful', value: 1200 }, { name: 'Missed/Failed', value: 15 },
];
const generateFeedbackData = () => [
  { month: 'Jan', rating: 4.6 }, { month: 'Feb', rating: 4.7 }, { month: 'Mar', rating: 4.5 },
  { month: 'Apr', rating: 4.8 }, { month: 'May', rating: 4.9 }, { month: 'Jun', rating: 4.8 },
];

const COLORS = ['#108BFA', '#F87171'];

function Reports() {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    if (!reportType) return;
    setIsGenerating(true);
    setReportData(null);
    setTimeout(() => {
      let data;
      switch (reportType) {
        case 'summary': data = generateSummaryData(); break;
        case 'performance': data = generatePerformanceData(); break;
        case 'handover': data = generateHandoverData(); break;
        case 'feedback': data = generateFeedbackData(); break;
        default: data = null;
      }
      setReportData(data);
      setIsGenerating(false);
    }, 1500);
  };

  const renderReport = () => {
    if (isGenerating) {
      return <div className="flex flex-col items-center justify-center h-96"><Loader2 className="w-12 h-12 text-taiba-blue animate-spin" /><p className="mt-4 text-taiba-gray font-medium">Generating Report...</p></div>;
    }
    if (!reportData) {
      return <div className="flex flex-col items-center justify-center h-96"><BarChart2 className="w-16 h-16 text-gray-300" /><p className="mt-4 text-taiba-gray font-medium">Select a report type and filters, then click "Generate Report".</p></div>;
    }
    
    switch (reportType) {
      case 'summary':
        return <ResponsiveContainer width="100%" height={400}><BarChart data={reportData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="orders" fill="#108BFA" /></BarChart></ResponsiveContainer>;
      case 'performance':
      case 'handover':
        return <ResponsiveContainer width="100%" height={400}><PieChart><Pie data={reportData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={150} fill="#8884d8" dataKey="value">{reportData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>;
      case 'feedback':
        return <ResponsiveContainer width="100%" height={400}><LineChart data={reportData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis domain={[4, 5]} /><Tooltip /><Legend /><Line type="monotone" dataKey="rating" name="Avg. Customer Rating" stroke="#108BFA" strokeWidth={2} /></LineChart></ResponsiveContainer>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Reports & Analytics</h2>
        <p className="text-sm text-taiba-gray">Analyze order and delivery performance for your store.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-taiba-gray mb-2">Report Type</label>
            <select value={reportType} onChange={(e) => { setReportType(e.target.value); setReportData(null); }} className="input-field">
              <option value="">Select a report</option>
              {reportOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-taiba-gray mb-2">Date Range</label>
            <input type="date" className="input-field" />
          </div>
          <div className="md:col-span-1 flex space-x-2">
            <button onClick={handleGenerateReport} disabled={!reportType || isGenerating} className="w-full flex items-center justify-center space-x-2 btn-primary px-4 py-2 disabled:opacity-50">
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <SlidersHorizontal className="w-5 h-5" />}
              <span>Generate</span>
            </button>
            <button disabled={!reportData} className="w-full flex items-center justify-center space-x-2 bg-taiba-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 min-h-[480px]">
        {renderReport()}
      </div>
    </div>
  );
}

export default Reports;
