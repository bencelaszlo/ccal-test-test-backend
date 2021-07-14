import { v4 as uuidv4 } from 'uuid';

export class BasicIdea {
    id: string;
    description: string;
    title: string;

    constructor(description: string, title: string) {
        this.id = uuidv4(); // Generate unique ID
        this.description = description;
        this.title = title;
      }
}
