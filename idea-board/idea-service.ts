import { NotificationService } from './notification-service';
import { Todo } from './types/Todo';
import { AnyIdea } from './types/AnyIdea';
import { BasicIdea } from './types/BasicIdea';
import {Concept } from './types/Concept';
import { UpdateAnyIdea } from './types/UpdateAnyIdea';

/* 
  Task 1. Define types for:
      - `BasicIdea`: Base type, contains `description` and `title` fields.
      - `ToDo`: Similar to `BasicIdea`, contains also `done` field.
      - `Concept`: Similar to `ToDo`, contains optional `done` and `references` fields, `references` is an array of URLs (strings).

  Use these types in other tasks, don't forget about `repository`. Please think of a way how we can easily distinguish idea types.
*/

export class IdeaService {
  private readonly repository: Array<AnyIdea> = []; // This should hold all types of ideas.

  constructor(private readonly notificationService: NotificationService) {}

  /*
    Task 2. Implement `create` method, it should accept all idea types and return the corresponding, concrete type. Use `repository` to store the input.
  */
  async create<T extends AnyIdea>(idea: T): Promise<T> {
    this.repository.push(idea);
    return idea;
  }

  /* 
    Task 3. Implement `update` method, it should accept update for all idea types. Bonus points if it accepts partial update.
    
    Additionally, we must ensure that if `title` in `BasicIdea`, `done` in `ToDo` or `references` in `Concept` are changed we call the Notification service.
    
    Please bear in mind that in the future we may need to notify about other fields update as well.
    We need to ensure that we won't forget about any new fields added in the future.
    
    Use `repository` to store the update and `notificationService` to notify about the update.
  */
  async update<T extends AnyIdea>(update: UpdateAnyIdea<T>): Promise<T> {
    const { id, ...updates } = update;
    const updateKeys = Object.keys(updates);

    const item = this.repository.find(idea => idea.id === id);
    if (!item) {
      throw new Error(`Idea item with ID ${id} does not exist in the repository. The update cannot be performed.`);
    }

    this.repository.map(item => item.id === id ? Object.assign(item, updates) : item);

    const notifyUpdateKeys = {
      BasicIdea: ['title'],
      Todo: ['done'],
      Concept: ['references']
    };

    const constructorName = item.constructor.name;

    if (constructorName === BasicIdea.name && notifyUpdateKeys['BasicIdea'].some(key => updateKeys.includes(key))) {
      this.notificationService.notify({
        id: id,
        type: constructorName,
        updatedFields: (notifyUpdateKeys['BasicIdea'].filter(key => updateKeys.includes(key)))
      });
    } else if (constructorName === Todo.name && notifyUpdateKeys['Todo'].some(key => updateKeys.includes(key))) {
      this.notificationService.notify({
        id: id,
        type: constructorName,
        updatedFields: (notifyUpdateKeys['Todo'].filter(key => updateKeys.includes(key)))
      });
    } else if (constructorName === Concept.name && notifyUpdateKeys['Concept'].some(key => updateKeys.includes(key))) {
      this.notificationService.notify({
        id: id,
        type: constructorName,
        updatedFields: (notifyUpdateKeys['Concept'].filter(key => updateKeys.includes(key)))
      });
    }

    const updatedItem = this.repository.find(item => item.id === id);
    return updatedItem as T;
  }

  /*
    Task 4. Implement `getAllByType` method, it accepts idea type and returns an array of the corresponding, concrete types.
    
    Use `repository` to fetch ideas.
  */
  getAllByType<T extends AnyIdea>(type: string): Array<T> {
    return this.repository.filter(idea => idea.constructor.name === type) as Array<T>;
  }
}

/*
  Task 5. Write unit tests for `IdeaService` class. For simplicity don't bother with `repository`.
*/
