import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, SlidersHorizontal, Loader2, BarChart2 } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';

// Mock data for filters
const clusters = ['North Cluster', 'South Cluster', 'East Cluster', 'West Cluster', 'Central Cluster'];
const admins = ['Ahmed Ali', 'Fatima Hassan', 'Mohammed Khan', 'Sara Abdullah', 'Omar Rashid'];
const drivers = ['Driver #12', 'Driver #07', 'Driver #21', 'Driver #03', 'Driver #33', 'Driver #45'];

const reportOptions = [
  { value: 'global', label: 'Global Performance Report' },
  { value: 'cluster', label: 'Cluster-Level Performance' },
  { value: 'driver', label: 'Driver Performance' },
  { value: 'admin', label: 'Admin Efficiency' },
  { value: 'feedback', label: 'Customer Feedback Summary' },
];

// Mock data generation functions
const generateGlobalData = () => [
  { month: 'Jan', successRate: 92, sla: 95 }, { month: 'Feb', successRate: 94, sla: 96 },
  { month: 'Mar', successRate: 95, sla: 97 }, { month: 'Apr', successRate: 93, sla: 94 },
  { month: 'May', successRate: 96, sla: 98 }, { month: 'Jun', successRate: 97, sla: 99 },
];
const generateClusterData = () => [
  { cluster: 'North', avgTime: 35, delayPercent: 5, rejectionPercent: 2 },
  { cluster: 'South', avgTime: 42, delayPercent: 8, rejectionPercent: 3 },
  { cluster: 'East', avgTime: 48, delayPercent: 12, rejectionPercent: 4 },
  { cluster: 'West', avgTime: 39, delayPercent: 6, rejectionPercent: 2 },
  { cluster: 'Central', avgTime: 32, delayPercent: 3, rejectionPercent: 1 },
];
const generateDriverData = () => [
  { driver: 'Driver #12', completed: 152, avgTime: 28, rating: 4.8 },
  { driver: 'Driver #07', completed: 131, avgTime: 35, rating: 4.5 },
  { driver: 'Driver #21', completed: 145, avgTime: 31, rating: 4.7 },
  { driver: 'Driver #03', completed: 110, avgTime: 40, rating: 4.3 },
];
const generateAdminData = () => [
  { admin: 'Ahmed Ali', clustersManaged: 2, escalationRate: 95, avgResolutionTime: 2 },
  { admin: 'Fatima Hassan', clustersManaged: 1, escalationRate: 98, avgResolutionTime: 1.5 },
  { admin: 'Mohammed Khan', clustersManaged: 1, escalationRate: 92, avgResolutionTime: 3 },
];
const generateFeedbackData = () => [
  { month: 'Jan', rating: 4.2 }, { month: 'Feb', rating: 4.4 }, { month: 'Mar', rating: 4.5 },
  { month: 'Apr', rating: 4.3 }, { month: 'May', rating: 4.6 }, { month: 'Jun', rating: 4.7 },
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
        case 'global': data = generateGlobalData(); break;
        case 'cluster': data = generateClusterData(); break;
        case 'driver': data = generateDriverData(); break;
        case 'admin': data = generateAdminData(); break;
        case 'feedback': data = generateFeedbackData(); break;
        default: data = null;
      }
      setReportData(data);
      setIsGenerating(false);
    }, 1500);
  };

  const renderFilters = () => {
    switch (reportType) {
      case 'global':
        return (
          <>
            <input type="date" name="startDate" onChange={handleFilterChange} className="input-field" />
            <input type="date" name="endDate" onChange={handleFilterChange} className="input-field" />
            <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>
          </>
        );
      case 'cluster':
        return (
          <>
            <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>
            <select name="admin" onChange={handleFilterChange} className="input-field"><option value="">All Admins</option>{admins.map(a => <option key={a}>{a}</option>)}</select>
          </>
        );
      case 'driver':
        return (
          <>
            <select name="driver" onChange={handleFilterChange} className="input-field"><option value="">All Drivers</option>{drivers.map(d => <option key={d}>{d}</option>)}</select>
            <select name="cluster" onChange={handleFilterChange} className="input-field"><option value="">All Clusters</option>{clusters.map(z => <option key={z}>{z}</option>)}</select>
          </>
        );
      case 'admin':
        return <select name="admin" onChange={handleFilterChange} className="input-field"><option value="">All Admins</option>{admins.map(a => <option key={a}>{a}</option>)}</select>;
      case 'feedback':
        return (
          <>
            <input type="month" name="period" onChange={handleFilterChange} className="input-field" />
          </>
        );
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
      case 'global':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="successRate" name="Success Rate (%)" stroke="#108BFA" strokeWidth={2} />
              <Line type="monotone" dataKey="sla" name="SLA Met (%)" stroke="#732675" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'cluster':
        return <DataTable columns={[ { header: 'Cluster', accessor: 'cluster' }, { header: 'Avg. Time (min)', accessor: 'avgTime' }, { header: 'Delay %', accessor: 'delayPercent' }, { header: 'Rejection %', accessor: 'rejectionPercent' }]} data={reportData} />;
      case 'driver':
        return <DataTable columns={[ { header: 'Driver', accessor: 'driver' }, { header: 'Completed Orders', accessor: 'completed' }, { header: 'Avg. Time (min)', accessor: 'avgTime' }, { header: 'Avg. Rating', accessor: 'rating' }]} data={reportData} />;
      case 'admin':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="admin" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="escalationRate" name="Escalation Closure Rate (%)" fill="#108BFA" />
              <Bar dataKey="avgResolutionTime" name="Avg. Resolution Time (hrs)" fill="#732675" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'feedback':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[4, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" name="Overall Satisfaction Trend" stroke="#108BFA" strokeWidth={2} />
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
        <p className="text-sm text-taiba-gray">Generate and analyze performance reports across the system.</p>
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
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-taiba-gray mb-2">Filters</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderFilters()}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-4">
          <button onClick={handleGenerateReport} disabled={!reportType || isGenerating} className="w-full md:w-auto flex items-center justify-center space-x-2 btn-primary px-6 py-2 disabled:opacity-50">
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <SlidersHorizontal className="w-5 h-5" />}
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
          </button>
          <button disabled={!reportData} className="w-full md:w-auto flex items-center justify-center space-x-2 bg-taiba-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50">
            <Download className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
          <button disabled={!reportData} className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50">
            <FileText className="w-5 h-5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 min-h-[480px]">
        {renderReport()}
      </div>
    </div>
  );
}

export default Reports;
