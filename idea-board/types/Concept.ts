import { BasicIdea } from './BasicIdea';

export class Concept extends BasicIdea {
    done?: boolean;
    references?: string[];

    constructor(description: string, title: string, done: boolean, references: string[]) {
        super(description, title);
        this.done = done;
        this.references = references;
      }
}