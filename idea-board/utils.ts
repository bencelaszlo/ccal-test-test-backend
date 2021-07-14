export const notifyUpdateKeys = {
    BasicIdea: ['title'],
    Todo: ['done'],
    Concept: ['references']
};

export type ideaTypes = keyof typeof notifyUpdateKeys;

export const shouldSendNotification = (constructorName: ideaTypes, updateKeys: Array<string>) => {
    return notifyUpdateKeys[constructorName].some(key => updateKeys.includes(key))
}
