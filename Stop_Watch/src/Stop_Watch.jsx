import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Stopwatch() {
  const [hrs, setHrs] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [ms, setMs] = useState(0);
  const [isActive, setIsActive] = useState(false);

  let startTimer;

  useEffect(() => {
    if (isActive) {
      startTimer = setInterval(() => {
        let updatedMs = ms + 1;
        let updatedSec = sec;
        let updatedMin = min;
        let updatedHrs = hrs;

        if (updatedMs === 100) {
          updatedSec += 1;
          updatedMs = 0;
        }

        if (updatedSec === 60) {
          updatedMin += 1;
          updatedSec = 0;
        }

        if (updatedMin === 60) {
          updatedHrs += 1;
          updatedMin = 0;
        }

        setHrs(updatedHrs);
        setMin(updatedMin);
        setSec(updatedSec);
        setMs(updatedMs);
      }, 10);
    } else {
      clearInterval(startTimer);
    }

    return () => clearInterval(startTimer);
  }, [isActive, hrs, min, sec, ms]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setHrs(0);
    setMin(0);
    setSec(0);
    setMs(0);
    setIsActive(false);
  };

  return (
    <Container className="stopwatch">
      <div className="box">
        <h3>STOP CLOCK IN JAVASCRIPT</h3>
        <div className="frame">
          <Row>
            <Col className="hrs">{String(hrs).padStart(2, '0')}</Col>
            <Col className="colon">:</Col>
            <Col className="min">{String(min).padStart(2, '0')}</Col>
            <Col className="colon">:</Col>
            <Col className="sec">{String(sec).padStart(2, '0')}</Col>
            <Col className="colon">:</Col>
            <Col className="ms">{String(ms).padStart(2, '0')}</Col>
          </Row>
        </div>
        <div className="buttons">
          <Button
            variant="success "
            className={`start ${isActive ? 'start-active' : ''}`}
            onClick={handleStart}
            disabled={isActive}
          >
            Start
          </Button>
          <Button
            variant="primary"
            className={`stop ${isActive ? '' : 'stop-active'}`}
            onClick={handleStop}
            disabled={!isActive}
          >
            Stop
          </Button>
          <Button variant="danger" className="reset" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Stopwatch;
