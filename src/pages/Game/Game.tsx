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

export function Game() {
  const [currentScore] = useState<number>(() => {
    const score = sessionStorage.getItem('currentScoreKey');
    return score ? parseInt(score, 10) : 0;
  });
  useEffect(() => {
    sessionStorage.setItem('currentScoreKey', currentScore.toString());
  }, [currentScore]);

  const [totalWins] = useState<number>(() => {
    const wins = localStorage.getItem('totalWinsKey');
    return wins ? parseInt(wins, 10) : 0;
  });
  useEffect(() => {
    localStorage.setItem('totalWinsKey', totalWins.toString());
  }, [totalWins]);

  const [lastResult, setlastResult] = useState<string>('');
  const [choice, setChoice] = useState<string>('');

  const decideWinner = (playerChoice: number) => {
    const computerChoice = calculateMove();

    setChoice(returnMoveAsName(computerChoice));

    if ((playerChoice + 1) % 3 === computerChoice) {
      setlastResult('Computer wins this round!');
    } else {
      setlastResult('Player wins this round!');
    }

    if (playerChoice === computerChoice) {
      setlastResult("It's a tie");
    }
  };

  return (
    <>
      <NavBar />

      <Container fluid className="mt-4">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={rock} rounded onClick={() => decideWinner(0)} />
          </Col>
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={paper} rounded onClick={() => decideWinner(1)} />
          </Col>
          <Col className="d-flex justify-content-center">
            <Image className="icons custom-svgs" src={scissors} rounded onClick={() => decideWinner(2)} />
          </Col>
        </Row>
        <Row className="custom-stats mt-5">
          <Col className="d-flex justify-content-center">
            <strong>Computers choice:</strong>
&nbsp;
            {choice}
          </Col>
          <Col className="d-flex justify-content-center">
            <strong>Current Score:</strong>
&nbsp;
            {currentScore}
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
