import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import DriverFormModal from './components/DriverFormModal';
import DeactivateDriverModal from './components/DeactivateDriverModal';

const initialDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', mobile: '966501234567', vehicle: 'Bike', cluster: 'Cluster A', shift: '9AM-5PM', availability: 'Available', rating: 4.8, status: 'Active' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', mobile: '966504567890', vehicle: 'Car', cluster: 'Cluster B', shift: '1PM-9PM', availability: 'On Delivery', rating: 4.9, status: 'Active' },
    { id: 'D008', name: 'Sami Al-Johani', mobile: '966508889900', vehicle: 'Bike', cluster: 'Cluster A', shift: '9AM-5PM', availability: 'Offline', rating: 4.5, status: 'Inactive' },
];

function DriverManagement() {
    const [drivers, setDrivers] = useState(initialDrivers);
    const [modalState, setModalState] = useState({ form: false, deactivate: false });
    const [selectedDriver, setSelectedDriver] = useState(null);

    const openModal = (modal, driver = null) => {
        setSelectedDriver(driver);
        setModalState({ form: false, deactivate: false, [modal]: true });
    };

    const closeModal = () => {
        setModalState({ form: false, deactivate: false });
        setSelectedDriver(null);
    };

    const handleSaveDriver = (driverData) => {
        if (selectedDriver) {
            setDrivers(drivers.map(d => d.id === driverData.id ? driverData : d));
        } else {
            const newDriver = { ...driverData, id: `D${Math.floor(Math.random() * 900) + 100}`, availability: 'Offline', rating: 0, status: 'Active' };
            setDrivers([newDriver, ...drivers]);
        }
        closeModal();
    };

    const handleDeactivate = () => {
        setDrivers(drivers.map(d => d.id === selectedDriver.id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d));
        closeModal();
    };

    const columns = [
        { header: 'Driver ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Mobile', accessor: 'mobile' },
        { header: 'Vehicle', accessor: 'vehicle' },
        { header: 'Cluster', accessor: 'cluster' },
        { header: 'Shift Hours', accessor: 'shift' },
        { header: 'Availability', accessor: 'availability' },
        { header: 'Rating', accessor: 'rating' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{row.status}</span>
        },
        {
            header: 'Actions', accessor: 'actions',
            render: (row) => (
                <div className="flex space-x-2">
                    <button onClick={() => openModal('form', row)} className="p-2 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => openModal('deactivate', row)} className={`p-2 rounded-full ${row.status === 'Active' ? 'hover:bg-red-100 text-red-500' : 'hover:bg-green-100 text-green-500'}`}>
                        {row.status === 'Active' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Delivery Partner Management</h2>
                        <p className="text-sm text-taiba-gray">Manage all delivery partners within your cluster.</p>
                    </div>
                    <button onClick={() => openModal('form')} className="flex items-center space-x-2 btn-primary px-6 py-2.5">
                        <UserPlus className="w-5 h-5" />
                        <span>Add New Driver</span>
                    </button>
                </div>
                <DataTable columns={columns} data={drivers} />
            </div>
            <DriverFormModal
                isOpen={modalState.form}
                onClose={closeModal}
                driver={selectedDriver}
                onSave={handleSaveDriver}
            />
            <DeactivateDriverModal
                isOpen={modalState.deactivate}
                onClose={closeModal}
                driver={selectedDriver}
                onConfirm={handleDeactivate}
            />
        </>
    );
}

export default DriverManagement;
