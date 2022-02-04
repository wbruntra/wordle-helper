export default function Guess({ guess }) {
  const getClasses = (k) => {
    switch (k) {
      case 'G':
        return 'letter-box green'
      case 'Y':
        return 'letter-box yellow'
      default:
        return 'letter-box white'
    }
  }

  return (
    <>
      {/* <div className="row justify-content-center"> */}
        {guess.key.split('').map((c, i) => {
          return (
            <div key={`letter-${i}`} className={`${getClasses(c)}`}>
              {guess.word[i]}
            </div>
          )
        })}
      {/* </div> */}
    </>
  )
  return guess.key.split('').map((c, i) => {
    return (
      <div key={`letter-${i}`} className={getClasses(c)}>
        {guess.word[i]}
      </div>
    )
  })
}

// export function NewGuess({ guess, active, movingForward, lastGuess, allowAnimations }) {
//   const [useJump, setUseJump] = useState(false)
//   const isWinner = guess.key === 'GGGGGG'

//   useEffect(() => {
//     const isWinner = guess.key === 'GGGGGG'
//     let timer

//     timer = setTimeout(() => {
//       if (isWinner) {
//         setUseJump(true)
//       }
//     }, 1850)

//     return () => {
//       clearInterval(timer)
//     }
//   })

//   const getLastLetterIndex = () => {
//     if (guess.word.indexOf('-') !== -1) {
//       return guess.word.indexOf('-') - 1
//     }
//     return guess.word.length - 1
//   }

//   return (
//     <div className={`guess`}>
//       {guess.key.split('').map((c, i) => {
//         if (allowAnimations && useJump) {
//           const styles = {}
//           styles.animation = `jump .3s`
//           styles.animationDelay = `${0.08 * i}s`

//           return (
//             <div
//               key={`guess-jump-${i}`}
//               style={styles}
//               className={`${getLetterClasses(guess.word[i], c)}`}
//             >
//               {guess.word[i]}
//             </div>
//           )
//         }

//         if (allowAnimations && lastGuess) {
//           return (
//             <div key={`guess-last-${i}`}>
//               <Flip isWinner={isWinner} letter={guess.word[i]} letterKey={c} position={i} />
//             </div>
//           )
//         }

//         const shouldPop = active && movingForward && getLastLetterIndex() === i
//         return (
//           <div
//             key={`guess-${i}`}
//             className={`${getLetterClasses(guess.word[i], c)} ${shouldPop ? 'pop' : ''}`}
//           >
//             {guess.word[i]}
//           </div>
//         )
//       })}
//     </div>
//   )
// }
