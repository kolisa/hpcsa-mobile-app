export default function StatusBar() {
  return (
    <div className="h-7 bg-blue-600 text-white flex justify-between items-center px-4 text-sm">
      <span>9:41</span>
      <div className="flex gap-1">
        <span>📶</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}
