function Sidebar({ menuItems, userType }) {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold">Traveller</h2>
        <p className="text-sm text-slate-400 capitalize">{userType} Panel</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar