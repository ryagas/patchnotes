import { wrapIfNotArray } from '@bscotch/utility';

interface ParsedLog {
  type: string;
  startPosition: number;
  descriptionStartPosition: number;
  content: string;
  endPosition?: number;
  tags: string[];
  scope?: string;
}

export class Patchnote {
  constructor(private parsedLog: ParsedLog) {
    //
  }

  get title() {
    return this.parsedLog.content.split(/\n/)[0];
  }

  toJSON() {
    return {
      title: this.title,
    };
  }
}

/**
 * The GitMessage class takes a full Git message in its
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
      const messageParts = formatMatch.groups as unknown as {
        type: string;
        tag?: string;
        startPosition: number;
      };
      const log: ParsedLog = {
        ...messageParts,
        descriptionStartPosition: conventionalFormatRegex.lastIndex,
        startPosition:
          conventionalFormatRegex.lastIndex - formatMatch[0].length,
        tags: wrapIfNotArray(messageParts.tag),
        content: '',
      };
      parsedLogs.push(log);
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
      // Identify the title line and body, and then remove extraneous newlines.
      const extraneousNewlineRegex = /(?<!\n)\n(?!\n)/g;
      log.content = log.content
        .replace(/\r/g, '')
        .replace(extraneousNewlineRegex, ' ');
    }

    return parsedLogs.map(log => new Patchnote(log));
  }
}
