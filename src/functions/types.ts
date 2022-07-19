export interface RandomJokeParameters {
  escape?: "javascript" | "html";
  lastName?: string;
  firstName?: string;
  limitTo?: string;
}

export enum ResponseStatus {
  Success,
  Error,
}
