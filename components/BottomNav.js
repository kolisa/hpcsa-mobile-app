export default function BottomNav({ active, onNavigate }) {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'account', icon: '📊', label: 'Account' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-around">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 p-2 min-w-[4rem] rounded transition-colors ${
            active === item.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
