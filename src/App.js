import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Hand from './components/Hand';
import BattleResult from './components/BattleResult';
import GameOver from './components/GameOver';
import Modal from './components/Modal';
import TurnIndicator from './components/TurnIndicator';
import './App.css';

const App = () => {
  const initialDeck = [
    { name: 'Warrior 1', classType: 'Warrior', attack: 1 },
    { name: 'Warrior 2', classType: 'Warrior', attack: 2 },
    { name: 'Warrior 3', classType: 'Warrior', attack: 3 },
    { name: 'Warrior 4', classType: 'Warrior', attack: 4 },
    { name: 'Warrior 5', classType: 'Warrior', attack: 5 },
    { name: 'Warrior 6', classType: 'Warrior', attack: 6 },
    { name: 'Warrior 7', classType: 'Warrior', attack: 7 },
    { name: 'Mage 1', classType: 'Mage', attack: 1 },
    { name: 'Mage 2', classType: 'Mage', attack: 2 },
    { name: 'Mage 3', classType: 'Mage', attack: 3 },
    { name: 'Mage 4', classType: 'Mage', attack: 4 },
    { name: 'Mage 5', classType: 'Mage', attack: 5 },
    { name: 'Mage 6', classType: 'Mage', attack: 6 },
    { name: 'Mage 7', classType: 'Mage', attack: 7 },
    { name: 'Archer 1', classType: 'Archer', attack: 1 },
    { name: 'Archer 2', classType: 'Archer', attack: 2 },
    { name: 'Archer 3', classType: 'Archer', attack: 3 },
    { name: 'Archer 4', classType: 'Archer', attack: 4 },
    { name: 'Archer 5', classType: 'Archer', attack: 5 },
    { name: 'Archer 6', classType: 'Archer', attack: 6 },
    { name: 'Archer 7', classType: 'Archer', attack: 7 },
  ];

  const [playerDeck, setPlayerDeck] = useState([]);
  const [cpuDeck, setCPUDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [cpuHand, setCPUHand] = useState([]);
  const [playerField, setPlayerField] = useState(null);
  const [cpuField, setCPUField] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('Player');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledPlayerDeck = shuffleDeck([...initialDeck]);
    const shuffledCPUDeck = shuffleDeck([...initialDeck]);
    setPlayerDeck(shuffledPlayerDeck.slice(0, 21));
    setCPUDeck(shuffledCPUDeck.slice(0, 21));
    setPlayerHand([]);
    setCPUHand([]);
    setPlayerField(null);
    setCPUField(null);
    setBattleResult(null);
    setGameOver(false);
    setCurrentPlayer('Player');
    setModalContent('');
    drawCards(shuffledPlayerDeck, 4, setPlayerDeck, setPlayerHand);
    drawCards(shuffledCPUDeck, 4, setCPUDeck, setCPUHand);
  };

  const shuffleDeck = (deck) => {
    return [...deck].sort(() => Math.random() - 0.5);
  };

  const drawCards = (sourceDeck, count, setSourceDeck, setHand) => {
    if (sourceDeck.length < count) {
      console.log("Not enough cards in the deck.");
      return;
    }
  
    const cardsToDraw = sourceDeck.slice(0, count);
    setSourceDeck(sourceDeck.slice(count));
    setHand((prevHand) => [...prevHand, ...cardsToDraw]);
  };

  const playCard = (index) => {
    if (currentPlayer === 'Player' && !playerField) {
      const selectedCard = playerHand[index];
      setPlayerHand((prevHand) => prevHand.filter((_, i) => i !== index));
      setPlayerField(selectedCard);
      setCurrentPlayer('CPU');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'CPU' && !cpuField) {
      setTimeout(() => {
        if (cpuHand.length < 4 && cpuDeck.length >= 1) {
          drawCards(cpuDeck, 1, setCPUDeck, setCPUHand);
        }

        if (cpuHand.length > 0) {
          const randomIndex = Math.floor(Math.random() * cpuHand.length);
          const selectedCard = cpuHand[randomIndex];
          setCPUHand((prevHand) => prevHand.filter((_, i) => i !== randomIndex));
          setCPUField(selectedCard);
          setCurrentPlayer('Player');
        } else {
          setCurrentPlayer('Player');
        }
      }, 1000);
    }
  }, [currentPlayer, cpuField, cpuHand, cpuDeck]);

  useEffect(() => {
    if (playerField && cpuField) {
      setTimeout(() => {
        resolveBattle();
      }, 1000);
    }
  }, [playerField, cpuField]);

  useEffect(() => {
    if (currentPlayer === 'Player' && playerHand.length < 4 && playerDeck.length >= 1) {
      drawCards(playerDeck, 1, setPlayerDeck, setPlayerHand);
    } else if (currentPlayer === 'CPU' && cpuHand.length < 4 && cpuDeck.length >= 1) {
      drawCards(cpuDeck, 1, setCPUDeck, setCPUHand);
    }
  }, [currentPlayer, playerHand, playerDeck, cpuHand, cpuDeck, drawCards]);

  const resolveBattle = () => {
    if (!playerField || !cpuField) {
      return;
    }
  
    const playerClass = playerField.classType;
    const cpuClass = cpuField.classType;
  
    if (
      (playerClass === 'Warrior' && cpuClass === 'Archer') ||
      (playerClass === 'Archer' && cpuClass === 'Mage') ||
      (playerClass === 'Mage' && cpuClass === 'Warrior')
    ) {
      // Player wins
      setBattleResult({ winner: 'Player', playerCard: playerField, cpuCard: cpuField });
      setPlayerDeck([...playerDeck, cpuField]);
    } else if (
      (cpuClass === 'Warrior' && playerClass === 'Archer') ||
      (cpuClass === 'Archer' && playerClass === 'Mage') ||
      (cpuClass === 'Mage' && playerClass === 'Warrior')
    ) {
      // CPU wins
      setBattleResult({ winner: 'CPU', playerCard: playerField, cpuCard: cpuField });
      setCPUDeck([...cpuDeck, ...[cpuField, playerField]]);
    } else if (playerField.attack > cpuField.attack) {
      // Player wins
      setBattleResult({ winner: 'Player', playerCard: playerField, cpuCard: cpuField });
      setPlayerDeck([...playerDeck, cpuField]);
    } else if (cpuField.attack > playerField.attack) {
      // CPU wins
      setBattleResult({ winner: 'CPU', playerCard: playerField, cpuCard: cpuField });
      setCPUDeck([...cpuDeck, ...[cpuField, playerField]]);
    } else {
      // Tie scenario
      setBattleResult({ winner: 'Tie', playerCard: playerField, cpuCard: cpuField });
    }
  
    setPlayerField(null);
    setCPUField(null);
  };

  return (
    <div className="app">
      <h1>War!</h1>
      <TurnIndicator currentPlayer={currentPlayer} />
      <GameBoard
        playerDeck={playerDeck}
        cpuDeck={cpuDeck}
        playerField={playerField}
        cpuField={cpuField}
      />
      <Hand
        cards={playerHand}
        onSelectCard={playCard}
        disabled={currentPlayer !== 'Player'}
        isPlayer={true}
      />

      <Hand
        cards={cpuHand}
        onSelectCard={() => {}}
        disabled={currentPlayer === 'Player'}
        isPlayer={false}
      />
      {battleResult && <BattleResult {...battleResult} />}
      {gameOver && <GameOver winner={battleResult.winner === 'Player' ? 'You' : 'CPU'} onNewGame={startNewGame} />}
      {modalContent && <Modal onClose={() => setModalContent('')}>{modalContent}</Modal>}
    </div>
  );
};

export default App;
