"use client";
import { useState } from "react";
import { Textarea, Stats, CopyButton } from "../ui";
import { textStats } from "@/lib/calculations";
export default function WordCounter() {
  const [text, setText] = useState(
    "Small tools make room for big ideas. Write something worth sharing.\n\nStart here, and see your words add up.",
  );
  const s = textStats(text);
  return (
    <>
      <Textarea
        label="Your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Stats
        items={{
          Words: s.words,
          Characters: s.characters,
          "Without spaces": s.noSpaces,
          Sentences: s.sentences,
          Paragraphs: s.paragraphs,
          "Reading time": `${Math.ceil(s.reading * 60)} sec`,
          "Speaking time": `${Math.ceil(s.speaking * 60)} sec`,
        }}
      />
      <CopyButton text={text} />
    </>
  );
}
