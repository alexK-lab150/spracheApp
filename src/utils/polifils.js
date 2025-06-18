// Полифил для uuidv4 (вариант для React Native)
//Hermes (движок JavaScript в React Native) не поддерживает Web API, включая crypto.
//Обычная версия uuid пытается использовать crypto.getRandomValues(), что приводит к ошибке.

export const generateCustomId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
