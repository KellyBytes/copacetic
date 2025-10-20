import { useState, useEffect, useRef } from 'react';
import ProgressBar from '../ProgressBar';
import { isEncountered, shuffle } from '../../utils';
import DEFINITIONS from '../../utils/VOCAB.json';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
// import confetti from 'canvas-confetti';

export default function Challenge(props) {
  const {
    day,
    daysWords,
    handleChangePage,
    handleIncrementAttempts,
    handleCompleteDay,
    PLAN,
  } = props;
  const { width, height } = useWindowSize();
  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  // const canvasRef = useRef(null);
  // const confettiInstance = useRef(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [listToLearn, setListToLearn] = useState([
    ...daysWords,
    ...shuffle(daysWords),
    ...shuffle(daysWords),
    ...shuffle(daysWords),
  ]);

  const word = listToLearn[wordIndex];
  const isNewWord =
    showDefinition ||
    (!isEncountered(day, word) && wordIndex < daysWords.length);
  const definition = DEFINITIONS[word];
  // const word = 'conpacetic';
  // const definition = 'In excellent order';

  // console.log(daysWords);
  // console.log(listToLearn);
  // console.log(definition);

  const giveUp = () => {
    setListToLearn([...listToLearn, word]);
    setShowDefinition(true);
  };

  // const shootConfetti = () => {
  //   const duration = 1 * 1000;
  //   const animationEnd = Date.now() + duration;

  //   const frame = () => {
  //     const timeLeft = animationEnd - Date.now();
  //     if (timeLeft <= 0) return;

  //     const particleCount = 50 * (timeLeft / duration);

  //     confettiInstance.current({
  //       particleCount,
  //       spread: 360,
  //       startVelocity: 35,
  //       ticks: 60,
  //       origin: { x: 0.5, y: 0.5 },
  //     });

  //     requestAnimationFrame(frame);
  //   };

  //   frame();
  // };

  useEffect(() => {
    console.log(definition);
  }, [definition]);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     confettiInstance.current = confetti.create(canvasRef.current, {
  //       resize: true,
  //       useWorker: true,
  //     });
  //   }
  // }, []);

  return (
    <section id="challenge">
      {isCorrect && (
        <>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={800}
            gravity={0.3}
            wind={0.01}
            recycle={false}
          />
          <div className="correct-message correct-fade">🎉Correct!</div>
        </>
      )}
      {/* <h1>{word}</h1> */}
      <h3>{word}</h3>
      {isNewWord && <em>{definition}</em>}
      <div className="helper">
        <div>
          {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS */}
          {[...Array(definition.length).keys()].map((char, elementIdx) => {
            // determine whether or not the user has typed the character they think is correct, and show red or blue depending on whether or not it's actually correct
            const styleToApply =
              inputVal.length < char + 1
                ? ''
                : inputVal.split('')[elementIdx].toLowerCase() ==
                  definition.split('')[elementIdx].toLowerCase()
                ? 'correct'
                : 'incorrect';
            return <div key={elementIdx} className={` ${styleToApply}`}></div>;
          })}
        </div>
        <input
          type="text"
          placeholder="Enter the word..."
          value={inputVal}
          onChange={(e) => {
            // if the user has entered the correct number of characters, we need to do the followings:
            // 1. if the entry is correct, we need to increment attempts and move them on to the next word
            // 2. if the entry is incorrect, we need to increment attempts, and also if they
            const val = e.target.value;
            setInputVal(val);

            if (
              val.length == definition.length &&
              val.length > inputVal.length
            ) {
              //compare words
              handleIncrementAttempts();

              if (val.toLowerCase() == definition.toLowerCase()) {
                // then the user has the correct outcome
                setIsCorrect(true);
                // shootConfetti();

                setTimeout(() => {
                  setIsCorrect(false);
                  setInputVal('');
                  setShowDefinition(false);

                  if (wordIndex >= listToLearn.length - 1) {
                    handleCompleteDay();
                  } else {
                    setWordIndex(wordIndex + 1);
                  }
                }, 2000);
              }
            }
          }}
        />

        {/* <canvas ref={canvasRef} className="canvas"></canvas> */}
      </div>

      <div className="challenge-btns">
        <button
          className="card-button-secondary"
          onClick={() => handleChangePage(1)}
        >
          <h6>Quit</h6>
        </button>
        <button className="card-button-primary" onClick={giveUp}>
          <h6>I forgot</h6>
        </button>
      </div>

      <ProgressBar
        text={`${wordIndex} / ${listToLearn.length}`}
        remainder={(wordIndex / listToLearn.length) * 100}
      />
    </section>
  );
}
