export default function Header({ onMenuClick }) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-800/80 px-5 sm:px-10">

      {/* Mobile Header */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-9 w-9 place-items-center rounded-md text-slate-300 hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <span className="text-sm font-medium">
          AI CLASH
        </span>
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-4">
        <span className="hidden text-xs text-slate-500 sm:block">
          Model arena
        </span>

        <div className="h-8 w-8 rounded-full bg-indigo-500/30 text-center text-xs leading-8 text-indigo-100">
        </div>
      </div>

    </header>
  )
}