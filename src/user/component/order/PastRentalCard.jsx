import React from 'react'
import travelerLogo from '../../../assets/traveler_logo.png';
import completeImage from '../../../assets/complete.png';
import cancelImage from '../../../assets/cancel.png';
import axios from '../../api/axios';

export default function PastRentalCard({ order, onClick }) {
  if (!order) return null;

  const handleViewReceipt = async (e) => {
    e.stopPropagation();
    
    // Fetch images first
    const allImageUuids = order.items?.flatMap(item => item.itemObj?.images || []) || [];
    const imageMapper = {};
    for (const uuid of allImageUuids) {
      try {
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        });
        imageMapper[uuid] = URL.createObjectURL(response.data);
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error);
      }
    }
    
    // Generate PDF like provider does
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    const currentYear = new Date().getFullYear();
    
    // Enhanced Header
    doc.setFillColor(33, 121, 100);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('✈', 20, 18);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Professional Travel & Rental Services', 120, 12);
    doc.text('Order Management System', 120, 18);
    
    doc.setTextColor(0, 0, 0);
    
    // Add watermark to first page
    if (order.status === 'COMPLETED') {
      doc.addImage(completeImage, 'PNG', 60, 140, 90, 90);
    } else if (order.status === 'CANCELLED') {
      doc.addImage(cancelImage, 'PNG', 60, 140, 90, 90);
    }
    
    // Order Details Section
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('ORDER RECEIPT', 20, 45);
    
    // Order info box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 50, 170, 40, 'F');
    doc.setDrawColor(23, 121, 100);
    doc.setLineWidth(0.5);
    doc.rect(20, 50, 170, 40);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Order Information', 25, 60);
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Order Code: ${order.orderCode}`, 25, 68);
    doc.text(`Customer Name: ${order.customerName}`, 25, 75);
    doc.text(`Order Status: ${order.status}`, 25, 82);
    
    doc.text(`Receipt Date: ${new Date().toLocaleDateString()}`, 120, 68);
    doc.text(`Total Items: ${order.items?.length || 0}`, 120, 75);
    
    // Items Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('ORDER ITEMS DETAILS', 20, 105);
    
    let yPos = 115;
    let totalAmount = 0;
    
    for (let index = 0; index < (order.items?.length || 0); index++) {
      const item = order.items[index];
      totalAmount += parseFloat(item.totalPrice || 0);
      
      // Item header
      doc.setFillColor(33, 121, 100);
      doc.rect(20, yPos - 5, 170, 15, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`ITEM ${index + 1}: ${item.itemObj?.name || 'Item ' + item.item}`, 25, yPos + 3);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      yPos += 20;
      
      // Item details
      doc.setFillColor(250, 250, 250);
      doc.rect(20, yPos, 170, 45, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.rect(20, yPos, 170, 45);
      
      // Add item image if available
      if (item.itemObj?.images?.[0] && imageMapper[item.itemObj.images[0]]) {
        try {
          doc.addImage(imageMapper[item.itemObj.images[0]], 'JPEG', 25, yPos + 5, 25, 20);
        } catch (error) {
          console.error('Error adding image to PDF:', error);
        }
      }
      
      doc.setFontSize(10);
      doc.text(`Category: ${item.itemObj?.category || 'N/A'}`, 55, yPos + 8);
      doc.text(`Quantity: ${item.qty}`, 55, yPos + 15);
      doc.text(`Rental Days: ${item.rentalDays}`, 55, yPos + 22);
      doc.text(`Status: ${item.status}`, 55, yPos + 29);
      
      doc.setFont(undefined, 'bold');
      doc.text(`Price: Rs. ${item.totalPrice}`, 120, yPos + 8);
      doc.setFont(undefined, 'normal');
      doc.text(`Pickup: ${item.pickupDate}`, 120, yPos + 15);
      doc.text(`Return: ${item.returnDate}`, 120, yPos + 22);
      
      yPos += 55;
      
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
        
        // Add watermark to new page
        if (order.status === 'COMPLETED') {
          doc.addImage(completeImage, 'PNG', 60, 140, 90, 90);
        } else if (order.status === 'CANCELLED') {
          doc.addImage(cancelImage, 'PNG', 60, 140, 90, 90);
        }
      }
    }
    
    // Total Amount
    doc.setFillColor(33, 121, 100);
    doc.rect(120, yPos, 70, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`TOTAL: Rs. ${totalAmount.toFixed(2)}`, 125, yPos + 12);
    
    // Add watermark to first page
    if (order.status === 'COMPLETED') {
      doc.addImage(completeImage, 'PNG', 60, 140, 90, 90);
    } else if (order.status === 'CANCELLED') {
      doc.addImage(cancelImage, 'PNG', 60, 140, 90, 90);
    }
    
    // Logo and watermark
    doc.addImage(travelerLogo, 'PNG', 125, yPos + 25, 40, 15);
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 275, 210, 22, 'F');
    doc.setDrawColor(23, 121, 100);
    doc.line(0, 275, 210, 275);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This is an official receipt generated by Traveler Management System', 20, 283);
    doc.text(`© ${currentYear} Traveler Inc. All rights reserved.`, 20, 288);
    
    // Open PDF in modal
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Order Receipt - ${order.orderCode}</h3>
          <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <iframe src="${pdfUrl}" class="w-full h-96 border-0"></iframe>
        <div class="mt-4 flex justify-end">
          <button class="download-pdf bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Download PDF</button>
          <button class="close-modal bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    modal.querySelectorAll('.close-modal').forEach(btn => {
      btn.onclick = () => {
        document.body.removeChild(modal);
        URL.revokeObjectURL(pdfUrl);
      };
    });
    
    // Download handler
    modal.querySelector('.download-pdf').onclick = () => {
      doc.save(`Receipt-${order.orderCode}-${new Date().toISOString().split('T')[0]}.pdf`);
    };
  };

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  // Transform order data
  const imageUrl = order.items?.[0]?.itemObj?.images?.[0] ? 
    `https://via.placeholder.com/300x200?text=${order.items[0].itemObj.name}` : 
    "https://via.placeholder.com/300x200?text=Order";
  const imageAlt = order.items?.[0]?.itemObj?.name || "Order item";
  const title = order.orderCode;
  const storeLine = `Customer: ${order.customerName} • ${order.items?.length || 0} items`;
  const totalPrice = order.items?.reduce((sum, item) => sum + parseFloat(item.totalPrice || 0), 0) || 0;
  const price = `Rs. ${totalPrice.toFixed(2)}`;
  const status = order.status?.toLowerCase() === 'completed' ? 'completed' : 'cancelled';
   const statusBadge =
    status === "completed" ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        <span className="material-symbols-outlined text-[14px]">check_circle</span>
        Completed
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <span className="material-symbols-outlined text-[14px]">cancel</span>
        Cancelled
      </span>
    );

  const titleClass =
    status === "cancelled"
      ? "text-lg font-bold text-[#181811] dark:text-white opacity-60 line-through decoration-red-500/50"
      : "text-lg font-bold text-[#181811] dark:text-white opacity-80";

  const priceClass =
    status === "cancelled"
      ? "text-sm font-bold text-[#8c8b5f] line-through"
      : "text-sm font-bold text-[#181811] dark:text-white";

  return (
    <div 
      onClick={handleCardClick}
      className="group flex flex-col md:flex-row bg-white/50 dark:bg-[#23220f]/50 border border-[#e6e6db] dark:border-[#38382f] rounded-xl overflow-hidden hover:bg-white dark:hover:bg-[#23220f] transition-colors cursor-pointer"
    >
      <div className="w-full md:w-40 h-32 md:h-auto bg-[#f0f0f0] dark:bg-[#2C2C20] relative flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
        {imageUrl.includes('placeholder') ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#217964] to-[#1a5f4e] flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white/80 text-[20px]">
                  luggage
                </span>
                <span className="material-symbols-outlined text-white text-[28px]">
                  flight
                </span>
                <span className="material-symbols-outlined text-white/80 text-[20px]">
                  map
                </span>
              </div>
              <span className="text-white/60 text-xs font-medium">Travel Order</span>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-alt={imageAlt}
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h3 className={titleClass}>{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-[#8c8b5f]">
              <span className="material-symbols-outlined text-[16px]">store</span>
              {storeLine}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className={priceClass}>{price}</span>
            {statusBadge}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {order.status !== 'PAYED' && (
            <>
              {status === "completed" ? (
                <>
                  <button 
                    onClick={handleViewReceipt}
                    className="text-[#8c8b5f] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt</span>
                    View Receipt
                  </button>
                </>
              ) : (
                <button className="text-[#8c8b5f] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">help</span>
                  Help
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
