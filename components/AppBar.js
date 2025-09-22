export default function AppBar({ title, showBack = false, onBack, rightAction }) {
  return (
    <div className="h-14 bg-blue-600 text-white flex items-center px-4 shadow">
      {showBack ? (
        <button onClick={onBack} className="mr-8 text-2xl hover:bg-blue-700 p-1 rounded">
          ←
        </button>
      ) : (
        <button className="mr-8 text-2xl hover:bg-blue-700 p-1 rounded">☰</button>
      )}
      <h1 className="text-xl font-medium flex-1">{title}</h1>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}
