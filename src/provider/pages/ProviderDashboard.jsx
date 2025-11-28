import DashboardLayout from '../../common/layouts/DashboardLayout'

function ProviderDashboard() {
  const menuItems = [
    { label: 'Dashboard', href: '#', icon: '📊' },
    { label: 'My Services', href: '#', icon: '🏨' },
    { label: 'Bookings', href: '#', icon: '📋' },
    { label: 'Calendar', href: '#', icon: '📅' },
    { label: 'Reviews', href: '#', icon: '⭐' },
    { label: 'Earnings', href: '#', icon: '💰' },
    { label: 'Profile', href: '#', icon: '🏢' },
  ]

  const user = { name: 'Paradise Hotels', role: 'Service Provider' }

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      userType="provider" 
      title="Provider Dashboard" 
      user={user}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">247</p>
              <p className="text-sm text-green-600">+12% this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📋</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$18,420</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Based on 156 reviews</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Services</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">2 pending approval</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🏨</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Deluxe Ocean View</h4>
                <p className="text-sm text-gray-600">John Smith • March 15-18</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$450</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Family Suite</h4>
                <p className="text-sm text-gray-600">Sarah Johnson • March 20-25</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$680</p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Occupancy Rate</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customer Satisfaction</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Response Time</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProviderDashboard