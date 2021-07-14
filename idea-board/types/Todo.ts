import { BasicIdea } from './BasicIdea';

export class Todo extends BasicIdea {
    done: boolean;

    constructor(description: string, title: string, done: boolean) {
      super(description, title);
      this.done = done;
    }
}