class PatchnotesError extends Error {
  constructor(message?: string) {
    super(message || 'Something went wrong');
    this.name = 'PatchnotesError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function assert(claim: any, message?: string): asserts claim {
  if (!claim) {
    throw new PatchnotesError(message || 'Something went wrong');
  }
}
