"use client";
import { useState } from "react";
import { Input, Select, Slider, Button, CopyButton, Result } from "../ui";
export default function Gradient() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(120);
  const [stops, setStops] = useState([
    { id: 0, color: "#3e4a3d", position: 0 },
    { id: 1, color: "#e8dcc5", position: 50 },
    { id: 2, color: "#b5573b", position: 100 },
  ]);
  const css = `${type}-gradient(${type === "linear" ? `${angle}deg` : "circle at center"}, ${[
    ...stops,
  ]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ")})`;
  return (
    <>
      <div
        className="gradient-preview"
        style={{ background: css }}
        role="img"
        aria-label="Gradient preview"
      />
      <div className="form-grid">
        <Select
          label="Gradient type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </Select>
        {type === "linear" && (
          <Slider
            label="Angle"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        )}
      </div>
      <h2>Color stops</h2>
      {stops.map((s, i) => (
        <div className="stop-row" key={s.id}>
          <Input
            label={`Color ${i + 1}`}
            type="color"
            value={s.color}
            onChange={(e) =>
              setStops(
                stops.map((t) =>
                  t.id === s.id ? { ...t, color: e.target.value } : t,
                ),
              )
            }
          />
          <Slider
            label="Position %"
            min="0"
            max="100"
            value={s.position}
            onChange={(e) =>
              setStops(
                stops.map((t) =>
                  t.id === s.id
                    ? { ...t, position: Number(e.target.value) }
                    : t,
                ),
              )
            }
          />
          <Button
            secondary
            disabled={stops.length <= 2}
            onClick={() => setStops(stops.filter((t) => t.id !== s.id))}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        secondary
        disabled={stops.length >= 12}
        onClick={() =>
          setStops([
            ...stops,
            { id: Date.now(), color: "#faf7f2", position: 50 },
          ])
        }
      >
        Add color stop
      </Button>
      <Result>
        <pre>{`background: ${css};`}</pre>
        <CopyButton text={`background: ${css};`} />
      </Result>
    </>
  );
}
