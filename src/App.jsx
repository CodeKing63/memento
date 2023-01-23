import { useState, useEffect } from 'react';
import Card from './components/Card';
import shuffle from './utilities/shuffle';
import Header from './components/Header';

function App() {
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState(null); // First card picked
  const [pickTwo, setPickTwo] = useState(null); // Second card picked
  const [disabled, setDisabled] = useState(false); // Disable click on cards
  const [wins, setWins] = useState(0); // Number of wins

   // Handle card selection
   const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };


  //Start Over
  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    //Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check for match
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      handleTurn();
    } else {
      setDisabled(true);
      pickTimer = setTimeout(() => {
        handleTurn();
      }, 1000);
    }
  }

  return () => {
    clearTimeout(pickTimer);
  };
}, [cards, pickOne, pickTwo]);

  // If player has found all matches, handle accordingly
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
     <>

      <Header handleNewGame={handleNewGame} wins={wins} />
     
     <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          
          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;