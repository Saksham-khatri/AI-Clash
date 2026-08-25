import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Icon from './Icon'
import { formatScore, toMarkdown } from '../utils/recommendation'

export default function Solution({ number, content, score, reasoning, winner, onCopy }) {
  const highlighted = winner === number
  const markdown = toMarkdown(content)
    return (
      <article className={`flex min-w-0 flex-1 flex-col rounded-xl border p-5 ${highlighted ? 'border-indigo-400/60 bg-indigo-950/25' : 'border-slate-700/80 bg-[#111a31]'}`}>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${number === 1 ? 'bg-indigo-500/20 text-indigo-200' : 'bg-cyan-400/15 text-cyan-200'}`}>
              Model {number === 1 ? 'A' : 'B'}
            </span>
            <h3 className="text-[15px] font-medium text-slate-100">Solution {number}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-300">{formatScore(score)}<span className="text-xs font-normal text-slate-500"> / 10</span></span>
            <button type="button" title="Copy solution" onClick={() => onCopy(markdown)} className="text-slate-500 hover:text-slate-100">
              <Icon size={16}><rect x="9" y="9" width="10" height="10" rx="1" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></Icon>
            </button>
          </div>
        </div>
        <div className="markdown-content min-h-45 flex-1 text-[13px] leading-6 text-slate-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown || 'No solution returned.'}</ReactMarkdown>
        </div>
        <div className="mt-6 border-t border-slate-700/70 pt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Judge reasoning</p>
          <p className="text-xs leading-5 text-slate-400">{reasoning || 'No reasoning returned.'}</p>
        </div>
      </article>
    )
}
