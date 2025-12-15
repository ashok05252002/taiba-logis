import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, MapPin, Calendar, FileText, CheckCircle, XCircle, User, Clock, Shield, Activity, Phone } from 'lucide-react';
import { deliveryManagementData } from '../../../data/mockData';

function DeliveryPersonDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const person = deliveryManagementData.find(p => p.id === id);

    if (!person) {
        return (
            <div className="text-center p-12">
                <h2 className="text-xl font-bold text-taiba-gray">Delivery Person Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 btn-primary">Go Back</button>
            </div>
        );
    }

    const InfoCard = ({ title, children, icon: Icon }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-3">
                {Icon && <Icon className="w-5 h-5 text-taiba-purple" />}
                <h3 className="font-bold text-taiba-gray text-lg">{title}</h3>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );

    const InfoRow = ({ label, value, highlight, type = 'text' }) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            {type === 'status' ? (
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${value ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {value ? 'Yes' : 'No'}
                </span>
            ) : (
                <span className={`text-sm font-semibold text-right ${highlight ? 'text-taiba-blue' : 'text-gray-800'}`}>{value || '-'}</span>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-taiba-gray" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-taiba-gray">{person.name}</h2>
                        <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">ID: {person.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                                person.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 
                                person.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                'bg-red-50 text-red-700 border-red-200'
                            }`}>
                                {person.status}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => navigate(`/super-admin/delivery-management/edit/${person.id}`)} 
                    className="flex items-center justify-center space-x-2 btn-secondary px-6 py-2.5"
                >
                    <Edit className="w-4 h-4" />
                    <span>Edit Details</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard title="Personal Information" icon={User}>
                            <InfoRow label="Full Name" value={person.name} />
                            <InfoRow label="User ID" value={person.user_id} />
                            <InfoRow label="National ID" value={person.national_id} />
                            <InfoRow label="Created At" value={new Date(person.created_at).toLocaleDateString()} />
                            <InfoRow label="Last Updated" value={new Date(person.updated_at).toLocaleDateString()} />
                        </InfoCard>

                        <InfoCard title="Status & Activity" icon={Activity}>
                            <InfoRow label="Is Available?" value={person.is_available} type="status" />
                            <InfoRow label="Is Busy?" value={person.is_busy} type="status" />
                            <InfoRow label="Last Check-in" value={person.checked_in_at ? new Date(person.checked_in_at).toLocaleString() : 'N/A'} />
                            <InfoRow label="Last Check-out" value={person.checked_out_at ? new Date(person.checked_out_at).toLocaleString() : 'N/A'} />
                        </InfoCard>
                    </div>

                    <InfoCard title="Documents & Proofs" icon={FileText}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between group hover:border-taiba-blue transition-colors cursor-pointer">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Driver License</p>
                                    <p className="text-xs text-gray-500 mt-1">{person.driver_license || 'Not uploaded'}</p>
                                </div>
                                {person.driver_license ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
                            </div>
                            <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between group hover:border-taiba-blue transition-colors cursor-pointer">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Driver Photo</p>
                                    <p className="text-xs text-gray-500 mt-1">{person.driver_photo || 'Not uploaded'}</p>
                                </div>
                                {person.driver_photo ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
                            </div>
                        </div>
                        
                        {person.proofs && person.proofs.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-700 mb-3">Additional Proofs</p>
                                <div className="flex flex-wrap gap-2">
                                    {person.proofs.map((proof, idx) => (
                                        <div key={idx} className="text-xs text-gray-600 flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                                            <FileText className="w-3 h-3 text-taiba-blue" />
                                            <span>{proof}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </InfoCard>
                </div>

                {/* Right Column - Verification & Location */}
                <div className="space-y-6">
                    <InfoCard title="Verification Details" icon={Shield}>
                        <div className="text-center mb-4">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-2 ${
                                person.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                                {person.status === 'Verified' ? <CheckCircle className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                            </div>
                            <p className="font-bold text-gray-800">{person.status}</p>
                        </div>
                        <InfoRow label="Verified By" value={person.verified_by} />
                        <InfoRow label="Verified At" value={person.verified_at ? new Date(person.verified_at).toLocaleString() : 'Pending'} />
                    </InfoCard>

                    <InfoCard title="Current Location" icon={MapPin}>
                        <div className="bg-blue-50 p-4 rounded-lg mb-4 text-center border border-blue-100">
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Coordinates</p>
                            <p className="text-lg font-mono font-bold text-blue-800">{person.current_latitude || '0.0000'}, {person.current_longitude || '0.0000'}</p>
                        </div>
                        <InfoRow label="Last Update" value={person.last_location_update ? new Date(person.last_location_update).toLocaleString() : 'N/A'} />
                        <div className="mt-4 h-48 bg-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
                            <MapPin className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-gray-500 text-xs font-medium">Map Preview</span>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">View on Map</span>
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
}

export default DeliveryPersonDetails;
