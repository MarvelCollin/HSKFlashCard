import type { IPronunciation } from './IPronunciation';

export interface IForm {
  t: string;
  i: IPronunciation;
  m: string[];
  c: string[];
}
