import { useEffect, useState } from 'react'
import './App.css'
import Composer from './components/Composer'
import Conversation from './components/Conversation'
import EmptyState from './components/EmptyState'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import axios from 'axios'
import { createSessionTitle } from './utils/recommendation'


function App() {
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
 const [sessions, setSessions] = useState(() => {
  try {
    const savedSessions = JSON.parse(
      localStorage.getItem('ai-arena-sessions') || '[]'
    )
    return Array.isArray(savedSessions) ? savedSessions : []
  } catch {
    return []
  }
})

const [activeSessionId, setActiveSessionId] = useState(null)

const activeSession = sessions.find(
  (session) => session.id === activeSessionId
)

const messages = activeSession?.messages || []
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
  localStorage.setItem('ai-arena-sessions', JSON.stringify(sessions))
}, [sessions])

  async function submit(event) {
    event?.preventDefault()
    const problem = input.trim()
    if (!problem || loading) return
    let sessionId = activeSessionId

    setInput('')
    setError('')
    const newMessage = {
      problem,
      title: activeSession?.title || createSessionTitle(problem),
      pending: true,
    };

    if (!activeSession) {
      const newSession = {
        id: Date.now(),
        title: createSessionTitle(problem),
        messages: [newMessage],
      };

      sessionId = newSession.id
      setSessions((items) => [...items, newSession]);
      setActiveSessionId(newSession.id);
    } else {
      setSessions((items) =>
        items.map((session) =>
          session.id === activeSessionId
            ? { ...session, messages: [...session.messages, newMessage] }
            : session,
        ),
      );
    }
    setLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/invoke`, {
        input: problem
      }, {
        timeout: 120000
      })
      const payload = response.data
      if (!payload.success) {
        throw new Error(payload.message || 'The arena could not evaluate this prompt.')
      }
      setSessions((items) =>
        items.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: session.messages.map((message, index) =>
                  index === session.messages.length - 1
                    ? { ...message, data: payload.data, pending: false }
                    : message,
                ),
              }
            : session,
        ),
      );
    } catch (requestError) {
  setSessions((items) =>
    items.map((session) =>
      session.id === sessionId
        ? { ...session, messages: session.messages.slice(0, -1) }
        : session
    )
  )
      const message = requestError.code === 'ECONNABORTED'
        ? 'The AI models took too long to respond. Please try again with a shorter prompt.'
        : requestError.response?.data?.message || requestError.message || 'Could not connect to the AI Arena.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function startNewChat() {
  setActiveSessionId(null)
  setError('')
  }

  function deleteSession(sessionId) {
  setSessions((items) => items.filter((session) => session.id !== sessionId))

  if (activeSessionId === sessionId) {
    setActiveSessionId(null)
  }

  setError('')
}

  function selectSession(session) {
  setActiveSessionId(session.id)
  setError('')
  }

  function copySolution(content) {
    navigator.clipboard?.writeText(content || '')
  }

  return <div className="flex min-h-screen bg-[#090909] text-white">
  <Sidebar
    sessions={sessions}
    onNewChat={startNewChat}
    onSelectSession={selectSession}
    onDeleteSession={deleteSession}
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />
    <main className="flex min-w-0 flex-1 flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="mx-auto flex w-full max-w-280 flex-1 flex-col px-5 pb-8 pt-8 sm:px-10 lg:px-14">
        {messages.length === 0 ? <EmptyState onSelectPrompt={setInput} /> : <Conversation messages={messages} onCopy={copySolution} />}
        {error && <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-950/20 px-4 py-3 text-xs text-rose-200">{error} Make sure the backend is running on port 3000.</div>}
        <Composer value={input} loading={loading} onChange={setInput} onSubmit={submit} />
      </div>
    </main>
  </div>
}

export default App
