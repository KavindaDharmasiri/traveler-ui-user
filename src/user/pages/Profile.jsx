import React from 'react'

export default function Profile() {
  return (
    <div className='min-h-screen  bg-white shadow-md rounded-lg py-10 px-4 sm:px-6 lg:px-8'>
        <div>
            <p className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">My Profile</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage your personal information and address details.</p>
        </div>

        <hr className="border-borderColor my-4" />

        {/*profile picture and details*/}
        <div className="flex flex-col md:flex-row items-start  md:space-x-6 bg-white  p-6  mx-auto">
            
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">John Doe</h2>
                    <p className="text-gray-600 mb-1"><span className="font-medium">Email:</span> john.doe@example.com</p>
                </div>
            </div>
            
            <hr className="border-borderColor my-6" />
            {/* Personal Information Section */}
            <div className="bg-white  p-6  mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            defaultValue="+1 234 567 8901"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            defaultValue="1990-01-01"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
            </div>
            
            <hr className="border-borderColor my-6" />
            {/* Address Details Section */}
            <div className="bg-white  p-6  mx-auto mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                            type="text"
                            defaultValue="123 Main St"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text" 
                            defaultValue="Springfield"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"      
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        <input
                            type="text"
                            defaultValue="Illinois"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                        <input
                            type="text"
                            defaultValue="62701"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            defaultValue="USA"
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

            {/* Edit profile button to make changes and save to show normal details profile view */ }
            

        </div>
    
  )
}
