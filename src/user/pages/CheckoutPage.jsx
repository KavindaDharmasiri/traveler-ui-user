import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cartService } from '../api/cartService';
import axios from '../api/axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taxRate, setTaxRate] = useState(0.08);
  const [imageMapper, setImageMapper] = useState({});
  const [processing, setProcessing] = useState(false);

  const fetchImages = async (imageUuids) => {
    const mapper = {};
    for (const uuid of imageUuids) {
      try {
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        });
        mapper[uuid] = URL.createObjectURL(response.data);
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error);
      }
    }
    setImageMapper(mapper);
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const [cartData, taxData] = await Promise.all([
        cartService.getCartItems(),
        axios.get('auth/rate')
      ]);
      
      setCartItems(cartData);
      setTaxRate(taxData.data.rate);
      
      // Fetch images
      const imageUuids = cartData.flatMap(cart => 
        cart.cartItems?.flatMap(item => item.itemObj?.images || []) || []
      );
      if (imageUuids.length > 0) {
        await fetchImages(imageUuids);
      }
    } catch (error) {
      console.error('Error fetching checkout data:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, cart) => sum + (cart.cartItems?.reduce((itemSum, item) => itemSum + item.totalPrice, 0) || 0),
    0
  );
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const handleCompletePayment = async () => {
    setProcessing(true);
    try {
      const orderCodes = cartItems.map(cart => cart.orderCode);
      const customerTenant = cartItems[0]?.userTenant || "";
      
      const paymentData = {
        subtotal: subtotal,
        taxAmount: taxes,
        taxRate: taxRate,
        totalAmount: total,
        customerName: "Customer", // You can get this from user context
        customerTenant: customerTenant,
        orderCodes: orderCodes
      };

      const response = await axios.post('core/api/v1/transaction/process-payment', paymentData);
      
      if (response.data) {
        // Payment successful - redirect to success page
        navigate('/payment/success', { 
          state: { 
            transactionCode: response.data.transactionCode,
            totalAmount: total 
          } 
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      // Redirect to failure page
      navigate('/payment/failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-1">Review your order and complete payment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Side - Order Details */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                <p className="text-gray-600">Review your selected items</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {cartItems.map((cart) => (
                <div key={cart.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">Cart: {cart.orderCode}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">{cart.cartItems?.length || 0}</span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">items</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {cart.cartItems?.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-emerald-200 transition-colors shadow-sm hover:shadow-md">
                        <div className="flex gap-6">
                          {item.itemObj?.images?.[0] && imageMapper[item.itemObj.images[0]] ? (
                            <div className="flex-shrink-0">
                              <img 
                                src={imageMapper[item.itemObj.images[0]]} 
                                alt={item.itemObj.name} 
                                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 shadow-sm" 
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-200 flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-bold text-xl text-gray-900 mb-2">{item.itemObj?.name || `Item #${item.item}`}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <p className="text-emerald-700 font-semibold">Vendor: {item.providerName}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-2xl text-gray-900 mb-1">Rs. {item.totalPrice.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Total Amount</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-blue-600 font-semibold text-xs uppercase tracking-wide mb-1">Quantity</p>
                                <p className="text-blue-900 font-bold text-lg">{item.qty}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <p className="text-purple-600 font-semibold text-xs uppercase tracking-wide mb-1">Rental Days</p>
                                <p className="text-purple-900 font-bold text-lg">{item.rentalDays}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-green-600 font-semibold text-xs uppercase tracking-wide mb-1">Pickup Date</p>
                                <p className="text-green-900 font-bold text-sm">{item.pickupDate}</p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <p className="text-orange-600 font-semibold text-xs uppercase tracking-wide mb-1">Return Date</p>
                                <p className="text-orange-900 font-bold text-sm">{item.returnDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Payment Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 h-fit sticky top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <p className="text-gray-600">Secure checkout</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Subtotal:</span>
                <span className="font-semibold text-gray-900">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Taxes & Fees:</span>
                <span className="font-semibold text-gray-900">Rs. {taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-emerald-50 px-4 rounded-xl border-2 border-emerald-200">
                <span className="text-emerald-800 font-bold text-lg">Total Amount:</span>
                <span className="text-emerald-900 font-bold text-2xl">Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Method
                </h3>
                
                <div className="p-4 border-2 border-emerald-300 bg-emerald-50 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-emerald-800">Credit/Debit Card</span>
                  <div className="ml-auto w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCompletePayment}
                disabled={processing}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Complete Secure Payment
                  </>
                )}
              </button>
              
              <button 
                onClick={() => navigate(-1)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors border border-gray-300"
              >
                Back to Home
              </button>
              
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
