import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, SlidersHorizontal, Loader2, BarChart2 } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';

// Mock data for filters
const clusters = ['North Cluster', 'Central Cluster'];
const incharges = ['Fatima Hassan', 'Omar Rashid', 'Aisha Ibrahim'];
const drivers = ['Khalid Ibrahim', 'Noura Saad', 'Fahad Al-Mutairi'];

const reportOptions = [
  { value: 'cluster', label: 'Cluster Performance' },
  { value: 'incharge', label: 'Cluster Incharge Activity' },
  { value: 'driver', label: 'Delivery Partner Activity' },
  { value: 'feedback', label: 'Customer Feedback Summary' },
];

// Mock data generation functions
const generateClusterData = () => [
  { cluster: 'North Cluster', completed: 312, delayed: 27, failed: 5, sla: 96 },
  { cluster: 'Central Cluster', completed: 450, delayed: 15, failed: 2, sla: 98 },
];
const generateInchargeData = () => [
  { incharge: 'Fatima Hassan', deliveries: 150, rejectionPercent: 2, avgTime: 38 },
  { incharge: 'Omar Rashid', deliveries: 210, rejectionPercent: 1, avgTime: 32 },
];
const generateDriverData = () => [
  { driver: 'Khalid Ibrahim', checkIns: 22, completed: 152, avgTime: 28 },
  { driver: 'Noura Saad', checkIns: 21, completed: 131, avgTime: 35 },
];
const generateFeedbackData = () => [
  { month: 'Jan', rating: 4.5 }, { month: 'Feb', rating: 4.6 }, { month: 'Mar', rating: 4.5 },
  { month: 'Apr', rating: 4.7 }, { month: 'May', rating: 4.8 }, { month: 'Jun', rating: 4.7 },
];


function Reports() {
  const [reportType, setReportType] = useState('');
  const [filters, setFilters] = useState({});
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerateReport = () => {
    if (!reportType) return;
    setIsGenerating(true);
    setReportData(null);

    setTimeout(() => {
      let data;
      switch (reportType) {
        case 'cluster': data = generateClusterData(); break;
        case 'incharge': data = generateInchargeData(); break;
        case 'driver': data = generateDriverData(); break;
        case 'feedback': data = generateFeedbackData(); break;
        default: data = null;
      }
      setReportData(data);
      setIsGenerating(false);
    }, 1500);
  };

  const renderFilters = () => {
    switch (reportType) {
      case 'cluster':
        return <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>;
      case 'incharge':
        return <select name="incharge" onChange={handleFilterChange} className="input-field"><option value="">All Incharges</option>{incharges.map(i => <option key={i}>{i}</option>)}</select>;
      case 'driver':
        return (
          <>
            <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>
            <select name="driver" onChange={handleFilterChange} className="input-field"><option value="">All Drivers</option>{drivers.map(d => <option key={d}>{d}</option>)}</select>
          </>
        );
      case 'feedback':
        return <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>;
      default:
        return <p className="text-sm text-taiba-gray col-span-full">Please select a report type to see available filters.</p>;
    }
  };

  const renderReport = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-taiba-blue animate-spin" />
          <p className="mt-4 text-taiba-gray font-medium">Generating Report...</p>
        </div>
      );
    }

    if (!reportData) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <BarChart2 className="w-16 h-16 text-gray-300" />
          <p className="mt-4 text-taiba-gray font-medium">Select a report type and filters, then click "Generate Report".</p>
        </div>
      );
    }
    
    switch (reportType) {
      case 'cluster':
        return <DataTable columns={[ { header: 'Cluster', accessor: 'cluster' }, { header: 'Completed', accessor: 'completed' }, { header: 'Delayed', accessor: 'delayed' }, { header: 'Failed', accessor: 'failed' }, { header: 'SLA Met (%)', accessor: 'sla' }]} data={reportData} />;
      case 'incharge':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="incharge" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deliveries" name="Total Deliveries" fill="#108BFA" />
              <Bar dataKey="avgTime" name="Avg. Delivery Time (min)" fill="#732675" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'driver':
        return <DataTable columns={[ { header: 'Driver', accessor: 'driver' }, { header: 'Shift Check-ins', accessor: 'checkIns' }, { header: 'Completed Orders', accessor: 'completed' }, { header: 'Avg. Time (min)', accessor: 'avgTime' }]} data={reportData} />;
      case 'feedback':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[4, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" name="Customer Feedback Trend" stroke="#108BFA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Reports & Analytics</h2>
        <p className="text-sm text-taiba-gray">Generate and analyze performance reports for your clusters.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-taiba-gray mb-2">Report Type</label>
            <select value={reportType} onChange={(e) => { setReportType(e.target.value); setReportData(null); setFilters({}); }} className="input-field">
              <option value="">Select a report</option>
              {reportOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-taiba-gray mb-2">Filters</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFilters()}
              <input type="date" name="date" onChange={handleFilterChange} className="input-field" />
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col md:flex-row items-center justify-end space-y-2 md:space-y-0 md:space-x-2">
            <button onClick={handleGenerateReport} disabled={!reportType || isGenerating} className="w-full flex items-center justify-center space-x-2 btn-primary px-4 py-2 disabled:opacity-50">
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <SlidersHorizontal className="w-5 h-5" />}
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
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
