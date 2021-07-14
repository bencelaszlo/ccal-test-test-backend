import { IdeaService } from './idea-service';
import { BasicIdea } from './types/BasicIdea';
import { Concept } from './types/Concept';
import { Todo } from './types/Todo';
import { AnyIdea } from './types/AnyIdea';

const notificationService = {
    notify: jest.fn()
  };

const ideaService = new IdeaService(notificationService);

test('It should create a new BasicIdea element in the repository', async () => {
  const testTitle: string = 'test title';
  const testDescription: string = 'test description';

  const idea = new BasicIdea(testDescription, testTitle);
  const createdIdea = await ideaService.create<BasicIdea>(idea);

  expect(createdIdea.constructor.name).toBe('BasicIdea');
  expect(createdIdea.id.constructor.name).toBe('String');
  expect(createdIdea.description).toBe(testDescription);
  expect(createdIdea.title).toBe(testTitle);
})

test('It should create a new Todo element in the repository', async () => {
  const testTitle: string = 'test title';
  const testDescription: string = 'test description';
  const testDone: boolean = true;

  const todo = new Todo(testDescription, testTitle, testDone);
  const createdTodo = await ideaService.create<Todo>(todo);

  expect(createdTodo.constructor.name).toBe('Todo');
  expect(createdTodo.id.constructor.name).toBe('String');
  expect(createdTodo.description).toBe(testDescription);
  expect(createdTodo.title).toBe(testTitle);
  expect(createdTodo.done).toBe(testDone);
})

test('It should create a new Concept element in the repository', async () => {
  const testTitle: string = 'test title';
  const testDescription: string = 'test description';
  const testDone: boolean = false;
  const testReferences: Array<string> = [];

  const concept = new Concept(testDescription, testTitle, testDone, testReferences);
  const createdConcept = await ideaService.create<Concept>(concept);

  expect(createdConcept.constructor.name).toBe('Concept');
  expect(createdConcept.id.constructor.name).toBe('String');
  expect(createdConcept.description).toBe(testDescription);
  expect(createdConcept.title).toBe(testTitle);
  expect(createdConcept.done).toBe(testDone);
  expect(createdConcept.references).toBe(testReferences);
})

test('It should return only BasicIdea typed items from the repository', async() => {
  const ideas = ideaService.getAllByType<BasicIdea>('BasicIdea');
  expect(ideas.length).toBe(1);
  ideas.forEach(idea => {
    expect(idea.constructor.name).toBe('BasicIdea');
  })
})

test('It should return only Todo typed items from the repository', async() => {
  const todos = ideaService.getAllByType<Todo>('Todo');
  expect(todos.length).toBe(1);
  todos.forEach(todo => {
    expect(todo.constructor.name).toBe('Todo');
  })
})


test('It should return only Concept typed items from the repository', async() => {
  const concepts = ideaService.getAllByType<Concept>('Concept');
  expect(concepts.length).toBe(1);
  concepts.forEach(concept => {
    expect(concept.constructor.name).toBe('Concept');
  })
})

test('It should update BasicIdea item with a new title and description', async () => {
  const testTitle: string = 'test title';
  const testDescription: string = 'test description';

  const idea = new BasicIdea(testDescription, testTitle);
  const createdIdea = await ideaService.create<BasicIdea>(idea);

  const { id } = createdIdea;

  const updatedDescription = 'updated description';
  const updatedTitle = 'updated title';

  const updatedItem = await ideaService.update<AnyIdea>({
    id,
    title: updatedTitle,
    description: updatedDescription
  });

  expect(updatedItem.description).toBe(updatedDescription);
  expect(updatedItem.title).toBe(updatedTitle);
  expect(notificationService.notify).toBeCalledTimes(1);
})

test('It should update BasicIdea item with only a new description (partial update)', async () => {
  const testTitle: string = 'test title';
  const testDescription: string = 'test description';

  const idea = new BasicIdea(testDescription, testTitle);
  const createdIdea = await ideaService.create<BasicIdea>(idea);

  const { id } = createdIdea;

  const updatedDescription = 'updated description';

  const updatedItem = await ideaService.update({
    id,
    description: updatedDescription
  });

  expect(updatedItem.description).toBe(updatedDescription);
  expect(updatedItem.title).toBe(testTitle);
})
