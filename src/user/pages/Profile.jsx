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
  const [formData, setFormData] = useState({})
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('auth/me')
        setUserData(response.data)
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          contactNumber: response.data.contactNumber || '',
          dateOfBirth: response.data.dateOfBirth || '',
          street1: response.data.address?.street1 || '',
          city: response.data.address?.city || '',
          state: response.data.address?.state || '',
          postalCode: response.data.address?.postalCode || '',
          country: response.data.address?.street2 || ''
        })
        
        if (response.data.profileImageUuid) {
          const imageResponse = await axios.get(`storage/files/download/${response.data.profileImageUuid}`, {
            responseType: 'blob'
          })
          setProfileImage(URL.createObjectURL(imageResponse.data))
        }
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const uploadResponse = await axios.post('storage/files/upload/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      const profileImageUuid = uploadResponse.data
      
      const profileData = {
        tenantId: userData?.tenantId,
        profileImageUuid: profileImageUuid
      }

      await axios.put('auth/profile', profileData)
      
      setProfileImage(URL.createObjectURL(file))
      const response = await axios.get('auth/me')
      setUserData(response.data)
      
      Swal.fire({
        icon: 'success',
        title: 'Image Uploaded!',
        text: 'Profile image has been updated successfully.',
        confirmButtonColor: '#0f766e'
      })
    } catch (error) {
      const errorMessage = error.response?.data || 'Failed to upload image'
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: errorMessage,
        confirmButtonColor: '#0f766e'
      })
    }
  }

  const handleSaveProfile = async () => {
    try {
      const profileData = {
        tenantId: userData?.tenantId,
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        dateOfBirth: formData.dateOfBirth,
        address: {
          street1: formData.street1,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          street2: formData.country
        }
      }

      await axios.put('auth/profile', profileData)
      
      // Refresh user data
      const response = await axios.get('auth/me')
      setUserData(response.data)
      
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been successfully updated.',
        confirmButtonColor: '#0f766e'
      })
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile. Please try again.'
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage,
        confirmButtonColor: '#0f766e'
      })
    }
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
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 bg-white p-6 mx-auto">
          {/* Profile Picture */}
          <div className="mb-4 md:mb-0 relative flex-shrink-0">
            <img 
              src={profileImage || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200"} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => document.getElementById('profileImageInput').click()}
            />
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-2 cursor-pointer hover:bg-teal-600 transition-colors"
                 onClick={() => document.getElementById('profileImageInput').click()}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
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
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
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
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                value={formData.contactNumber || ''}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
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
                value={formData.street1 || ''}
                onChange={(e) => handleInputChange('street1', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                value={formData.state || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
              <input
                type="text"
                value={formData.postalCode || ''}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/*Cancel or Save Changes Button */}
        <div className="flex justify-end space-x-4 max-w-4xl mx-auto mb-10 px-6">
          
          <button
            type="button"
            onClick={handleSaveProfile}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Update Changes
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
