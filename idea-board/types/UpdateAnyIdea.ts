import { AnyIdea } from './AnyIdea';
import { Concept } from './Concept';

export type UpdateAnyIdea<T extends AnyIdea> = Required<Pick<T, 'id'>> & Partial<Omit<Concept, 'id'>>;
