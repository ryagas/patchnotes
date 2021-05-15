interface ParsedLog {
  type: string;
  startPosition: number;
  descriptionStartPosition: number;
  content?: string;
  endPosition?: number;
  tag?: string;
  scope?: string;
}

/**
 * The Message class takes a full Git message in its
 * constructor and parses it into a Patchnotes-compatible
 * data structure.
 */
export class GitMessage {
  constructor(readonly message: string) {}

  static parse(rawGitMessage: string) {
    const conventionalFormatRegex =
      /^(?<type>[a-z]{3,16})(\(((?<tag>[a-z0-9]*)\|)?(?<scope>[^)]+)\))?\s*:\s*/gm;

    const parsedLogs: ParsedLog[] = [];

    // Find individual change logs within a string that can contain multiple
    while (true) {
      const formatMatch = conventionalFormatRegex.exec(rawGitMessage);
      if (!formatMatch) {
        break;
      }
      const messageParts = formatMatch.groups as unknown as ParsedLog;
      messageParts.descriptionStartPosition = conventionalFormatRegex.lastIndex;
      messageParts.startPosition =
        messageParts.descriptionStartPosition - formatMatch[0].length;
      parsedLogs.push(messageParts);
    }

    // For each message, find the body and finish parsing
    for (let i = 0; i < parsedLogs.length; i++) {
      const log = parsedLogs[i];
      if (i == parsedLogs.length - 1) {
        log.endPosition = rawGitMessage.length;
      } else {
        log.endPosition = parsedLogs[i + 1].startPosition - 1;
      }
      log.content = rawGitMessage.slice(
        log.descriptionStartPosition,
        log.endPosition
      );
    }

    return parsedLogs;
  }
}
