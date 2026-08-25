import Icon from './Icon'

export default function Sidebar({
  sessions,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isOpen,
  onClose,
}) {
  function handleNewChat() {
    onNewChat()
    onClose()
  }

  function handleSelectSession(session) {
    onSelectSession(session)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[224px] shrink-0 flex-col
          border-r border-slate-800/80 bg-[#111a31] px-[18px] py-6
          transition-transform duration-300
          md:static md:z-auto md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="mb-9 flex items-center gap-3 px-1">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-indigo-300/50 bg-[#0a1428] text-indigo-200">
            <Icon size={17}>
              <path d="M4 12a8 8 0 0 1 16 0" />
              <path d="M6 9h12M5 13h14M8 17h8" />
            </Icon>
          </div>

          <div>
            <p className="text-sm font-medium text-indigo-100">
              AI CLASH
            </p>
            <p className="text-[11px] text-slate-400">
              Pro Account
            </p>
          </div>

          {/* Close button - mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-slate-400 md:hidden"
          >
            ✕
          </button>
        </div>

        {/* New Chat */}
        <button
          type="button"
          onClick={handleNewChat}
          className="mb-7 flex h-[39px] items-center gap-3 rounded-md bg-indigo-600 px-3 text-left text-xs font-medium text-white hover:bg-indigo-500"
        >
          <Icon size={17}>
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M8 12h8M12 8v8" />
          </Icon>
          New Chat
        </button>

        {/* Recent sessions */}
        <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Recent sessions
        </p>

        <div className="space-y-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <p className="px-3 text-xs leading-5 text-slate-600">
              Your sessions will appear here.
            </p>
          ) : (
            sessions
              .slice()
              .reverse()
              .map((session) => (
                <div
                  key={session.id}
                  className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-white"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectSession(session)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <Icon size={15}>
                      <path d="M4 5h16v11H7l-3 3V5Z" />
                    </Icon>

                    <span className="truncate">
                      {session.title || session.problem}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteSession(session.id)}
                    className="ml-1 text-slate-500 hover:text-red-400 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
                    title="Delete chat"
                  >
                    DELETE
                  </button>
                </div>
              ))
          )}
        </div>

        {/* Bottom actions */}
        <div className="mt-auto space-y-4 pt-6">
          <button
            type="button"
            className="flex items-center gap-3 px-3 text-xs text-slate-400 hover:text-slate-200"
          >
            <Icon size={16}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L9 17l.1-.1A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.5-1H7v-2h.9a1.7 1.7 0 0 0 1.5-1A1.7 1.7 0 0 0 9.1 9L9 8.9l1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.5 1l.1-.1Z" />
            </Icon>
            Settings
          </button>

          <button
            type="button"
            className="w-full rounded-md border border-slate-600 bg-slate-800/70 py-2 text-[10px] font-semibold text-indigo-200 hover:bg-slate-700"
          >
            Upgrade Plan
          </button>
        </div>
      </aside>
    </>
  )
}