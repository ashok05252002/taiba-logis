import React from 'react';
import Modal from '../../../components/common/Modal';
import { UploadCloud, FileText } from 'lucide-react';

function PrescriptionUploadModal({ isOpen, onClose, onSubmit, productName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prescription Required">
      <div className="text-center">
        <FileText className="w-16 h-16 text-taiba-blue mx-auto mb-4" />
        <h3 className="text-lg font-bold text-taiba-gray">
          A valid prescription is required for "{productName}".
        </h3>
        <p className="text-taiba-gray my-4">
          Please upload a clear image of your prescription to proceed.
        </p>

        <div className="my-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
          <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-taiba-gray">Click to upload or drag & drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSubmit} className="btn-primary px-6 py-2">
            Submit & Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PrescriptionUploadModal;
