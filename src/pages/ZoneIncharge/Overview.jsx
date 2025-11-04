import React, { useState, useEffect } from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Clock, CheckCircle, UserCheck, Check } from 'lucide-react';
import AssignOrderModal from './components/AssignOrderModal';

const initialOrders = {
  pending: [
    { id: 'ORD771', customer: 'Ali Ahmed', store: 'Main Branch', type: 'Standard', status: 'Pending', cluster: 'Cluster A', date: '2025-08-02' },
    { id: 'ORD772', customer: 'Fatima Khan', store: 'Westside Pharmacy', type: 'Express', status: 'Pending', cluster: 'Cluster B', date: '2025-08-02' },
    { id: 'ORD773', customer: 'Mohammed Ali', store: 'Main Branch', type: 'Standard', status: 'Pending', cluster: 'Cluster A', date: '2025-08-01' },
  ],
  assigned: [
    { id: 'ORD774', customer: 'Noura Saad', store: 'Central Health', type: 'Standard', status: 'Assigned', cluster: 'Cluster B', driver: 'Lina Saad', driverId: 'D010', date: '2025-08-02', assigned_by: 'ZI001', assigned_at: new Date().toISOString(), remarks: 'Awaiting driver confirmation' },
  ],
  ongoing: [
    { id: 'ORD651', customer: 'Sara Hassan', store: 'Main Branch', driver: 'Khalid Ibrahim', driverId: 'D001', eta: '15 min', status: 'In Transit', type: 'Express', date: '2025-08-02', assigned_by: 'ZI001', remarks: 'High priority' },
    { id: 'ORD652', customer: 'Omar Rashid', store: 'Southside Health', driver: 'Aisha Al-Ghamdi', driverId: 'D004', eta: '28 min', status: 'In Transit', type: 'Standard', date: '2025-08-02', assigned_by: 'ZI001', remarks: '' },
  ],
  completed: [
    { id: 'ORD501', customer: 'Aisha Mohamed', store: 'Main Branch', driver: 'Khalid Ibrahim', deliveredAt: '9:45 AM', status: 'Delivered', type: 'Standard', date: '2025-08-02' },
    { id: 'ORD502', customer: 'Yusuf Ibrahim', store: 'Westside Pharmacy', driver: 'Aisha Al-Ghamdi', deliveredAt: '10:15 AM', status: 'Delivered', type: 'Express', date: '2025-08-01' },
  ],
};

const availableDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', cluster: 'Cluster A', availability: 'Available' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', cluster: 'Cluster B', availability: 'On Delivery' },
    { id: 'D009', name: 'Zayn Malik', cluster: 'Cluster A', availability: 'Available' },
    { id: 'D010', name: 'Lina Saad', cluster: 'Cluster B', availability: 'Available' },
];

const clusters = ['Cluster A', 'Cluster B'];

