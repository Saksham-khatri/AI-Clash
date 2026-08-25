export function formatScore(value) {
  return Number.isInteger(value) ? value : Number(value || 0).toFixed(1)
}

export function createSessionTitle(problem) {
  const cleanedProblem = problem.replace(/\s+/g, ' ').trim()
  if (!cleanedProblem) return 'Untitled session'

  const words = cleanedProblem.split(' ')
  const title = words.slice(0, 6).join(' ')
  return `${title}${words.length > 6 ? '...' : ''}`
}

export function toMarkdown(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value.map((part) => typeof part === 'string' ? part : part?.text || part?.content || '').join('\n')
  }
  if (value && typeof value === 'object') return value.text || value.content || JSON.stringify(value, null, 2)
  return ''
}

export function getRecommendation(judge) {
  if (!judge) return null

  if (judge.solution_1_score === judge.solution_2_score) {
    return {
      title: 'The judge found a tie',
      detail: 'Both solutions received the same rating. Choose based on your constraints and the explanations below.',
      winner: null,
      scores: [{ number: 1, score: judge.solution_1_score, winner: false }, { number: 2, score: judge.solution_2_score, winner: false }],
    }
  }

  const firstWins = judge.solution_1_score > judge.solution_2_score
  return {
    title: `Solution ${firstWins ? '1' : '2'} is the stronger choice`,
    detail: `It leads by ${Math.abs(judge.solution_1_score - judge.solution_2_score)} point${Math.abs(judge.solution_1_score - judge.solution_2_score) === 1 ? '' : 's'} based on the judge's evaluation.`,
    winner: firstWins ? 1 : 2,
    scores: [{ number: 1, score: judge.solution_1_score, winner: firstWins }, { number: 2, score: judge.solution_2_score, winner: !firstWins }],
  }
}
