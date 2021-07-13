import { NotificationService } from "./notification-service";

/* 
  Task 1. Define types for:
      - `BasicIdea`: Base type, contains `description` and `title` fields.
      - `ToDo`: Similar to `BasicIdea`, contains also `done` field.
      - `Concept`: Similar to `ToDo`, contains optional `done` and `references` fields, `references` is an array of URLs (strings).

  Use these types in other tasks, don't forget about `repository`. Please think of a way how we can easily distinguish idea types.
*/

export class IdeaService {
  private readonly repository: any[] = []; // This should hold all types of ideas.

  constructor(private readonly notificationService: NotificationService) {}

  /*
    Task 2. Implement `create` method, it should accept all idea types and return the corresponding, concrete type. Use `repository` to store the input.
  */
  create(idea: any): any {
    throw new Error("Remove me in task 2.");
  }

  /* 
    Task 3. Implement `update` method, it should accept update for all idea types. Bonus points if it accepts partial update.
    
    Additionally, we must ensure that if `title` in `BasicIdea`, `done` in `ToDo` or `references` in `Concept` are changed we call the Notification service.
    
    Please bear in mind that in the future we may need to notify about other fields update as well.
    We need to ensure that we won't forget about any new fields added in the future.
    
    Use `repository` to store the update and `notificationService` to notify about the update.
  */
  update(update: any): Promise<void> {
    throw new Error("Remove me in task 3.");
  }

  /*
    Task 4. Implement `getAllByType` method, it accepts idea type and returns an array of the corresponding, concrete types.
    
    Use `repository` to fetch ideas.
  */
  getAllByType(type: any): any[] {
    throw new Error("Remove me in task 4.");
  }
}

/*
  Task 5. Write unit tests for `IdeaService` class. For simplicity don't bother with `repository`.
*/