function Overview() {
  const [activeTab, setActiveTab] = useState('pending');
  const [orders, setOrders] = useState(initialOrders);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [filters, setFilters] = useState({
    cluster: 'All',
    date: new Date().toISOString().split('T')[0],
    driver: 'All',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Simulating auto-refresh...");
      setLastUpdated(new Date());
    }, 30000); // Auto-refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const stats = [
    { icon: Package, title: 'Pending', value: orders.pending.length, color: 'orange' },
    { icon: UserCheck, title: 'Assigned', value: orders.assigned.length, color: 'purple' },
    { icon: Clock, title: 'Ongoing', value: orders.ongoing.length, color: 'blue' },
    { icon: CheckCircle, title: 'Completed', value: orders.completed.length, color: 'green' },
  ];

  const openAssignModal = (order, isReassign = false) => {
    setSelectedOrder({...order, isReassign});
    setIsAssignModalOpen(true);
  };

  const handleAssignOrder = (orderId, driverId, remarks, isReassign) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    const zoneInchargeId = 'ZI001'; // Hardcoded for simulation
    const timestamp = new Date().toISOString();

    if (isReassign) {
        const orderToReassign = orders.ongoing.find(o => o.id === orderId);
        const reassignmentLog = {
            zoneInchargeId,
            timestamp,
            driverId,
            clusterId: orderToReassign.cluster,
            orderId,
            remarks: `REASSIGN: ${remarks}`,
        };
        console.log('AUDIT LOG - Reassignment:', reassignmentLog);

        setOrders(prev => ({
            ...prev,
            ongoing: prev.ongoing.map(o => o.id === orderId ? { ...o, driver: driver.name, driverId, remarks } : o)
        }));
    } else {
        const orderToMove = orders.pending.find(o => o.id === orderId);
        
        // Create the audit log record as requested
        const assignmentLog = {
            zoneInchargeId,
            timestamp,
            driverId,
            clusterId: orderToMove.cluster,
            orderId,
            remarks,
        };
        
        // Simulate sending to audit trail
        console.log('AUDIT LOG - Manual Assignment:', assignmentLog);
        
        // Update state with all required fields
        setOrders(prev => ({
            ...prev,
            pending: prev.pending.filter(o => o.id !== orderId),
            assigned: [{ 
                ...orderToMove, 
                driver: driver.name, 
                driverId, // Added driverId
                status: 'Assigned',
                assigned_by: zoneInchargeId, // Using the ID
                assigned_at: timestamp, // Using the captured timestamp
                remarks,
            }, ...prev.assigned]
        }));
    }
    
    console.log(`Notification sent to driver ${driver.name} for order ${orderId}`);
    setIsAssignModalOpen(false);
  };

  const handleDriverAccepts = (orderId) => {
    const orderToMove = orders.assigned.find(o => o.id === orderId);
    console.log(`Driver accepted order ${orderId}. Status updated to In Transit.`);
    setOrders(prev => ({
        ...prev,
        assigned: prev.assigned.filter(o => o.id !== orderId),
        ongoing: [{
            ...orderToMove,
            status: 'In Transit',
            eta: `${Math.floor(Math.random() * 20) + 15} min`, // Random ETA
        }, ...prev.ongoing]
    }));
  };

  const filteredOrders = orders[activeTab].filter(order => {
    const dateMatch = !filters.date || order.date === filters.date;
    const clusterMatch = filters.cluster === 'All' || order.cluster === filters.cluster;
    const driverMatch = filters.driver === 'All' || order.driver === filters.driver;

    if (activeTab === 'pending') return dateMatch && clusterMatch;
    if (activeTab === 'assigned' || activeTab === 'ongoing' || activeTab === 'completed') return dateMatch && driverMatch;
    
    return true;
  });

  const OrderRow = ({ order }) => (
    <div className="grid grid-cols-6 items-center p-4 border-b border-gray-100 hover:bg-gray-50 text-sm text-taiba-gray">
        <span>{order.id}</span>
        <span>{order.customer}</span>
        <span>{order.store}</span>
        <span>{order.driver || order.cluster || order.deliveredAt}</span>
        <span>{order.eta || 'N/A'}</span>
        <div className="flex items-center justify-between">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.type === 'Express' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{order.type}</span>
            {activeTab === 'pending' && <button onClick={() => openAssignModal(order)} className="btn-primary text-xs px-3 py-1">Assign</button>}
            {activeTab === 'assigned' && <button onClick={() => handleDriverAccepts(order.id)} className="flex items-center space-x-1 bg-green-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-green-600"><Check className="w-3 h-3"/><span>Driver Accepts</span></button>}
            {activeTab === 'ongoing' && <button onClick={() => openAssignModal(order, true)} className="btn-secondary text-xs px-3 py-1">Reassign</button>}
            {activeTab === 'completed' && <span className="text-green-600 font-semibold">✓ Delivered</span>}
        </div>
    </div>
  );

  const headers = {
      pending: ['Order ID', 'Customer', 'Store', 'Cluster', 'ETA', 'Actions'],
      assigned: ['Order ID', 'Customer', 'Store', 'Assigned Driver', 'ETA', 'Actions'],
      ongoing: ['Order ID', 'Customer', 'Store', 'Driver', 'ETA', 'Actions'],
      completed: ['Order ID', 'Customer', 'Store', 'Delivered At', 'ETA', 'Actions'],
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-taiba-gray mb-1">Zone Dashboard</h2>
            <p className="text-sm text-taiba-gray">Real-time overview of all deliveries in your zone.</p>
          </div>
          <div className="text-left sm:text-right mt-2 sm:mt-0">
            <p className="text-xs text-gray-500">Last Updated:</p>
            <p className="text-sm font-medium text-taiba-gray">{lastUpdated.toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select name="cluster" value={filters.cluster} onChange={handleFilterChange} className="input-field">
                    <option value="All">All Clusters</option>
                    {clusters.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="input-field" />
                <select name="driver" value={filters.driver} onChange={handleFilterChange} className="input-field">
                    <option value="All">All Drivers</option>
                    {availableDrivers.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 sm:space-x-8 px-2 sm:px-6 overflow-x-auto">
              {['pending', 'assigned', 'ongoing', 'completed'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-2 font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${activeTab === tab ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray hover:text-taiba-blue'}`}>
                  {tab} Orders
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-6 p-4 bg-gray-50 text-xs font-semibold text-taiba-gray uppercase">
                {headers[activeTab].map(h => <span key={h}>{h}</span>)}
            </div>
            <div className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => <OrderRow key={order.id} order={order} />)
              ) : (
                <div className="p-8 text-center text-taiba-gray">No orders match the current filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AssignOrderModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        order={selectedOrder}
        drivers={availableDrivers}
        onAssign={handleAssignOrder}
      />
    </>
  );
}

export default Overview;
