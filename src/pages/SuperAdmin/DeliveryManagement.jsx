import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';
import { Plus, Edit, Eye, MoreVertical } from 'lucide-react';
import { deliveryManagementData } from '../../data/mockData';
import ManageDeliveryPersonModal from './delivery/ManageDeliveryPersonModal';

function DeliveryManagement() {
    const [deliveries, setDeliveries] = useState(deliveryManagementData);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const navigate = useNavigate();

    const handleAddClick = () => {
        setSelectedPerson(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (person) => {
        setSelectedPerson(person);
        setIsModalOpen(true);
        setOpenActionMenu(null);
    };

    const handleSaveDeliveryPerson = (personData) => {
        if (selectedPerson) {
            // Edit existing
            setDeliveries(prev => prev.map(p => p.id === personData.id ? personData : p));
        } else {
            // Add new
            setDeliveries(prev => [personData, ...prev]);
        }
        setIsModalOpen(false);
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Profession', accessor: 'profession', render: (row) => row.profession || 'Driver' },
        { header: 'National ID', accessor: 'national_id' },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    row.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                    row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                }`}>
                    {row.status}
                </span>
            )
        },
        { 
            header: 'Availability', 
            accessor: 'is_available',
            render: (row) => (
                <div className="flex flex-col space-y-1">
                    <span className={`text-xs font-medium ${row.is_available ? 'text-green-600' : 'text-gray-500'}`}>
                        {row.is_available ? 'Available' : 'Unavailable'}
                    </span>
                    {row.is_busy && <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 rounded w-fit">Busy</span>}
                </div>
            )
        },
        { 
            header: 'Verified By', 
            accessor: 'verified_by',
            render: (row) => (
                <div className="text-xs">
                    <p>{row.verified_by || '-'}</p>
                    {row.verified_at && <p className="text-gray-400">{new Date(row.verified_at).toLocaleDateString()}</p>}
                </div>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="relative">
                    <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {openActionMenu === row.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-20 overflow-hidden">
                            <button 
                                onClick={() => navigate(`/super-admin/delivery-management/view/${row.id}`)} 
                                className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50"
                            >
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                            </button>
                            <button 
                                onClick={() => handleEditClick(row)} 
                                className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50"
                            >
                                <Edit className="w-4 h-4" />
                                <span>Edit Details</span>
                            </button>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Delivery Management</h2>
                        <p className="text-sm text-taiba-gray">Manage delivery personnel, verifications, and status.</p>
                    </div>
                    <button onClick={handleAddClick} className="flex items-center space-x-2 btn-primary px-6 py-2.5">
                        <Plus className="w-5 h-5" />
                        <span>Add Delivery Person</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md">
                    <DataTable columns={columns} data={deliveries} />
                </div>
            </div>

            <ManageDeliveryPersonModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                person={selectedPerson}
                onSave={handleSaveDeliveryPerson}
            />
        </>
    );
}

export default DeliveryManagement;
