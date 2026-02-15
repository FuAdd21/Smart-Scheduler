const BookingModal = ({ slot, onClose, onCancel }) => {
  if (!slot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform transition-all scale-100">
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Booking Details</h3>
          <button onClick={onClose} className="text-blue-100 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
             <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Time Slot</p>
                <p className="text-lg font-bold text-gray-900">{slot.time}</p>
             </div>
          </div>

          <div className="space-y-3">
             <div>
                <span className="block text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Client Name</span>
                <p className="text-gray-900 font-medium">{slot.client.name}</p>
             </div>
             <div className="border-t border-gray-100 pt-3">
                <span className="block text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Client Email</span>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   {slot.client.email}
                </p>
             </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-gray-700 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition shadow-sm"
          >
            Close
          </button>

          <button
            onClick={() => onCancel(slot)}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
