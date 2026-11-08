interface RegexRequest {
  pattern: string;
  flags: string;
  text: string;
}
interface RegexMatch {
  index: number;
  text: string;
  groups: (string | undefined)[];
  named: Record<string, string>;
}
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<RegexRequest>) => void) | null;
  postMessage: (value: unknown) => void;
};
scope.onmessage = (event) => {
  try {
    const { pattern, flags, text } = event.data;
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    const add = (match: RegExpExecArray) =>
      matches.push({
        index: match.index,
        text: match[0],
        groups: match.slice(1),
        named: match.groups || {},
      });
    if (flags.includes("g")) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) && matches.length < 2000) {
        add(match);
        if (match[0] === "") {
          const point = text.codePointAt(regex.lastIndex) || 0;
          regex.lastIndex += flags.includes("u") && point > 65535 ? 2 : 1;
        }
      }
    } else {
      const match = regex.exec(text);
      if (match) add(match);
    }
    scope.postMessage({ matches });
  } catch (error) {
    scope.postMessage({
      error:
        error instanceof Error ? error.message : "Invalid regular expression.",
    });
  }
};
export {};
