import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    // Базовый URL для отправки запросов на сервер
    this.baseURL = 'http://localhost:3000/api';
  }

  // Метод для получения списка всех тикетов
  async list(callback) {
    try {
      // Отправляем GET-запрос на сервер для получения списка тикетов
      const response = await createRequest({ method: 'GET', endpoint: `/?method=allTickets`});

      // Выводим ответ сервера в консоль (для демонстрации)
      console.log(response);

      // Вызываем колбэк и передаем ему полученные данные
      callback(response);
    } catch (error) {
      // В случае ошибки выводим сообщение в консоль и выбрасываем исключение
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to fetch tickets from the server.');
    }
  }

  // Метод для получения тикета по его идентификатору
  async get(id, callback) {
    try {
      // Отправляем GET-запрос на сервер для получения тикета по его идентификатору
      const response = await createRequest({ method: 'GET', endpoint: `/api?method=ticketById&id=${id}` });

      // Извлекаем данные из ответа
      const data = await response.json();

      // Вызываем колбэк и передаем ему полученные данные
      callback(data);
    } catch (error) {
      console.error('Error fetching by ID:', error);
      throw new Error(`Failed to fetch ticket with ID ${id} from the server.`);
    }
  }

  // Метод для создания нового тикета
async create(data, callback) {
  try {
    // Отправляем POST-запрос на сервер для создания нового тикета
    const response = await createRequest({
      method: 'POST',
      endpoint: '/?method=createTicket',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    // Выводим ответ сервера в консоль (для демонстрации)
    console.log(response);

    // Проверяем наличие заголовка "content-type" в ответе
    if (response.headers && response.headers.has('content-type')) {
      const contentType = response.headers.get('content-type');

      // Проверяем, является ли тип содержимого ответа JSON
      if (contentType.includes('application/json')) {
        // Извлекаем данные из ответа
        const responseData = await response.json();

        // Проверяем, является ли ответ успешным
        if (response.ok) {
          // Вызываем колбэк и передаем ему данные созданного тикета
          callback(responseData);
        } else {
          // Если ответ не успешен, выбрасываем ошибку
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        // Если ответ не является JSON, вызываем колбэк без извлечения данных
        callback();
      }
    } else {
      // Если заголовок "content-type" отсутствует, вызываем колбэк без извлечения данных
      callback();
    }
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Failed to create a new ticket.');
  }
}

  // Метод для обновления существующего тикета
  async update(id, data, callback) {
    try {
      // Отправляем PUT-запрос на сервер для обновления тикета по его идентификатору
      const response = await createRequest({
        method: 'PUT',
        endpoint: `/api?method=updateById&id=${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });

      // Вызываем колбэк и передаем ему данные обновленных тикетов
      callback(response);
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error(`Failed to update ticket with ID ${id}.`);
    }
  }
  
  // Метод для удаления тикета по его идентификатору
  async delete(id, callback) {
    try {
      // Отправляем DELETE-запрос на сервер для удаления тикета по его идентификатору
      await createRequest({
        method: 'DELETE',
        endpoint: `/api?method=deleteById&id=${id}`,
      });

      // Вызываем колбэк после успешного удаления
      callback();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw new Error(`Failed to delete ticket with ID ${id}.`);
    }
  }
}
