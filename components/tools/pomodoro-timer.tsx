"use client";
import { useEffect, useRef, useState } from "react";
import { Input, Button, Toast } from "../ui";
export default function Pomodoro() {
  const [focus, setFocus] = useState("25");
  const [rest, setRest] = useState("5");
  const [phase, setPhase] = useState<"Focus" | "Break">("Focus");
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [message, setMessage] = useState("");
  const deadline = useRef(0);
  const audio = useRef<AudioContext | null>(null);
  const valid =
    Number(focus) >= 1 &&
    Number(focus) <= 180 &&
    Number(rest) >= 1 &&
    Number(rest) <= 60;
  const chime = () => {
    const ctx = audio.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 660;
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  };
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setSeconds(remaining);
      if (!remaining) {
        setRunning(false);
        const next = phase === "Focus" ? "Break" : "Focus";
        setPhase(next);
        if (phase === "Focus") setCycles((v) => v + 1);
        setSeconds(Number(next === "Focus" ? focus : rest) * 60);
        setMessage(
          `${phase} complete. Time for ${next.toLowerCase()}. Press start when ready.`,
        );
        chime();
        if ("Notification" in window && Notification.permission === "granted") {
          try {
            new Notification("Mentix Tools timer", {
              body: `${phase} complete. Time for ${next.toLowerCase()}.`,
            });
          } catch {
            setMessage(
              "Session complete. System notifications are unavailable in this browser.",
            );
          }
        }
      }
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [running, phase, focus, rest]);
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  const reset = () => {
    setRunning(false);
    setPhase("Focus");
    setSeconds(Number(focus) * 60);
    setCycles(0);
    setMessage("");
  };
  const start = () => {
    if (!valid) {
      setMessage("Focus must be 1–180 minutes and break 1–60 minutes.");
      return;
    }
    try {
      audio.current ||= new AudioContext();
      void audio.current.resume();
    } catch {
      /* The visual timer works without audio. */
    }
    deadline.current = Date.now() + seconds * 1000;
    setRunning(true);
    setMessage("");
  };
  return (
    <>
      <div className="form-grid">
        <Input
          label="Focus (minutes)"
          type="number"
          min="1"
          max="180"
          disabled={
            running ||
            cycles > 0 ||
            phase !== "Focus" ||
            seconds !== Number(focus) * 60
          }
          value={focus}
          onChange={(e) => {
            setFocus(e.target.value);
            setSeconds(Math.max(0, Number(e.target.value)) * 60);
          }}
        />
        <Input
          label="Break (minutes)"
          type="number"
          min="1"
          max="60"
          disabled={running}
          value={rest}
          onChange={(e) => setRest(e.target.value)}
        />
      </div>
      <section className="timer-face">
        <span className="eyebrow">{phase} session</span>
        <p
          role="timer"
          aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`}
        >
          {String(Math.floor(seconds / 60)).padStart(2, "0")}
          <span>:</span>
          {String(seconds % 60).padStart(2, "0")}
        </p>
        <small>
          {cycles} focus {cycles === 1 ? "session" : "sessions"} completed
        </small>
      </section>
      <div className="actions centered">
        <Button
          disabled={!valid}
          onClick={() => (running ? setRunning(false) : start())}
        >
          {running ? "Pause" : "Start"} {phase.toLowerCase()}
        </Button>
        <Button secondary onClick={reset}>
          Reset
        </Button>
        <Button
          secondary
          onClick={async () => {
            if (!("Notification" in window)) {
              setMessage("This browser does not support notifications.");
              return;
            }
            try {
              const p = await Notification.requestPermission();
              setMessage(
                p === "granted"
                  ? "Notifications enabled for this browser."
                  : "Notifications were not allowed. The timer and sound still work.",
              );
            } catch {
              setMessage("Notifications are unavailable here.");
            }
          }}
        >
          Enable notifications
        </Button>
      </div>
      <Toast message={message} />
      <p className="muted">
        Each completed session waits for you to start the next. State stays in
        this tab only. Closing or refreshing clears it.
      </p>
    </>
  );
}
