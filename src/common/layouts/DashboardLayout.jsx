import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function DashboardLayout({ children, menuItems, userType, title, user }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} userType={userType} />
      <div className="flex-1">
        <Header title={title} user={user} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout