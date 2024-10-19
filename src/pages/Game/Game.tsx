/* eslint-disable max-len */
import {
  Col, Container, Image, Row,
} from 'react-bootstrap';

import './Game.scss';

import { useEffect, useState } from 'react';
import paper from '../../assets/paper.svg';
import rock from '../../assets/rock.svg';
import scissors from '../../assets/scissors.svg';
import { NavBar } from '../../components/NavBar/NavBar.tsx';
import { calculateMove, returnMoveAsName } from '../../components/Game/computer.ts';

// Main logic that should definitely be more broken apart
export function Game() {
  // These save, retrieve and update the score for the current game of logged in user,
  // the total wins of logged in user and the current score of the computer for current logged in user (even after logging out and relogging(current game only if its in the same tab))
  const [currentPlayerScore, setCurrentPlayerScore] = useState<number>(() => {
    const score = sessionStorage.getItem(`currentPlayerScoreKey${localStorage.getItem('currentUser')}`);
    return score ? parseInt(score, 10) : 0;
  });
  useEffect(() => {
    sessionStorage.setItem(`currentPlayerScoreKey${localStorage.getItem('currentUser')}`, currentPlayerScore.toString());
  }, [currentPlayerScore]);
  const increasePlayerScore = () => {
    setCurrentPlayerScore((oldValue) => oldValue + 1);
  };

  const [currentComputerScore, setCurrentComputerScore] = useState<number>(() => {
    const score = sessionStorage.getItem(`currentComputerScoreKey${localStorage.getItem('currentUser')}`);
    return score ? parseInt(score, 10) : 0;
  });
  useEffect(() => {
    sessionStorage.setItem(`currentComputerScoreKey${localStorage.getItem('currentUser')}`, currentComputerScore.toString());
  }, [currentComputerScore]);
  const increaseComputerScore = () => {
    setCurrentComputerScore((oldValue) => oldValue + 1);
  };

  const [totalWins, setTotalWins] = useState<number>(() => {
    const wins = localStorage.getItem(`totalWinsKey${localStorage.getItem('currentUser')}`);
    return wins ? parseInt(wins, 10) : 0;
  });
  useEffect(() => {
    localStorage.setItem(`totalWinsKey${localStorage.getItem('currentUser')}`, totalWins.toString());
  }, [totalWins]);
  const increaseTotalWins = () => {
    setTotalWins((oldValue) => oldValue + 1);
  };

  const resetScores = () => {
    setCurrentComputerScore(0);
    setCurrentPlayerScore(0);
  };

  const [lastResult, setlastResult] = useState<string>('');
  const [choice, setChoice] = useState<string>('');

  // Main game logic
  const resolveGameStates = (playerChoice: number) => {
    const computerChoice = calculateMove();

    setChoice(returnMoveAsName(computerChoice)); // returns random Integer (pseudo since Ints dont exist in JS/TS) between 0 and 2

    if (playerChoice === computerChoice) {
      setlastResult("It's a tie");
    } else if ((playerChoice + 1) % 3 === computerChoice) { // Simple math to determine who won
      setlastResult('Computer wins this round!');
      increaseComputerScore();
    } else {
      setlastResult('Player wins this round!');
      increasePlayerScore();
    }

    if (currentPlayerScore >= 10) {
      increaseTotalWins();
      resetScores();
    } else if (currentComputerScore >= 10) {
      resetScores();
    }
  };

  return (
    <>
      <NavBar />

      <Container fluid className="mt-4">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={rock} rounded onClick={() => resolveGameStates(0)} />
          </Col>
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={paper} rounded onClick={() => resolveGameStates(1)} />
          </Col>
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={scissors} rounded onClick={() => resolveGameStates(2)} />
          </Col>
        </Row>
        <Row className="custom-stats mt-5">
          <Col className="d-flex justify-content-center">
            <strong>Computers choice:</strong>
&nbsp;
            {choice}
          </Col>
          <Col className="d-flex justify-content-center">
            <strong>Current Score(First to 10):</strong>
&nbsp;
            {currentPlayerScore}
            {' '}
            |
            {' '}
            {currentComputerScore}
          </Col>
        </Row>
        <Row className="custom-stats">
          <Col className="d-flex justify-content-center">
            <strong>Result: </strong>
&nbsp;
            {lastResult}
          </Col>
          <Col className="d-flex justify-content-center">
            <strong>Total Wins: </strong>
&nbsp;
            {totalWins}
          </Col>
        </Row>
      </Container>

    </>
  );
}
