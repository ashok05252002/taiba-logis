import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ArrowLeft, Edit, MapPin, Calendar, FileText, CheckCircle, XCircle, 
    User, Clock, Shield, Activity, Phone, Trash2, Download, ExternalLink,
    Navigation, CreditCard, Image as ImageIcon, Briefcase
} from 'lucide-react';
import { deliveryManagementData } from '../../../data/mockData';

function DeliveryPersonDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const person = deliveryManagementData.find(p => p.id === id);

    if (!person) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <User className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-taiba-gray">Delivery Person Not Found</h2>
                <p className="text-gray-500 mt-2 mb-6">The requested delivery person ID does not exist.</p>
                <button onClick={() => navigate(-1)} className="btn-primary flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back</span>
                </button>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const StatusBadge = ({ status, type = 'default' }) => {
        const styles = {
            Verified: 'bg-green-100 text-green-700 border-green-200',
            Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            Rejected: 'bg-red-100 text-red-700 border-red-200',
            Suspended: 'bg-gray-100 text-gray-700 border-gray-200',
            Available: 'bg-blue-100 text-blue-700 border-blue-200',
            Busy: 'bg-purple-100 text-purple-700 border-purple-200',
            Offline: 'bg-gray-100 text-gray-600 border-gray-200',
        };
        
        const label = type === 'availability' 
            ? (person.is_busy ? 'Busy' : (person.is_available ? 'Available' : 'Offline'))
            : status;

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 w-fit ${styles[label] || styles.Suspended}`}>
                {label === 'Verified' && <CheckCircle className="w-3 h-3" />}
                {label === 'Pending' && <Clock className="w-3 h-3" />}
                {label === 'Rejected' && <XCircle className="w-3 h-3" />}
                <span>{label}</span>
            </span>
        );
    };

    const DocumentCard = ({ title, fileName, type }) => (
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white group">
            <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {type === 'image' ? <ImageIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                {fileName ? (
                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" /> Uploaded
                    </span>
                ) : (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full">Missing</span>
                )}
            </div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}</h4>
            <p className="text-xs text-gray-500 truncate mb-4" title={fileName || 'No file uploaded'}>
                {fileName || 'No file uploaded'}
            </p>
            <div className="flex space-x-2">
                <button disabled={!fileName} className="flex-1 flex items-center justify-center space-x-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                </button>
                <button disabled={!fileName} className="flex-1 flex items-center justify-center space-x-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start space-x-5">
                        <button onClick={() => navigate(-1)} className="mt-1 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-taiba-blue to-taiba-purple rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {person.name.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${person.is_available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
                                <StatusBadge status={person.status} />
                            </div>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> ID: {person.id}</span>
                                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {person.profession || 'Driver'}</span>
                                <span className="flex items-center"><CreditCard className="w-4 h-4 mr-1.5" /> National ID: {person.national_id}</span>
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Joined: {new Date(person.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-4 flex space-x-3">
                                <StatusBadge type="availability" />
                                {person.is_busy && <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">On Delivery</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Activity & Verification */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <div className="flex items-center space-x-2 mb-4">
                                <Shield className="w-5 h-5 text-taiba-purple" />
                                <h3 className="font-bold text-gray-800">Verification Status</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Verified By</span>
                                    <span className="text-sm font-medium text-gray-900">{person.verified_by || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Verified At</span>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(person.verified_at)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-gray-500">Linked User ID</span>
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{person.user_id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <div className="flex items-center space-x-2 mb-4">
                                <Activity className="w-5 h-5 text-taiba-purple" />
                                <h3 className="font-bold text-gray-800">Recent Activity</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="w-0.5 h-full bg-gray-100 mx-auto my-1"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Last Check-in</p>
                                        <p className="text-sm font-medium text-gray-900">{formatDate(person.checked_in_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Last Check-out</p>
                                        <p className="text-sm font-medium text-gray-900">{formatDate(person.checked_out_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-taiba-purple" />
                                <h3 className="font-bold text-gray-800">Documents & Proofs</h3>
                            </div>
                            <button className="text-sm text-taiba-blue font-medium hover:underline">Download All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <DocumentCard title="Driver License" fileName={person.driver_license} type="image" />
                            <DocumentCard title="Driver Photo" fileName={person.driver_photo} type="image" />
                            {person.proofs && person.proofs.map((proof, idx) => (
                                <DocumentCard key={idx} title={`Proof #${idx + 1}`} fileName={proof} type="file" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Location */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 overflow-hidden">
                        <div className="p-5 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-taiba-purple" />
                                <h3 className="font-bold text-gray-800">Live Location</h3>
                            </div>
                        </div>
                        <div className="relative h-64 bg-gray-100 group cursor-pointer">
                            {/* Mock Map Background */}
                            <div className="absolute inset-0 bg-[url('https://i.ibb.co/K2z63q5/map-placeholder.png')] bg-cover bg-center opacity-60"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-ping absolute"></div>
                                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/50 shadow-sm">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-mono text-gray-600">{person.current_latitude}, {person.current_longitude}</span>
                                    <span className="text-blue-600 font-bold flex items-center">
                                        <Navigation className="w-3 h-3 mr-1" /> Track
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">Updated: {formatDate(person.last_location_update)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-800 mb-4">System Metadata</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Created At</span>
                                <span className="font-medium">{formatDate(person.created_at)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Last Updated</span>
                                <span className="font-medium">{formatDate(person.updated_at)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Database ID</span>
                                <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{person.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryPersonDetails;
