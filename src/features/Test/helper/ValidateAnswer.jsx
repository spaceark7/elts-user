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

  // let score = 0

  // userAnswers.forEach((userAnswer) => {
  //   const answerPart = answerKey.find(
  //     (answer) => answer.page_no.toString() === userAnswer.page
  //   )
  //   if (!answerPart) return

  //   userAnswer.answers.forEach((userAns) => {
  //     const answer = answerPart.answers.find(
  //       (ans) => ans.question_no === userAns.id
  //     )
  //     if (!answer) return

  //     if (
  //       userAns.answer.toLowerCase() === answer.answer.toLowerCase() ||
  //       (answer.alternate_answer &&
  //         userAns.answer.toLowerCase() ===
  //           answer.alternate_answer.toLowerCase())
  //     ) {
  //       ++score
  //     }
  //   })
  // })

  // return score

  //   return answerKey.reduce((score, answerPart) => {
  //     const userPart = userAnswers.find(
  //       (part) => part.page === answerPart.part_no
  //     )
  //     console.log(
  //       'userPart: ',
  //       userAnswers.find((part) => part.page === answerPart.part_no)
  //     )
  //     if (!userPart) return score

  //     const partScore =
  //       answerPart.answers.filter((answer) => {
  //         const userAnswer = userPart.answers.find((ans) => ans.id === answer.id)
  //         if (!userAnswer) return false

  //         return (
  //           userAnswer.answer.toLowerCase() === answer.answer.toLowerCase() ||
  //           (answer.alternate_answer &&
  //             userAnswer.answer.toLowerCase() ===
  //               answer.alternate_answer.toLowerCase())
  //         )
  //       }).length * 5

  //     return score + partScore
  //   }, 0)
}
