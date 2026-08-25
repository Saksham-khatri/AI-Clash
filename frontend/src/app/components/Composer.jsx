import Icon from './Icon'

export default function Composer({ value, loading, onChange, onSubmit }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit(event)
    }
  }

  return <form onSubmit={onSubmit} className="sticky bottom-0 mt-auto pt-8"><div className="flex items-end gap-3 rounded-xl border border-slate-700 bg-[#111a31] p-3 shadow-2xl shadow-black/20 transition-colors focus-within:border-slate-400"><textarea value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={handleKeyDown} rows="1" placeholder="Ask the arena anything..." className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500" /><button type="submit" disabled={!value.trim() || loading} title="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white transition-transform hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"><Icon size={17}><path d="m5 12 14-8-3 16-4-6-7-2Z" /><path d="m12 14 4-5" /></Icon></button></div><p className="mt-3 text-center text-[10px] text-slate-600">AI Arena can make mistakes. Review both solutions before shipping.</p></form>
}
