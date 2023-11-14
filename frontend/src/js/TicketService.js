import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
  }

  async list(callback) {
    try {
      const response = await createRequest({ method: 'GET', endpoint: `/?method=allTickets`});
      console.log(response); // Вывод ответа сервера в консоль
      callback(response);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to fetch tickets from the server.');
    }
  }

  async get(id, callback) {
    try {
      const response = await createRequest({ method: 'GET', endpoint: `/api?method=ticketById&id=${id}` });
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error('Error fetchong by ID:', error);
      throw new Error(`Failed to fetch ticket with ID ${id} from the server.`)
    }
  }

  async create(data, callback) {
    try {
      const response = await createRequest({
        method: 'POST',
        endpoint: '/?method=createTicket',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
  
      console.log(response); // Вывод ответа сервера в консоль
  
      // Проверка, может быть, вам нужно использовать другой способ извлечения данных из ответа
      const newTicket = response; // или response.data, response.body, в зависимости от формата ответа
      callback(newTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create a new ticket.');
    }
  }
  

  async update(id, data, callback) {
    try {
      const response = await createRequest({
        method: 'PUT',
        endpoint: `/api?method=updateById&id=${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const updateTickets = await response.json();
      callback(updateTickets);
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error(`Failed to update ticket with ID ${id}.`);
    }
  }

  async delete(id, callback) {
    try {
      await createRequest({ method: 'DELETE', endpoint: `/api?method=deleteById&id=${id}` });
      callback();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw new Error(`Failed to delete ticket with ID ${id}.`);
    }
  }
}
