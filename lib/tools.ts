export const categories = [
  "Text",
  "Developer",
  "Image",
  "Design",
  "PDF",
  "Converters",
  "Calculators",
] as const;
export type Category = (typeof categories)[number];
export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: Category;
  keywords: string[];
  icon: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  why: string;
  steps: string[];
  faq: { question: string; answer: string }[];
  related: string[];
}
export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    description: "Count words, characters, sentences, and reading time.",
    category: "Text",
    keywords: [
      "word & character counter",
      "free word & character counter",
      "text tool",
    ],
    icon: "Type",
    seoTitle: "Word & Character Counter – Free Online Tool",
    metaDescription:
      "Word & Character Counter: count words, characters, sentences, and reading time. Free, browser-based, no account needed.",
    intro:
      "Count words, characters, sentences, and reading time. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A draft can feel short on screen and still run over a submission limit. Count words before sending an application, publishing an article, or preparing a talk. Spaces count toward many social media limits, while some submission systems exclude them. The separate character totals let you check both rules without changing your draft. Reading time uses 238 words per minute; speaking time uses 130. These are planning estimates, not predictions about a specific reader. Pauses, technical language, and audience questions all change the real duration.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is word & character counter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the word & character counter result?",
        answer:
          "These are planning estimates, not predictions about a specific reader.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["case-converter", "lorem-ipsum-generator", "readability-score"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description:
      "Switch between title, sentence, camel, snake, and other cases.",
    category: "Text",
    keywords: ["case converter", "free case converter", "text tool"],
    icon: "CaseSensitive",
    seoTitle: "Case Converter – Free Online Tool",
    metaDescription:
      "Case Converter: switch between title, sentence, camel, snake, and other cases. Free, browser-based, no account needed.",
    intro:
      "Switch between title, sentence, camel, snake, and other cases. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Capitalization gives language a job. A headline needs different styling from a variable name, and a spreadsheet imported from an older system may arrive in uppercase. Converting a whole passage by hand is slow and makes inconsistent spelling easier to miss. Use title case for a quick starting point, then check names and house style yourself. Code identifiers work best with simple words and predictable separators. Acronyms and brand names can need a final edit after conversion. Sentence detection is heuristic, especially around abbreviations.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is case converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the case converter result?",
        answer:
          "Acronyms and brand names can need a final edit after conversion.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "lorem-ipsum-generator", "readability-score"],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Make placeholder copy in words, sentences, or paragraphs.",
    category: "Text",
    keywords: [
      "lorem ipsum generator",
      "free lorem ipsum generator",
      "text tool",
    ],
    icon: "AlignLeft",
    seoTitle: "Lorem Ipsum Generator – Free Online Tool",
    metaDescription:
      "Lorem Ipsum Generator: make placeholder copy in words, sentences, or paragraphs. Free, browser-based, no account needed.",
    intro:
      "Make placeholder copy in words, sentences, or paragraphs. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Layouts need realistic amounts of text before final copy exists. A headline-only mockup does not reveal whether a card grows too tall or a footer drops below the intended fold. Dummy copy helps you exercise those decisions without pretending that temporary words are finished content. Generate the unit you actually need: a fixed word count for a caption, several sentences for a card, or paragraphs for an article layout. Test both short and long versions. Replace filler before publication, and never use it to make a live page appear substantive.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is lorem ipsum generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the lorem ipsum generator result?",
        answer: "Test both short and long versions.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "readability-score"],
  },
  {
    slug: "readability-score",
    name: "Readability Score",
    description: "Check Flesch reading ease and estimated school grade.",
    category: "Text",
    keywords: ["readability score", "free readability score", "text tool"],
    icon: "BookOpen",
    seoTitle: "Readability Score – Free Online Tool",
    metaDescription:
      "Readability Score: check Flesch reading ease and estimated school grade. Free, browser-based, no account needed.",
    intro:
      "Check Flesch reading ease and estimated school grade. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Readable writing respects the time and attention of its audience. The Flesch formulas compare sentence length and syllable density to estimate how demanding a passage may be. They can reveal a paragraph that needs shorter sentences or simpler vocabulary. They cannot judge factual accuracy, empathy, logic, or whether a necessary technical term is explained. A low score is not automatically bad for a specialist paper. A high score does not guarantee clear instructions. Compare drafts for the same audience rather than chasing a universal target.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is readability score free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the readability score result?",
        answer: "A high score does not guarantee clear instructions.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "lorem-ipsum-generator"],
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    description: "Turn a title into a clean, readable URL slug.",
    category: "Text",
    keywords: ["slug generator", "free slug generator", "text tool"],
    icon: "Link",
    seoTitle: "Slug Generator – Free Online Tool",
    metaDescription:
      "Slug Generator: turn a title into a clean, readable URL slug. Free, browser-based, no account needed.",
    intro:
      "Turn a title into a clean, readable URL slug. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A useful URL tells readers what they will find before they open a link. Short, descriptive slugs are easier to scan in search results, analytics reports, and shared messages. Consistent separators also reduce accidental duplicate URL patterns. Removing stop words is optional because small words can carry meaning in names and phrases. Truncating a slug should preserve whole words wherever possible. Review the result before publication, especially for accented names and non-Latin titles. Changing a published URL later usually calls for a permanent redirect.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is slug generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the slug generator result?",
        answer:
          "Review the result before publication, especially for accented names and non-Latin titles.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "lorem-ipsum-generator"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description: "Write Markdown and preview clean, sanitized HTML.",
    category: "Text",
    keywords: ["markdown preview", "free markdown preview", "text tool"],
    icon: "FileCode",
    seoTitle: "Markdown Preview – Free Online Tool",
    metaDescription:
      "Markdown Preview: write Markdown and preview clean, sanitized HTML. Free, browser-based, no account needed.",
    intro:
      "Write Markdown and preview clean, sanitized HTML. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Markdown keeps a document readable in plain text while adding structure for publication. A preview helps you catch broken links, missing headings, and accidental code formatting before copying content into a CMS. HTML output is sanitized because raw markup can contain scripts and unsafe attributes. Sanitization is a safety boundary, not a reason to trust every destination linked in a document. Check heading order and descriptive link text as part of your editorial review. Tables and code blocks should also be tested on a narrow screen.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is markdown preview free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the markdown preview result?",
        answer:
          "Check heading order and descriptive link text as part of your editorial review.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "lorem-ipsum-generator"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description:
      "Test regular expressions, inspect matches and capture groups.",
    category: "Text",
    keywords: ["regex tester", "free regex tester", "text tool"],
    icon: "Regex",
    seoTitle: "Regex Tester – Free Online Tool",
    metaDescription:
      "Regex Tester: test regular expressions, inspect matches and capture groups. Free, browser-based, no account needed.",
    intro:
      "Test regular expressions, inspect matches and capture groups. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Regular expressions are compact, which makes a small typo surprisingly expensive. Test a pattern against representative examples before using it to validate forms or transform records. Include things that should match and things that should not. Capture groups show which part of a match will be extracted, and flags change behavior across lines and letter cases. Common presets are starting points, not complete standards validators. Email addresses and international phone numbers are especially nuanced. Complex patterns can consume substantial CPU time, so testing is isolated in a worker.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is regex tester free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the regex tester result?",
        answer:
          "Email addresses and international phone numbers are especially nuanced.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "lorem-ipsum-generator"],
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Build search and social sharing tags with live previews.",
    category: "Text",
    keywords: ["meta tag generator", "free meta tag generator", "text tool"],
    icon: "Tags",
    seoTitle: "Meta Tag Generator – Free Online Tool",
    metaDescription:
      "Meta Tag Generator: build search and social sharing tags with live previews. Free, browser-based, no account needed.",
    intro:
      "Build search and social sharing tags with live previews. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Metadata is a short invitation to a longer page. A clear title and description help a reader decide whether a result answers their question. Search engines can rewrite snippets, so the preview is illustrative rather than a guarantee. Social platforms rely on Open Graph and Twitter tags when building a shared card. Use an absolute image URL and a publicly accessible image for a reliable preview. Avoid stuffing keywords or promising content the page does not contain. Make each page description specific to its actual purpose.\n\nKeep the intended reader in mind while reviewing the output. A browser-based utility takes care of repetitive editing, leaving you free to check the meaning. Try the supplied example first, then paste a small section of your own material. Compare the result with your original and make any editorial changes before copying it into a published page. The input remains in this tab and is not saved to an account.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is meta tag generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the meta tag generator result?",
        answer:
          "Avoid stuffing keywords or promising content the page does not contain.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["word-counter", "case-converter", "lorem-ipsum-generator"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON with useful errors.",
    category: "Developer",
    keywords: ["json formatter", "free json formatter", "developer tool"],
    icon: "Braces",
    seoTitle: "JSON Formatter – Free Online Tool",
    metaDescription:
      "JSON Formatter: format, validate, and minify JSON with useful errors. Free, browser-based, no account needed.",
    intro:
      "Format, validate, and minify JSON with useful errors. Start with the example, then make it yours. Your input stays in your browser.",
    why: "JSON is easier to inspect when its structure is visible. Indentation reveals nested arrays, objects, and fields that are easy to overlook in a minified response. Validation catches trailing commas, missing quotes, and misplaced punctuation before a payload reaches another system. Formatting does not validate your application schema or tell you whether a field is semantically correct. JavaScript numbers also have precision limits, so very large numeric identifiers should be quoted strings. Duplicate object keys are accepted by JSON.parse and the final value wins. Keep an original copy when that distinction matters.\n\nBefore integrating a result into a production workflow, test it against a known example and one deliberately invalid input. This makes assumptions visible before they become bugs. Keep secrets out of shared screenshots and remember that your clipboard can be read by other applications on your device. The calculation happens locally in this tab, without sending your input to a processing server or writing it to an account history.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is json formatter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the json formatter result?",
        answer:
          "Duplicate object keys are accepted by JSON.parse and the final value wins.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: [
      "base64-encoder-decoder",
      "hash-generator",
      "timestamp-converter",
    ],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode UTF-8 text or turn a small file into a data URI.",
    category: "Developer",
    keywords: [
      "base64 encoder / decoder",
      "free base64 encoder / decoder",
      "developer tool",
    ],
    icon: "Binary",
    seoTitle: "Base64 Encoder / Decoder – Free Online Tool",
    metaDescription:
      "Base64 Encoder / Decoder: encode UTF-8 text or turn a small file into a data URI. Free, browser-based, no account needed.",
    intro:
      "Encode UTF-8 text or turn a small file into a data URI. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Base64 represents bytes using a text-friendly alphabet. It is useful when a protocol cannot carry binary data directly, or when a small asset needs to be embedded in a document. It is not encryption and offers no confidentiality. Anyone with the encoded string can recover the original bytes. Encoding usually increases payload size by about one third, so large embedded images can slow page loads. UTF-8 handling matters for accents, emoji, and non-Latin scripts. A data URI includes the media type as well as the encoded file.\n\nBefore integrating a result into a production workflow, test it against a known example and one deliberately invalid input. This makes assumptions visible before they become bugs. Keep secrets out of shared screenshots and remember that your clipboard can be read by other applications on your device. The calculation happens locally in this tab, without sending your input to a processing server or writing it to an account history.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is base64 encoder / decoder free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the base64 encoder / decoder result?",
        answer:
          "UTF-8 handling matters for accents, emoji, and non-Latin scripts.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["json-formatter", "hash-generator", "timestamp-converter"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Calculate MD5, SHA-1, SHA-256, and SHA-512 checksums.",
    category: "Developer",
    keywords: ["hash generator", "free hash generator", "developer tool"],
    icon: "Fingerprint",
    seoTitle: "Hash Generator – Free Online Tool",
    metaDescription:
      "Hash Generator: calculate MD5, SHA-1, SHA-256, and SHA-512 checksums. Free, browser-based, no account needed.",
    intro:
      "Calculate MD5, SHA-1, SHA-256, and SHA-512 checksums. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A cryptographic hash turns input bytes into a fixed-length fingerprint. Comparing hashes is useful when checking whether a downloaded file matches a published checksum. A tiny change to the input produces a different result. Text whitespace and line endings count as changes, so copy carefully when comparing values. MD5 and SHA-1 are included for compatibility with older workflows, not for new security designs. Use SHA-256 or stronger for integrity checks. None of these plain fast hashes is suitable for storing passwords; that requires a dedicated salted password hashing algorithm.\n\nBefore integrating a result into a production workflow, test it against a known example and one deliberately invalid input. This makes assumptions visible before they become bugs. Keep secrets out of shared screenshots and remember that your clipboard can be read by other applications on your device. The calculation happens locally in this tab, without sending your input to a processing server or writing it to an account history.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is hash generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the hash generator result?",
        answer: "Use SHA-256 or stronger for integrity checks.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: [
      "json-formatter",
      "base64-encoder-decoder",
      "timestamp-converter",
    ],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Translate Unix timestamps into local and UTC dates.",
    category: "Developer",
    keywords: [
      "timestamp converter",
      "free timestamp converter",
      "developer tool",
    ],
    icon: "CalendarClock",
    seoTitle: "Timestamp Converter – Free Online Tool",
    metaDescription:
      "Timestamp Converter: translate Unix timestamps into local and UTC dates. Free, browser-based, no account needed.",
    intro:
      "Translate Unix timestamps into local and UTC dates. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Timestamps make dates portable between systems, but their units are easy to confuse. Unix seconds and JavaScript milliseconds differ by a factor of one thousand. Explicit unit selection prevents a recent event from appearing near 1970 or far into the future. UTC gives teams a shared reference point, while local time is useful for a person reading an event log. Daylight saving transitions can make a local hour ambiguous or nonexistent. Store an unambiguous instant when coordinating systems, and display the relevant timezone with the human-readable value.\n\nBefore integrating a result into a production workflow, test it against a known example and one deliberately invalid input. This makes assumptions visible before they become bugs. Keep secrets out of shared screenshots and remember that your clipboard can be read by other applications on your device. The calculation happens locally in this tab, without sending your input to a processing server or writing it to an account history.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is timestamp converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the timestamp converter result?",
        answer:
          "Daylight saving transitions can make a local hour ambiguous or nonexistent.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["json-formatter", "base64-encoder-decoder", "hash-generator"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate random passwords locally with secure browser randomness.",
    category: "Developer",
    keywords: [
      "password generator",
      "free password generator",
      "developer tool",
    ],
    icon: "KeyRound",
    seoTitle: "Password Generator – Free Online Tool",
    metaDescription:
      "Password Generator: generate random passwords locally with secure browser randomness. Free, browser-based, no account needed.",
    intro:
      "Generate random passwords locally with secure browser randomness. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A strong password should be difficult to predict and different for every account. Human-made patterns often look complicated while remaining easy for attackers to guess. Browser cryptographic randomness avoids familiar substitutions and repeated phrases. Length usually matters more than adding one unusual character. The entropy estimate assumes the selected alphabet is sampled uniformly and is an approximation after category requirements are applied. Save generated credentials in a trusted password manager. This page keeps the current password in tab memory only; copying it places it on your system clipboard.\n\nBefore integrating a result into a production workflow, test it against a known example and one deliberately invalid input. This makes assumptions visible before they become bugs. Keep secrets out of shared screenshots and remember that your clipboard can be read by other applications on your device. The calculation happens locally in this tab, without sending your input to a processing server or writing it to an account history.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is password generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the password generator result?",
        answer: "Save generated credentials in a trusted password manager.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["json-formatter", "base64-encoder-decoder", "hash-generator"],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Shrink JPG, PNG, and WebP images without uploading.",
    category: "Image",
    keywords: ["image compressor", "free image compressor", "image tool"],
    icon: "ImageDown",
    seoTitle: "Image Compressor – Free Online Tool",
    metaDescription:
      "Image Compressor: shrink JPG, PNG, and WebP images without uploading. Free, browser-based, no account needed.",
    intro:
      "Shrink JPG, PNG, and WebP images without uploading. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Oversized images are a common cause of slow web pages and difficult email attachments. Compression trades some visual detail for a smaller transfer, while resizing can deliver larger savings when the source dimensions exceed the intended display size. Compare edges, text, and skin tones before choosing a final quality setting. Lossless PNG sources do not always shrink much with a quality slider. Every picture responds differently. Keep a master original for future edits and export a delivery copy for the destination. The downloaded file stays separate from the source.\n\nStart with the included sample to understand the controls, then select your own source. Compare the output at the size where it will actually be used rather than judging only a thumbnail. Browser processing avoids an upload queue and keeps the source on your device. Large dimensions can still require significant memory, so close other demanding tabs if necessary. Download a separate copy and retain the original so you can make a different export later.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is image compressor free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the image compressor result?",
        answer:
          "Keep a master original for future edits and export a delivery copy for the destination.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["image-resizer", "image-format-converter", "qr-code-generator"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by pixels or percentage, with aspect control.",
    category: "Image",
    keywords: ["image resizer", "free image resizer", "image tool"],
    icon: "Scaling",
    seoTitle: "Image Resizer – Free Online Tool",
    metaDescription:
      "Image Resizer: resize images by pixels or percentage, with aspect control. Free, browser-based, no account needed.",
    intro:
      "Resize images by pixels or percentage, with aspect control. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Image dimensions should match their destination. A large camera photo may be unnecessary for a small profile picture, while a tiny image cannot become genuinely detailed by enlargement. Keeping the aspect ratio avoids stretching faces, logos, and product shapes. Percentage resizing is useful when preparing several proportional variations from one source. Pixel resizing offers precise control for an upload requirement. Check the resulting dimensions before downloading and inspect the image at its intended size. Browser canvas exports create a new image and may remove metadata from the original file.\n\nStart with the included sample to understand the controls, then select your own source. Compare the output at the size where it will actually be used rather than judging only a thumbnail. Browser processing avoids an upload queue and keeps the source on your device. Large dimensions can still require significant memory, so close other demanding tabs if necessary. Download a separate copy and retain the original so you can make a different export later.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is image resizer free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the image resizer result?",
        answer:
          "Check the resulting dimensions before downloading and inspect the image at its intended size.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: [
      "image-compressor",
      "image-format-converter",
      "qr-code-generator",
    ],
  },
  {
    slug: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert JPG, PNG, WebP, or a GIF first frame.",
    category: "Image",
    keywords: [
      "image format converter",
      "free image format converter",
      "image tool",
    ],
    icon: "Images",
    seoTitle: "Image Format Converter – Free Online Tool",
    metaDescription:
      "Image Format Converter: convert JPG, PNG, WebP, or a GIF first frame. Free, browser-based, no account needed.",
    intro:
      "Convert JPG, PNG, WebP, or a GIF first frame. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Different image formats solve different delivery problems. JPEG is a practical choice for photographs without transparency. PNG keeps crisp edges and an alpha channel, which is useful for diagrams and interface assets. WebP often offers a compact alternative supported by modern browsers. Converting a GIF here exports its first decoded frame, not an animation. Choose the format based on the destination rather than the file extension alone. A format change does not restore detail already lost to compression. JPEG exports use a white background where the source is transparent.\n\nStart with the included sample to understand the controls, then select your own source. Compare the output at the size where it will actually be used rather than judging only a thumbnail. Browser processing avoids an upload queue and keeps the source on your device. Large dimensions can still require significant memory, so close other demanding tabs if necessary. Download a separate copy and retain the original so you can make a different export later.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is image format converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the image format converter result?",
        answer:
          "A format change does not restore detail already lost to compression.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["image-compressor", "image-resizer", "qr-code-generator"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Make a custom QR code and download PNG or SVG.",
    category: "Image",
    keywords: ["qr code generator", "free qr code generator", "image tool"],
    icon: "QrCode",
    seoTitle: "QR Code Generator – Free Online Tool",
    metaDescription:
      "QR Code Generator: make a custom QR code and download PNG or SVG. Free, browser-based, no account needed.",
    intro:
      "Make a custom QR code and download PNG or SVG. Start with the example, then make it yours. Your input stays in your browser.",
    why: "QR codes connect a physical object to digital information. A reliable code needs enough contrast, a clear quiet zone, and sufficient printed size for the scanning distance. Dark foregrounds on light backgrounds are usually safest. Error correction can help tolerate a damaged surface, but higher correction also makes the code denser. Test a downloaded code on the actual material before printing a large batch. SVG is useful for sharp print scaling, while PNG works well for everyday documents. A static code keeps the content you entered; it is not a tracked redirect.\n\nStart with the included sample to understand the controls, then select your own source. Compare the output at the size where it will actually be used rather than judging only a thumbnail. Browser processing avoids an upload queue and keeps the source on your device. Large dimensions can still require significant memory, so close other demanding tabs if necessary. Download a separate copy and retain the original so you can make a different export later.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is qr code generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the qr code generator result?",
        answer:
          "SVG is useful for sharp print scaling, while PNG works well for everyday documents.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["image-compressor", "image-resizer", "image-format-converter"],
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Explore HEX, RGB, HSL, CMYK, shades, and complements.",
    category: "Design",
    keywords: ["color picker", "free color picker", "design tool"],
    icon: "Pipette",
    seoTitle: "Color Picker – Free Online Tool",
    metaDescription:
      "Color Picker: explore HEX, RGB, HSL, CMYK, shades, and complements. Free, browser-based, no account needed.",
    intro:
      "Explore HEX, RGB, HSL, CMYK, shades, and complements. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A consistent color system makes an interface easier to understand. HEX and RGB describe screen colors directly, while HSL is often more intuitive when adjusting hue or lightness. Complementary colors can suggest an accent pairing, but a mathematical complement is not automatically a readable combination. Check contrast separately before using a color for small text or essential controls. CMYK values here are approximate because real printing depends on paper, ink, and the selected ICC profile. Ask your printer for production color requirements rather than treating a screen conversion as a press proof.\n\nTry a few variations and evaluate the result in its intended context. A small preview is helpful, but it cannot reproduce every display, lighting condition, or neighboring element in a real interface. Keep the design consistent with the rest of your project and test text contrast independently. Your adjustments stay in this browser tab. Copy the final value into a named design token or stylesheet so teammates can reuse the same choice reliably.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is color picker free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the color picker result?",
        answer:
          "CMYK values here are approximate because real printing depends on paper, ink, and the selected ICC profile.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["css-gradient-generator", "word-counter", "case-converter"],
  },
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description: "Build linear and radial CSS gradients with custom stops.",
    category: "Design",
    keywords: [
      "css gradient generator",
      "free css gradient generator",
      "design tool",
    ],
    icon: "Blend",
    seoTitle: "CSS Gradient Generator – Free Online Tool",
    metaDescription:
      "CSS Gradient Generator: build linear and radial CSS gradients with custom stops. Free, browser-based, no account needed.",
    intro:
      "Build linear and radial CSS gradients with custom stops. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A gradient can communicate depth or separate a section without an image download. Native CSS gradients stay crisp as a layout changes size. Color stop positions determine where transitions happen, and closely spaced stops can create a deliberately sharp band. Linear gradients follow an angle; radial gradients spread outward from a center. Review the gradient at both phone and desktop dimensions because its proportions affect the visible result. Avoid placing low-contrast text over a changing background. Copy the generated background declaration into an existing selector rather than replacing an entire stylesheet.\n\nTry a few variations and evaluate the result in its intended context. A small preview is helpful, but it cannot reproduce every display, lighting condition, or neighboring element in a real interface. Keep the design consistent with the rest of your project and test text contrast independently. Your adjustments stay in this browser tab. Copy the final value into a named design token or stylesheet so teammates can reuse the same choice reliably.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is css gradient generator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the css gradient generator result?",
        answer: "Avoid placing low-contrast text over a changing background.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["color-picker", "word-counter", "case-converter"],
  },
  {
    slug: "pdf-merge",
    name: "PDF Merge",
    description: "Combine and reorder PDFs in your browser.",
    category: "PDF",
    keywords: ["pdf merge", "free pdf merge", "pdf tool"],
    icon: "Files",
    seoTitle: "PDF Merge – Free Online Tool",
    metaDescription:
      "PDF Merge: combine and reorder PDFs in your browser. Free, browser-based, no account needed.",
    intro:
      "Combine and reorder PDFs in your browser. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Merging PDFs brings related records into a single document that is easier to send and review. Order matters: a cover sheet, supporting evidence, and appendices should follow a predictable sequence. Check file names and page counts before combining documents, then inspect the downloaded result. Encrypted files need to be unlocked by an authorized owner before they can be processed. Digital signatures may no longer be valid after a document is rebuilt. Interactive forms, bookmarks, and accessibility structure are not guaranteed to survive page copying. Retain the source documents when those properties matter.\n\nBegin with the generated sample if you want to check the workflow without using a personal document. All page processing happens on your device, so a slow or memory-limited browser may take longer with a large file. Review the downloaded document before sharing it. Keep your originals and avoid relying on a browser conversion as the only copy of an important record. No file contents are sent to a remote processing service.",
    steps: [
      "Add two or more PDFs, or load the sample pair.",
      "Drag documents into order, or use the move buttons.",
      "Merge, then download and inspect the combined PDF.",
    ],
    faq: [
      {
        question: "Is pdf merge free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the pdf merge result?",
        answer:
          "Interactive forms, bookmarks, and accessibility structure are not guaranteed to survive page copying.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["pdf-split", "pdf-compress", "word-counter"],
  },
  {
    slug: "pdf-split",
    name: "PDF Split",
    description: "Extract a page range or save each page as a separate PDF.",
    category: "PDF",
    keywords: ["pdf split", "free pdf split", "pdf tool"],
    icon: "Scissors",
    seoTitle: "PDF Split – Free Online Tool",
    metaDescription:
      "PDF Split: extract a page range or save each page as a separate PDF. Free, browser-based, no account needed.",
    intro:
      "Extract a page range or save each page as a separate PDF. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Sharing a whole PDF is not always necessary. Extracting the relevant pages can reduce attachment size and keep unrelated material out of a conversation. Page numbers refer to physical positions in the file, which may differ from printed page labels such as Roman numeral introductions. Check the range before extracting and open the result to confirm it contains the intended content. Splitting pages is not redaction; hidden content within a selected page can remain in the output. Use a purpose-built redaction workflow when sensitive material must be permanently removed.\n\nBegin with the generated sample if you want to check the workflow without using a personal document. All page processing happens on your device, so a slow or memory-limited browser may take longer with a large file. Review the downloaded document before sharing it. Keep your originals and avoid relying on a browser conversion as the only copy of an important record. No file contents are sent to a remote processing service.",
    steps: [
      "Choose a PDF or load the sample.",
      "Enter page positions such as 1-3, 5, or choose every page.",
      "Extract the selection or download the page ZIP.",
    ],
    faq: [
      {
        question: "Is pdf split free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the pdf split result?",
        answer:
          "Splitting pages is not redaction; hidden content within a selected page can remain in the output.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["pdf-merge", "pdf-compress", "word-counter"],
  },
  {
    slug: "pdf-compress",
    name: "PDF Compress",
    description: "Reduce PDF size by rebuilding pages as compressed images.",
    category: "PDF",
    keywords: ["pdf compress", "free pdf compress", "pdf tool"],
    icon: "FileDown",
    seoTitle: "PDF Compress – Free Online Tool",
    metaDescription:
      "PDF Compress: reduce PDF size by rebuilding pages as compressed images. Free, browser-based, no account needed.",
    intro:
      "Reduce PDF size by rebuilding pages as compressed images. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A scanned PDF can be too large for an upload portal even when it contains only a few pages. Raster compression rebuilds each page as a JPEG image at a chosen resolution. That can save space for image-heavy documents, but it removes selectable text, links, forms, and document structure. It may also make a small text PDF larger. Choose higher quality for fine print and lower quality only when visual detail is less important. Keep the original accessible document whenever possible. This approach is a delivery workaround, not archival preservation.\n\nBegin with the generated sample if you want to check the workflow without using a personal document. All page processing happens on your device, so a slow or memory-limited browser may take longer with a large file. Review the downloaded document before sharing it. Keep your originals and avoid relying on a browser conversion as the only copy of an important record. No file contents are sent to a remote processing service.",
    steps: [
      "Load a PDF and check its size.",
      "Select a quality level; rasterization removes selectable text.",
      "Compress, compare sizes, and download if useful.",
    ],
    faq: [
      {
        question: "Is pdf compress free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the pdf compress result?",
        answer: "Keep the original accessible document whenever possible.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["pdf-merge", "pdf-split", "word-counter"],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, mass, volume, area, speed, and storage.",
    category: "Converters",
    keywords: ["unit converter", "free unit converter", "converters tool"],
    icon: "Ruler",
    seoTitle: "Unit Converter – Free Online Tool",
    metaDescription:
      "Unit Converter: convert length, mass, volume, area, speed, and storage. Free, browser-based, no account needed.",
    intro:
      "Convert length, mass, volume, area, speed, and storage. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Unit conversions should be explicit about the quantity being measured. A square meter is an area, not a length, and a gigabyte can mean different things in different technical contexts. This converter separates metric decimal storage from binary units such as GiB. Volume units use US customary gallons and fluid ounces rather than Imperial variants. Small differences can matter when following a specification or comparing products. Preserve enough digits during intermediate calculations and round the final result for the actual use case. A calculator cannot determine the measurement uncertainty of your source value.\n\nTry a familiar value first so you can verify that the input and output units are the ones you intended. Keep the original measurement alongside your converted result when precision matters. Displayed values are rounded for readability; tiny floating-point differences can occur in browser arithmetic. This is a practical everyday reference, not a substitute for a contractual rate, calibrated instrument, or professional specification. Review any unusually large result for a unit or decimal-entry mistake.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is unit converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the unit converter result?",
        answer:
          "Preserve enough digits during intermediate calculations and round the final result for the actual use case.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: [
      "currency-converter",
      "temperature-converter",
      "percentage-calculator",
    ],
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Compare currencies using dated Frankfurter reference rates.",
    category: "Converters",
    keywords: [
      "currency converter",
      "free currency converter",
      "converters tool",
    ],
    icon: "ArrowLeftRight",
    seoTitle: "Currency Converter – Free Online Tool",
    metaDescription:
      "Currency Converter: compare currencies using dated Frankfurter reference rates. Free, browser-based, no account needed.",
    intro:
      "Compare currencies using dated Frankfurter reference rates. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A reference exchange rate is useful for planning a trip, comparing an invoice, or estimating a budget. It is not the same as the rate offered by your bank or card provider. Fees, spreads, weekends, and settlement timing can all change the amount you actually receive. Frankfurter publishes reference data for supported currencies, and the date shown here is the date of the rate rather than a promise of live trading prices. The browser caches retrieved rates in memory for this tab. Check a provider quote before committing to a payment.\n\nTry a familiar value first so you can verify that the input and output units are the ones you intended. Keep the original measurement alongside your converted result when precision matters. Displayed values are rounded for readability; tiny floating-point differences can occur in browser arithmetic. This is a practical everyday reference, not a substitute for a contractual rate, calibrated instrument, or professional specification. Review any unusually large result for a unit or decimal-entry mistake.",
    steps: [
      "Enter an amount and choose the source currency.",
      "Choose the destination and request a rate.",
      "Check the rate date and compare with your provider.",
    ],
    faq: [
      {
        question: "Is currency converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Only the selected currency codes are sent to Frankfurter to fetch reference rates. Your amount is calculated locally. Optional analytics and advertising are described in our privacy policy.",
      },
      {
        question:
          "What should I check before using the currency converter result?",
        answer: "The browser caches retrieved rates in memory for this tab.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: [
      "unit-converter",
      "temperature-converter",
      "percentage-calculator",
    ],
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, and Kelvin with formulas.",
    category: "Converters",
    keywords: [
      "temperature converter",
      "free temperature converter",
      "converters tool",
    ],
    icon: "Thermometer",
    seoTitle: "Temperature Converter – Free Online Tool",
    metaDescription:
      "Temperature Converter: convert Celsius, Fahrenheit, and Kelvin with formulas. Free, browser-based, no account needed.",
    intro:
      "Convert Celsius, Fahrenheit, and Kelvin with formulas. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Temperature scales use both different step sizes and different zero points. That makes a temperature conversion more than a simple multiplication. Celsius and Kelvin share the same interval size, while Fahrenheit has smaller degree steps. Kelvin starts at absolute zero, so a negative Kelvin input is physically invalid. When reading a recipe or equipment specification, confirm both the value and the scale. A change of ten degrees is not converted with the same offset as an absolute temperature. The displayed formula helps you follow the arithmetic instead of relying on a number alone.\n\nTry a familiar value first so you can verify that the input and output units are the ones you intended. Keep the original measurement alongside your converted result when precision matters. Displayed values are rounded for readability; tiny floating-point differences can occur in browser arithmetic. This is a practical everyday reference, not a substitute for a contractual rate, calibrated instrument, or professional specification. Review any unusually large result for a unit or decimal-entry mistake.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is temperature converter free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the temperature converter result?",
        answer:
          "A change of ten degrees is not converted with the same offset as an absolute temperature.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["unit-converter", "currency-converter", "percentage-calculator"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate a percentage, share, or percentage change.",
    category: "Converters",
    keywords: [
      "percentage calculator",
      "free percentage calculator",
      "converters tool",
    ],
    icon: "Percent",
    seoTitle: "Percentage Calculator – Free Online Tool",
    metaDescription:
      "Percentage Calculator: calculate a percentage, share, or percentage change. Free, browser-based, no account needed.",
    intro:
      "Calculate a percentage, share, or percentage change. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Percentages describe proportions, but the reference amount must be clear. Ten percent of a price is different from asking what percentage one number represents of another. Percentage change compares a difference with the starting value, so reversing the direction changes the answer. A move from 50 to 100 is a 100 percent increase; returning to 50 is a 50 percent decrease. A starting value of zero has no finite percentage change. Negative starting values can be mathematically calculated but may be misleading in financial reports, so interpret them carefully.\n\nTry a familiar value first so you can verify that the input and output units are the ones you intended. Keep the original measurement alongside your converted result when precision matters. Displayed values are rounded for readability; tiny floating-point differences can occur in browser arithmetic. This is a practical everyday reference, not a substitute for a contractual rate, calibrated instrument, or professional specification. Review any unusually large result for a unit or decimal-entry mistake.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is percentage calculator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the percentage calculator result?",
        answer: "A starting value of zero has no finite percentage change.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["unit-converter", "currency-converter", "temperature-converter"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Find calendar age, total days, and your next birthday.",
    category: "Calculators",
    keywords: ["age calculator", "free age calculator", "calculators tool"],
    icon: "Cake",
    seoTitle: "Age Calculator – Free Online Tool",
    metaDescription:
      "Age Calculator: find calendar age, total days, and your next birthday. Free, browser-based, no account needed.",
    intro:
      "Find calendar age, total days, and your next birthday. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Calendar age is not simply a day count divided by 365. Months have different lengths, leap years add a day, and a birthday may not have occurred yet in the current year. This tool works with calendar dates and displays years, months, and remaining days alongside the total elapsed days. The next birthday countdown follows a February 28 convention for February 29 births in non-leap years. Official age rules can depend on your jurisdiction. Use an authoritative record for eligibility, legal deadlines, or medical decisions rather than a convenience calculation.\n\nUse realistic inputs and check the displayed assumptions before acting on a result. Changing one value at a time can make the relationship easier to understand. Results are a convenient reference rather than a substitute for professional advice or an official record. Browser arithmetic may round very small fractions for display. Nothing you enter is stored in an account, and refreshing the page returns the calculator to its example values unless the tool explicitly states otherwise.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is age calculator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the age calculator result?",
        answer: "Official age rules can depend on your jurisdiction.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["bmi-calculator", "loan-emi-calculator", "pomodoro-timer"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate adult body mass index in metric or imperial.",
    category: "Calculators",
    keywords: ["bmi calculator", "free bmi calculator", "calculators tool"],
    icon: "Activity",
    seoTitle: "BMI Calculator – Free Online Tool",
    metaDescription:
      "BMI Calculator: calculate adult body mass index in metric or imperial. Free, browser-based, no account needed.",
    intro:
      "Calculate adult body mass index in metric or imperial. Start with the example, then make it yours. Your input stays in your browser.",
    why: "Body mass index relates weight to height using a simple formula. It is a population screening measure, not a diagnosis or a complete picture of health. Two people with the same BMI can have very different body composition, fitness, and medical histories. Standard adult categories are not designed for children, pregnancy, or every clinical context. Some populations have different risk thresholds. Use the number as a starting point for a conversation with a qualified health professional, not as a judgment about a person. Accurate measurements matter more than extra decimal places.\n\nUse realistic inputs and check the displayed assumptions before acting on a result. Changing one value at a time can make the relationship easier to understand. Results are a convenient reference rather than a substitute for professional advice or an official record. Browser arithmetic may round very small fractions for display. Nothing you enter is stored in an account, and refreshing the page returns the calculator to its example values unless the tool explicitly states otherwise.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is bmi calculator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the bmi calculator result?",
        answer:
          "Use the number as a starting point for a conversation with a qualified health professional, not as a judgment about a person.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["age-calculator", "loan-emi-calculator", "pomodoro-timer"],
  },
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    description: "Estimate monthly payments and yearly loan amortization.",
    category: "Calculators",
    keywords: [
      "loan emi calculator",
      "free loan emi calculator",
      "calculators tool",
    ],
    icon: "Landmark",
    seoTitle: "Loan EMI Calculator – Free Online Tool",
    metaDescription:
      "Loan EMI Calculator: estimate monthly payments and yearly loan amortization. Free, browser-based, no account needed.",
    intro:
      "Estimate monthly payments and yearly loan amortization. Start with the example, then make it yours. Your input stays in your browser.",
    why: "An installment payment combines interest and repayment of principal. Early in a standard amortizing loan, more of each payment goes toward interest because the outstanding balance is larger. A yearly table makes that shift visible. This estimate assumes a fixed annual rate, monthly payments, and no fees, taxes, insurance, or early repayment charges. A zero-interest loan simply divides the principal across the payment count. Compare a lender schedule before making a commitment, especially when interest compounds differently or the rate can change. Affordability also depends on income stability and other obligations.\n\nUse realistic inputs and check the displayed assumptions before acting on a result. Changing one value at a time can make the relationship easier to understand. Results are a convenient reference rather than a substitute for professional advice or an official record. Browser arithmetic may round very small fractions for display. Nothing you enter is stored in an account, and refreshing the page returns the calculator to its example values unless the tool explicitly states otherwise.",
    steps: [
      "Start with the example or enter your own input.",
      "Adjust the available settings and review the result.",
      "Copy or download your output when it is ready.",
    ],
    faq: [
      {
        question: "Is loan emi calculator free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question:
          "What should I check before using the loan emi calculator result?",
        answer:
          "Compare a lender schedule before making a commitment, especially when interest compounds differently or the rate can change.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["age-calculator", "bmi-calculator", "pomodoro-timer"],
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "Find a calmer rhythm with focused work and short breaks.",
    category: "Calculators",
    keywords: ["pomodoro timer", "free pomodoro timer", "calculators tool"],
    icon: "Timer",
    seoTitle: "Pomodoro Timer – Free Online Tool",
    metaDescription:
      "Pomodoro Timer: find a calmer rhythm with focused work and short breaks. Free, browser-based, no account needed.",
    intro:
      "Find a calmer rhythm with focused work and short breaks. Start with the example, then make it yours. Your input stays in your browser.",
    why: "A short focus session can make a large task feel approachable. The timer gives work and rest clear boundaries without requiring you to plan an entire day. Choose a concrete task before starting, then use the break to move away from the screen. The default rhythm is 25 minutes of focus followed by a five-minute break, but you can adjust it to your needs. Notifications require browser permission and may be blocked by system settings. Background tabs can throttle updates; the countdown uses elapsed time to stay accurate when you return.\n\nUse realistic inputs and check the displayed assumptions before acting on a result. Changing one value at a time can make the relationship easier to understand. Results are a convenient reference rather than a substitute for professional advice or an official record. Browser arithmetic may round very small fractions for display. Nothing you enter is stored in an account, and refreshing the page returns the calculator to its example values unless the tool explicitly states otherwise.",
    steps: [
      "Set focus and break durations while the timer is reset.",
      "Start your session; pause whenever you need to.",
      "Allow notifications if wanted, and follow the work/break rhythm.",
    ],
    faq: [
      {
        question: "Is pomodoro timer free?",
        answer:
          "Yes. There is no account requirement, subscription, or processing quota. Your browser memory and the displayed file limits still apply.",
      },
      {
        question: "Does my input leave my device?",
        answer:
          "Tool input and file contents are processed in this tab and are not uploaded. Optional analytics record event names and tool slugs, never your text or files.",
      },
      {
        question: "What should I check before using the pomodoro timer result?",
        answer:
          "Notifications require browser permission and may be blocked by system settings.",
      },
      {
        question: "Can I use it on a phone?",
        answer:
          "Yes. The controls work with touch and keyboard input. Large files may need more memory than a mobile browser has available.",
      },
    ],
    related: ["age-calculator", "bmi-calculator", "loan-emi-calculator"],
  },
];
export const getTool = (slug: string) =>
  tools.find((tool) => tool.slug === slug);
