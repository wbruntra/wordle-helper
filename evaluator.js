import inquirer from 'inquirer'
import { evaluateToString } from './src/utils'

const run = async () => {
  const questions = [
    {
      name: 'answer',
      message: 'Correct answer: ',
    },
  ]

  const answers = await inquirer.prompt(questions)
  const { answer } = answers

  let guess
  while (true) {
    const guesser = await inquirer.prompt([
      {
        name: 'guess',
        message: 'Guess: ',
      },
    ])

    ;({ guess } = guesser)
    console.log(evaluateToString(guess, answer))
  }
}

run()
