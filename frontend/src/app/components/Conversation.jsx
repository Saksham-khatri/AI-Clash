import Solution from './Solution'
import Recommendation from './Recommendation'
import { getRecommendation } from '../utils/recommendation'

export default function Conversation({ messages, onCopy }) {
  return <section className="space-y-9">{messages.map((message, index) => { const judge = message.data?.judge; const recommendation = getRecommendation(judge); return <div key={`${message.problem}-${index}`} className="space-y-5"><div className="ml-auto max-w-2xl rounded-xl border border-slate-700/80 bg-[#17213a] px-5 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Your prompt</p><p className="mt-2 text-sm leading-6 text-slate-100">{message.problem}</p></div>{message.pending ? <div className="flex items-center gap-3 px-2 text-xs text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />Comparing solutions...</div> : <><div className="flex flex-col gap-4 lg:flex-row"><Solution number={1} content={message.data?.solution_1} score={judge?.solution_1_score} reasoning={judge?.solution_1_reasoning} winner={recommendation?.winner} onCopy={onCopy} /><Solution number={2} content={message.data?.solution_2} score={judge?.solution_2_score} reasoning={judge?.solution_2_reasoning} winner={recommendation?.winner} onCopy={onCopy} /></div><Recommendation recommendation={recommendation} /></>}</div> })}</section>
}
