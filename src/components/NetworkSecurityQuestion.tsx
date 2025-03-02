import React, { useState } from "react";
import { Box, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Alert, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Server, Tablet, Cloud, Router, Shield } from "lucide-react";
import { NetworkSecurityData, NetworkSecurityQuestionProps } from "../types/network-security";
import { networkSecurityData } from "../data/network-security-challenge";

export const NetworkSecurityQuestion: React.FC<NetworkSecurityQuestionProps> = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState(data[currentQuestionIndex].attackTypes[0]);
  const [placedItems, setPlacedItems] = useState<Record<string, string>>({});
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    attack: string;
    placements: Record<string, string>;
  }>({ attack: "", placements: {} });
  const [submitted, setSubmitted] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const currentQuestion = data[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAttack(data[currentQuestionIndex + 1].attackTypes[0]);
      handleReset();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAttack(data[currentQuestionIndex - 1].attackTypes[0]);
      handleReset();
    }
  };

  const handleDragStart = (item: string) => {
    if (submitted) return;
    const event = window.event as DragEvent;
    event.dataTransfer?.setData("text/plain", item);
  };

  const handleDrop = (location: string) => {
    if (submitted) return;
    const draggedItem = (window.event as DragEvent).dataTransfer?.getData("text/plain");
    if (!draggedItem) return;

    const newPlacedItems = { ...placedItems, [location]: draggedItem };
    setPlacedItems(newPlacedItems);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let newScore = 0;

    // Check each location for correct answers
    Object.entries(currentQuestion.correctAnswers).forEach(([location, answers]) => {
      if (location !== "explanation" && Array.isArray(answers)) {
        const attackIndex = currentQuestion.attackTypes.indexOf(selectedAttack);
        if (attackIndex !== -1 && answers[attackIndex] === placedItems[location]) {
          newScore++;
        }
      }
    });

    setSelectedAnswers({
      attack: selectedAttack,
      placements: { ...placedItems },
    });

    setScore(newScore);
  };

  const handleShowAnswer = () => {
    setShowingAnswer(true);
    const newPlacedItems: Record<string, string> = {};

    Object.entries(currentQuestion.correctAnswers).forEach(([location, value]) => {
      if (location !== "explanation" && Array.isArray(value)) {
        const attackIndex = currentQuestion.attackTypes.indexOf(selectedAttack);
        newPlacedItems[location] = value[attackIndex];
      }
    });
    setPlacedItems(newPlacedItems);
  };

  const handleReset = () => {
    setPlacedItems({});
    setSubmitted(false);
    setShowingAnswer(false);
  };

  const ScenarioPanel = () => (
    <Alert severity="info" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {currentQuestion.scenario.title}
      </Typography>
      <Typography>{currentQuestion.scenario.description}</Typography>
    </Alert>
  );

  const TipPanel = () => {
    if (!showTip) return null;

    return (
      <Alert severity="success" sx={{ mt: 2 }} onClose={() => setShowTip(false)}>
        <Typography variant="h6" gutterBottom>
          Tip for {selectedAttack}
        </Typography>
        <Typography>{currentQuestion.tips[selectedAttack]}</Typography>
      </Alert>
    );
  };

  const ExplanationPanel = () => {
    if (!showingAnswer) return null;

    const attackIndex = currentQuestion.attackTypes.indexOf(selectedAttack);

    return (
      <Alert
        severity="info"
        sx={{
          mt: 2,
          "& .MuiAlert-message": {
            width: "100%",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Correct Answers for {selectedAttack}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Security Measure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(currentQuestion.correctAnswers).map(([location, answers]) => {
              if (location === "explanation") return null;
              return (
                <TableRow key={location}>
                  <TableCell>{location}</TableCell>
                  <TableCell>{Array.isArray(answers) ? answers[attackIndex] : ""}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Typography sx={{ mt: 2, fontStyle: "italic" }}>{currentQuestion.correctAnswers.explanation || ""}</Typography>
      </Alert>
    );
  };

  const DragDropPanel = () => (
    <Box sx={{ width: 250, bgcolor: "background.paper", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "inherit" }}>Drag & Drop</FormLabel>
          {currentQuestion.securityMeasures.map((measure) => (
            <Button
              key={measure}
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: "warning.main",
                "&:hover": { bgcolor: "warning.dark" },
              }}
              draggable
              onDragStart={() => handleDragStart(measure)}
            >
              {measure}
            </Button>
          ))}
        </Box>
      </Paper>

      <FormControl component="fieldset">
        <FormLabel>Select type of attack</FormLabel>
        <RadioGroup
          value={selectedAttack}
          onChange={(e) => {
            setSelectedAttack(e.target.value);
            handleReset();
          }}
        >
          {currentQuestion.attackTypes.map((attack) => (
            <FormControlLabel
              key={attack}
              value={attack}
              control={<Radio disabled={showingAnswer} />}
              label={attack}
              sx={{
                color: showingAnswer && attack === selectedAttack ? "success.main" : "inherit",
                "& .MuiRadio-root": {
                  color: showingAnswer && attack === selectedAttack ? "success.main" : undefined,
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const ElementContainer = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      {children}
      <Box sx={{ mt: 1, fontSize: "0.8rem" }}>{title}</Box>
    </Paper>
  );

  const SecuritySlot = ({ location }: { location: string }) => {
    const placedItem = placedItems[location];
    const answers = currentQuestion.correctAnswers[location];
    const attackIndex = currentQuestion.attackTypes.indexOf(selectedAttack);
    const correctAnswer = Array.isArray(answers) ? answers[attackIndex] : undefined;

    const isCorrect = submitted && placedItem === correctAnswer;
    const shouldShowAnswer = showingAnswer && correctAnswer !== undefined;

    return (
      <Box
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(location);
        }}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          width: 150,
          height: 50,
          border: "2px dashed",
          borderColor: isCorrect ? "success.main" : shouldShowAnswer ? "info.main" : "warning.main",
          borderRadius: 1,
          m: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: placedItem ? "background.paper" : "transparent",
          color: isCorrect ? "success.main" : shouldShowAnswer ? "info.main" : "text.primary",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {(placedItem || (showingAnswer && correctAnswer)) && <Box sx={{ p: 1, fontSize: "0.8rem", textAlign: "center" }}>{showingAnswer ? correctAnswer : placedItem}</Box>}
      </Box>
    );
  };

  const NetworkElements = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 4 }}>
      {/* Top row with common elements */}
      {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("firewall")) && (
        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <ElementContainer title="Attacker">
            <Tablet color="#f44336" size={32} />
          </ElementContainer>
          <ElementContainer title="Internet">
            <Cloud size={32} />
          </ElementContainer>
          <ElementContainer title="Firewall">
            <Shield size={32} />
            <SecuritySlot location="firewall-1" />
            <SecuritySlot location="firewall-2" />
          </ElementContainer>
        </Box>
      )}

      {/* Web and Database servers */}
      {(Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("webserver")) || Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("database"))) && (
        <Box sx={{ display: "flex", gap: 8 }}>
          {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("webserver")) && (
            <Box>
              <ElementContainer title="Web Server">
                <Server size={32} />
              </ElementContainer>
              <SecuritySlot location="webserver-1" />
              <SecuritySlot location="webserver-2" />
            </Box>
          )}

          {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("database")) && (
            <Box>
              <ElementContainer title="Database">
                <Server size={32} />
              </ElementContainer>
              <SecuritySlot location="database-1" />
              <SecuritySlot location="database-2" />
            </Box>
          )}
        </Box>
      )}

      {/* CRM and Email servers */}
      {(Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("crm")) || Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("email"))) && (
        <Box sx={{ display: "flex", gap: 8 }}>
          {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("crm")) && (
            <Box>
              <ElementContainer title="CRM Server">
                <Server size={32} />
              </ElementContainer>
              <SecuritySlot location="crm-1" />
              <SecuritySlot location="crm-2" />
            </Box>
          )}

          {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("email")) && (
            <Box>
              <ElementContainer title="Email Server">
                <Server size={32} />
              </ElementContainer>
              <SecuritySlot location="email-server-1" />
              <SecuritySlot location="email-server-2" />
            </Box>
          )}
        </Box>
      )}

      {/* System and Other servers */}
      {Object.keys(currentQuestion.correctAnswers).some((key) => key.startsWith("system")) && (
        <Box sx={{ display: "flex", gap: 8 }}>
          <Box>
            <ElementContainer title="System">
              <Server size={32} />
            </ElementContainer>
            <SecuritySlot location="system-1" />
            <SecuritySlot location="system-2" />
          </Box>
        </Box>
      )}
    </Box>
  );

  const ScoreTracker = () => {
    const totalQuestions = 8;
    const progress = (score / totalQuestions) * 100;

    const getScoreBreakdown = () => {
      if (!submitted) return null;

      const currentAnswers = currentQuestion.correctAnswers[selectedAnswers.attack] || {};
      const attackLocations = Object.keys(currentAnswers).filter((key) => key !== "explanation");

      const hasCorrectAttack = attackLocations.length > 0 && attackLocations.some((location) => selectedAnswers.placements[location] === currentAnswers[location]);

      return (
        <Box sx={{ mt: 1, fontSize: "0.9rem", color: "text.secondary" }}>
          <div>Attack Type Selection: {hasCorrectAttack ? "✓" : "✗"}</div>
          <div>Security Measures: {score - (hasCorrectAttack ? 1 : 0)} points</div>
        </Box>
      );
    };

    return (
      <Box sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box variant="h6" color="primary" component="div" sx={{ fontWeight: "bold" }}>
            Score: {score}/{totalQuestions}
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Box variant="h6" color="primary" component="div" sx={{ fontWeight: "bold" }}>
              {progress.toFixed(1)}%
            </Box>
            {getScoreBreakdown()}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 10,
            bgcolor: "background.paper",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: "100%",
              bgcolor: "success.main",
              transition: "width 0.3s ease",
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        p: 4,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <ScenarioPanel />
      <ScoreTracker />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="outlined" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous Question
        </Button>
        <Typography variant="h6">
          Question {currentQuestionIndex + 1} of {data.length}
        </Typography>
        <Button variant="outlined" onClick={handleNextQuestion} disabled={currentQuestionIndex === data.length - 1}>
          Next Question
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <DragDropPanel />
          <NetworkElements />
        </Box>
        <TipPanel />
        <ExplanationPanel />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitted || showingAnswer}>
            Submit Answer
          </Button>
          <Button variant="outlined" color="info" onClick={handleShowAnswer} disabled={showingAnswer}>
            Show Correct Answer
          </Button>
          <Button variant="outlined" color="success" onClick={() => setShowTip(true)} disabled={showingAnswer}>
            Get Tip
          </Button>
          <Button variant="outlined" color="warning" onClick={handleReset} disabled={!submitted && !showingAnswer}>
            Try Again
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
