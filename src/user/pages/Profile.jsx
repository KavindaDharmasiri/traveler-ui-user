import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Swal from 'sweetalert2'
import PinInput from '../component/PinInput'

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [verifyingNumber, setVerifyingNumber] = useState(false)
  const [showPinInput, setShowPinInput] = useState(false)
  const [verifyingEmail, setVerifyingEmail] = useState(false)
  const [showEmailPinInput, setShowEmailPinInput] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('auth/me')
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleNumberVerification = async () => {
    if (!userData?.contactNumber) {
      Swal.fire({
        icon: 'error',
        title: 'No Phone Number',
        text: 'Please add a phone number first.',
        confirmButtonColor: '#0f766e'
      })
      return
    }

    setVerifyingNumber(true)
    
    try {
      // Send verification code via WhatsApp
      await axios.post('notification/api/v1/whatsapp/send-verification', {
        phoneNumber: userData.contactNumber
      })
      
      setVerifyingNumber(false)
      setShowPinInput(true)
    } catch (error) {
      setVerifyingNumber(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send verification code. Please try again.',
        confirmButtonColor: '#0f766e'
      })
    }
  }

  const handlePinComplete = async (pin) => {
    try {
      await axios.post('notification/api/v1/whatsapp/verify-code', {
        phoneNumber: userData.contactNumber,
        pin: pin
      })
      
      setUserData(prev => ({ ...prev, isNumberVerified: true }))
      setShowPinInput(false)
      Swal.fire({
        icon: 'success',
        title: 'Phone Verified!',
        text: 'Your phone number has been successfully verified.',
        confirmButtonColor: '#0f766e'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Code',
        text: 'The verification code you entered is incorrect or expired.',
        confirmButtonColor: '#0f766e'
      })
    }
  }

  const handlePinCancel = () => {
    setShowPinInput(false)
  }

  const handleEmailVerification = async () => {
    if (!userData?.email) {
      Swal.fire({
        icon: 'error',
        title: 'No Email Address',
        text: 'Please add an email address first.',
        confirmButtonColor: '#0f766e'
      })
      return
    }

    setVerifyingEmail(true)
    
    try {
      await axios.post('notification/api/v1/email/send-verification', {
        email: userData.email
      })
      
      setVerifyingEmail(false)
      setShowEmailPinInput(true)
    } catch (error) {
      setVerifyingEmail(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send verification code. Please try again.',
        confirmButtonColor: '#0f766e'
      })
    }
  }

  const handleEmailPinComplete = async (code) => {
    try {
      await axios.post('notification/api/v1/email/verify-code', {
        email: userData.email,
        verificationCode: code
      })
      
      setUserData(prev => ({ ...prev, isEmailVerified: true }))
      setShowEmailPinInput(false)
      Swal.fire({
        icon: 'success',
        title: 'Email Verified!',
        text: 'Your email address has been successfully verified.',
        confirmButtonColor: '#0f766e'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Code',
        text: 'The verification code you entered is incorrect or expired.',
        confirmButtonColor: '#0f766e'
      })
    }
  }

  const handleEmailPinCancel = () => {
    setShowEmailPinInput(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <>
      <div className='min-h-screen bg-white shadow-md rounded-lg py-10 px-4 sm:px-6 lg:px-8'>
        <div>
          <p className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">My Profile</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage your personal information and address details.</p>
        </div>

        <hr className="border-borderColor my-4" />

        {/*profile picture and details*/}
        <div className="flex flex-col md:flex-row items-start md:space-x-6 bg-white p-6 mx-auto">
          {/* Profile Picture */}
          <div className="mb-4 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200" 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500"
            />
          </div>
          {/* Profile Details */}
          <div className="flex-1 items-center justify-center w-full py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userData?.name || 'N/A'}</h2>
            <p className="text-gray-600 mb-1"><span className="font-medium">Email:</span> {userData?.email || 'N/A'}</p>
          </div>
        </div>
        
        <hr className="border-borderColor my-6" />
        {/* Personal Information Section */}
        <div className="bg-white p-6 mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={userData?.name || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${userData?.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {userData?.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEmailVerification()}
                    disabled={userData?.isEmailVerified || verifyingEmail}
                    className={`px-3 py-1 text-xs rounded-full ${userData?.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 hover:bg-red-200'} disabled:opacity-50`}
                  >
                    {verifyingEmail ? 'Sending...' : userData?.isEmailVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>
              <input
                type="email"
                defaultValue={userData?.email || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${userData?.isNumberVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {userData?.isNumberVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNumberVerification()}
                    disabled={userData?.isNumberVerified || verifyingNumber}
                    className={`px-3 py-1 text-xs rounded-full ${userData?.isNumberVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 hover:bg-red-200'} disabled:opacity-50`}
                  >
                    {verifyingNumber ? 'Sending...' : userData?.isNumberVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>
              <input
                type="tel"
                defaultValue={userData?.contactNumber || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                defaultValue={userData?.dateOfBirth || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        
        <hr className="border-borderColor my-6" />
        {/* Address Details Section */}
        <div className="bg-white p-6 mx-auto mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                defaultValue={userData?.address?.street1 || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text" 
                defaultValue={userData?.address?.city || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                defaultValue={userData?.address?.state || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
              <input
                type="text"
                defaultValue={userData?.address?.postalCode || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                defaultValue={userData?.address?.street2 || ''}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/*Cancel or Save Changes Button */}
        <div className="flex justify-end space-x-4 max-w-4xl mx-auto mb-10">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      {showPinInput && (
        <PinInput 
          onComplete={handlePinComplete}
          onCancel={handlePinCancel}
        />
      )}
      
      {showEmailPinInput && (
        <PinInput 
          onComplete={handleEmailPinComplete}
          onCancel={handleEmailPinCancel}
        />
      )}
    </>
  )
}