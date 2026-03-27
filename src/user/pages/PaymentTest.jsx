import React, { useState } from 'react';

const PaymentTest = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [paymentId, setPaymentId] = useState('');

  const runTest = async (testName, endpoint) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    
    try {
      const response = await fetch(`/payment/api/test${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      setResults(prev => ({ ...prev, [testName]: { success: true, data } }));
      
      if (testName === 'createPayment' && data.paymentId) {
        setPaymentId(data.paymentId);
      }
    } catch (error) {
      setResults(prev => ({ ...prev, [testName]: { success: false, error: error.message } }));
    } finally {
      setLoading(prev => ({ ...prev, [testName]: false }));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Payment Test Dashboard</h1>
      
      {paymentId && (
        <div style={{ background: '#e3f2fd', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
          <strong>Payment ID:</strong> {paymentId}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>1. Create Mock Payment</h3>
          <p>Creates a test payment of LKR 5,000</p>
          <button 
            onClick={() => runTest('createPayment', '/create-mock-payment')}
            disabled={loading.createPayment}
            style={{ padding: '10px 20px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {loading.createPayment ? 'Creating...' : 'Create Test Payment'}
          </button>
          
          {results.createPayment && (
            <div style={{ marginTop: '10px', padding: '10px', background: results.createPayment.success ? '#e8f5e8' : '#ffeaea', borderRadius: '5px' }}>
              {results.createPayment.success ? (
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                  {JSON.stringify(results.createPayment.data, null, 2)}
                </pre>
              ) : (
                <span style={{ color: 'red' }}>Error: {results.createPayment.error}</span>
              )}
            </div>
          )}
        </div>

        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>2. Simulate Success</h3>
          <p>Marks payment as completed</p>
          <button 
            onClick={() => runTest('simulateSuccess', `/simulate-payment-success/${paymentId}`)}
            disabled={loading.simulateSuccess || !paymentId}
            style={{ padding: '10px 20px', background: paymentId ? '#4caf50' : '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: paymentId ? 'pointer' : 'not-allowed' }}
          >
            {loading.simulateSuccess ? 'Processing...' : 'Simulate Success'}
          </button>
          
          {results.simulateSuccess && (
            <div style={{ marginTop: '10px', padding: '10px', background: results.simulateSuccess.success ? '#e8f5e8' : '#ffeaea', borderRadius: '5px' }}>
              {results.simulateSuccess.success ? (
                <span style={{ color: 'green' }}>✓ {results.simulateSuccess.data}</span>
              ) : (
                <span style={{ color: 'red' }}>Error: {results.simulateSuccess.error}</span>
              )}
            </div>
          )}
        </div>

        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>3. Check Status</h3>
          <p>View payment details</p>
          <button 
            onClick={async () => {
              setLoading(prev => ({ ...prev, checkStatus: true }));
              try {
                const response = await fetch(`/payment/api/test/payment-status/${paymentId}`);
                const data = await response.json();
                setResults(prev => ({ ...prev, checkStatus: { success: true, data } }));
              } catch (error) {
                setResults(prev => ({ ...prev, checkStatus: { success: false, error: error.message } }));
              } finally {
                setLoading(prev => ({ ...prev, checkStatus: false }));
              }
            }}
            disabled={loading.checkStatus || !paymentId}
            style={{ padding: '10px 20px', background: paymentId ? '#ff9800' : '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: paymentId ? 'pointer' : 'not-allowed' }}
          >
            {loading.checkStatus ? 'Checking...' : 'Check Status'}
          </button>
          
          {results.checkStatus && (
            <div style={{ marginTop: '10px', padding: '10px', background: results.checkStatus.success ? '#e8f5e8' : '#ffeaea', borderRadius: '5px' }}>
              {results.checkStatus.success ? (
                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
                  {JSON.stringify(results.checkStatus.data, null, 2)}
                </pre>
              ) : (
                <span style={{ color: 'red' }}>Error: {results.checkStatus.error}</span>
              )}
            </div>
          )}
        </div>

        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>4. Complete Test Flow</h3>
          <p>Runs entire flow automatically</p>
          <button 
            onClick={() => runTest('completeFlow', '/complete-test-flow')}
            disabled={loading.completeFlow}
            style={{ padding: '10px 20px', background: '#9c27b0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {loading.completeFlow ? 'Running...' : 'Run Complete Test'}
          </button>
          
          {results.completeFlow && (
            <div style={{ marginTop: '10px', padding: '10px', background: results.completeFlow.success ? '#e8f5e8' : '#ffeaea', borderRadius: '5px' }}>
              {results.completeFlow.success ? (
                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
                  {JSON.stringify(results.completeFlow.data, null, 2)}
                </pre>
              ) : (
                <span style={{ color: 'red' }}>Error: {results.completeFlow.error}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#fff3cd', borderRadius: '5px' }}>
        <h3>PayHere Test Cards</h3>
        <p><strong>Visa:</strong> 4916217501611292 (Exp: 12/25, CVV: 123)</p>
        <p><strong>Mastercard:</strong> 5307732125531191 (Exp: 12/25, CVV: 123)</p>
      </div>
    </div>
  );
};

export default PaymentTest;
