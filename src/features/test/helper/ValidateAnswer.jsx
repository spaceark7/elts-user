export const validateAnswer = (answerKey, userAnswers) => {
  const answerMap = new Map(answerKey.map((item) => [item.id, item]))

  const score = userAnswers.reduce((acc, curr) => {
    const answer = answerMap.get(curr.id)
    if (!answer) return acc

    if (
      curr.answer === answer.answer ||
      curr.answer === answer.alternate_answer
    ) {
      return acc + 1
    }

    return acc
  }, 0)

  return score
}
