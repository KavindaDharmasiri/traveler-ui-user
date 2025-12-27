import React, { useMemo } from 'react'
import Swal from 'sweetalert2'
import axios from '../../api/axios'
import {API_CONFIG} from "../../../config/environment.js"

export default function Summary({ items = [] }) {
  const { subtotal, serviceFee, bundleSavings, total, itemCount } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const fee = sub * 0.08; // 8% service fee
    const savings = items.length >= 3 ? sub * 0.1 : 0; // 10% bundle savings for 3+ items
    const finalTotal = sub + fee - savings;

    return {
      subtotal: sub.toFixed(2),
      serviceFee: fee.toFixed(2),
      bundleSavings: savings.toFixed(2),
      total: finalTotal.toFixed(2),
      itemCount: items.length
    };
  }, [items]);

  const handleRequestAllItems = async () => {
    if (itemCount === 0) return;

    const result = await Swal.fire({
      title: 'Request All Items?',
      text: `Create orders for all ${itemCount} items in your backpack?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#217964',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, request all!'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${API_CONFIG.BASE_URL}core/api/v1/order/create`, []);
        Swal.fire('Success!', 'All items have been requested successfully!', 'success');
        
        // Refresh backpack items
        window.location.reload();
      } catch (error) {
        console.error('Failed to create orders:', error);
        Swal.fire('Error!', 'Failed to request items. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="sticky top-28 flex flex-col gap-6 rounded-xl bg-white dark:bg-white/5 p-6 shadow-lg border border-slate-200 dark:border-white/10">
        <h3 className="text-xl font-bold text-text-main dark:text-white">Rental Summary</h3>
        <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
                <span className="text-[#64748b] dark:text-gray-400">Subtotal ({itemCount} items)</span>
                <span className="font-medium">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-[#64748b] dark:text-gray-400">Service Fee</span>
                <span className="font-medium">Rs. {serviceFee}</span>
            </div>
            {bundleSavings > 0 && (
                <div className="flex justify-between text-sm text-[#7E57C2]">
                    <span>Bundle Savings</span>
                    <span>-Rs. {bundleSavings}</span>
                </div>
            )}
        </div>
        <div className="h-px bg-gray-100 dark:bg-white/10 w-full"></div>
        <div className="flex justify-between items-end">
            <span className="text-[#64748b] dark:text-gray-400 text-sm font-medium">Total Estimate</span>
            <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-[#0F172] dark:text-white">Rs. {total}</span>
                <span className="text-xs text-[#64748b] dark:text-gray-500">Includes taxes</span>
            </div>
        </div>
        <button 
            onClick={handleRequestAllItems}
            className="flex w-full cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#217964] text-white text-lg font-bold shadow-md hover:shadow-lg hover:bg-[#217964]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
            disabled={itemCount === 0}
        >
            Request All Items
        </button>
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748b] dark:text-gray-500">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Secure request. No payment yet.</span>
        </div>
    </div>
  )
}
