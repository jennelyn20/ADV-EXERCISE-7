import React, { useState, useEffect } from 'react';

const quizQuestions = [
  { question: "What is the largest land animal?", options: ["Elephant", "Giraffe", "Whale", "Tiger"], answer: "Elephant" },
  { question: "Which bird is known for its colorful feathers?", options: ["Penguin", "Peacock", "Eagle", "Sparrow"], answer: "Peacock" },
  { question: "What is the fastest land animal?", options: ["Cheetah", "Horse", "Leopard", "Tiger"], answer: "Cheetah" },
  { question: "Which animal is known as the king of the jungle?", options: ["Lion", "Tiger", "Elephant", "Bear"], answer: "Lion" },
  { question: "Which animal is known for its ability to change colors?", options: ["Octopus", "Chameleon", "Frog", "Snake"], answer: "Chameleon" },
  { question: "Which mammal is capable of true flight?", options: ["Bat", "Flying Squirrel", "Eagle", "Owl"], answer: "Bat" },
  { question: "Which animal is known for building dams?", options: ["Beaver", "Otter", "Duck", "Swan"], answer: "Beaver" },
  { question: "What is the tallest animal?", options: ["Elephant", "Giraffe", "Kangaroo", "Rhino"], answer: "Giraffe" },
  { question: "Which sea creature has eight legs?", options: ["Jellyfish", "Octopus", "Starfish", "Crab"], answer: "Octopus" },
  { question: "Which animal is the largest mammal?", options: ["Elephant", "Blue Whale", "Hippopotamus", "Shark"], answer: "Blue Whale" },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Quiz() {
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(null);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray([...quizQuestions]));
  }, []);

  const handleOptionClick = (option) => {
    if (isQuizOver || showCorrectAnswer) return;

    const newSelectedAnswers = [...selectedAnswers, option];
    setSelectedAnswers(newSelectedAnswers);
    setShowCorrectAnswer(true);
  };

  const goToNextQuestion = () => {
    setShowCorrectAnswer(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const totalScore = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);
    setScore(totalScore);
    setIsQuizOver(true);
  };

  const restartQuiz = () => {
    setQuestions(shuffleArray([...quizQuestions]));
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(null);
    setIsQuizOver(false);
    setShowCorrectAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5 sm:p-3">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        {!isQuizOver ? (
          <>
            {/* Question Number Display */}
            <div className="mb-4 text-lg md:text-xl">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-6">{questions[currentQuestionIndex].question}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`py-2 px-4 md:py-3 md:px-6 rounded-md text-base md:text-lg transition ${
                    showCorrectAnswer && option === questions[currentQuestionIndex].answer
                      ? 'bg-green-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  disabled={showCorrectAnswer}
                >
                  {option}
                </button>
              ))}
            </div>

            {showCorrectAnswer && (
              <div className="text-center">
                <p className="mb-4 text-lg">
                  {selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer
                    ? "Correct!"
                    : `Wrong! The correct answer is: ${questions[currentQuestionIndex].answer}`}
                </p>
                <button
                  onClick={goToNextQuestion}
                  className="bg-blue-600 hover:bg-blue-500 py-2 px-4 md:py-3 md:px-6 rounded-md text-lg transition"
                >
                  Next Question
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Quiz Over!</h2>
            <p className="text-lg md:text-xl mb-6">Your Score: {score} / {questions.length}</p>
            <button
              onClick={restartQuiz}
              className="bg-blue-600 hover:bg-blue-500 py-2 px-4 md:py-3 md:px-6 rounded-md text-lg transition"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
