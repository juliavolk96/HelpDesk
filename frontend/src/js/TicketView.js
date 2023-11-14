import TicketService from "./TicketService";

export default class TicketView {
  // Конструктор класса, принимающий функции onEdit и onDelete
  constructor(onEdit, onDelete) {
    this.onEdit = onEdit; // Функция для обработки редактирования тикета
    this.onDelete = onDelete; // Функция для обработки удаления тикета
  }

  // Метод для отображения одного тикета
  renderTicket(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
      <h3>${ticket.name}</h3>
      <p>${ticket.description}</p>
      <p>Status: ${ticket.status ? 'Выполнено' : 'В ожидании'}</p>
      <p>Создано: ${new Date(ticket.created).toLocaleString()}</p>
      <input type="checkbox" id="ticketStatus_${ticket.id}" ${ticket.status ? 'checked' : ''}>
      <label for="ticketStatus_${ticket.id}">Готово</label>
      <button class="detailsBtn" data-ticket-id="${ticket.id}">Подробности</button>
      <button class="editBtn" data-ticket-id="${ticket.id}">Изменить</button>
      <button class="deleteBtn" data-ticket-id="${ticket.id}">Удалить</button>
    `;

    // Добавление обработчиков событий для кнопок "Подробности", "Изменить" и "Удалить"
    const detailsBtn = ticketElement.querySelector('.detailsBtn');
    detailsBtn.addEventListener('click', () => this.showDetails(ticket));

    const editBtn = ticketElement.querySelector('.editBtn');
    editBtn.addEventListener('click', () => this.editTicket(ticket));

    const deleteBtn = ticketElement.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => this.confirmDelete(ticket));

    // Возвращение созданного элемента тикета
    return ticketElement;
  }

  // Метод для отображения списка тикетов
  renderTicketList(ticketList) {
    const ticketListElement = document.createElement('div');
    ticketList.forEach((ticket) => {
      const ticketElement = this.renderTicket(ticket);
      ticketListElement.appendChild(ticketElement);
    });

    // Очистка корневого элемента и добавление списка тикетов
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(ticketListElement);
  }

  // Метод для отображения подробностей тикета (в данном случае, выводит alert)
  showDetails(ticket) {
    alert(`Подробное описание: ${ticket.description}`);
  }

  // Метод для отображения модального окна редактирования тикета
  async editTicket(ticket) {
    // Создаем модальное окно для редактирования с использованием предоставленного метода
    const editModal = this.createEditModal(ticket);
  
    // Находим кнопку 'confirmEdit' внутри модального окна
    const confirmEditButton = editModal.querySelector('#confirmEdit');
  
    // Добавляем обработчик событий для кнопки 'confirmEdit'
    confirmEditButton.addEventListener('click', async () => {
      // Извлекаем отредактированные данные из полей ввода
      const editedShortDescription = document.getElementById('shortDescription').value;
      const editedDetailedDescription = document.getElementById('detailedDescription').value;
  
      // Проверяем, что оба поля заполнены
      if (editedShortDescription && editedDetailedDescription) {
        try {
          // Выполняем запрос fetch для обновления тикета
          const response = await fetch(`http://localhost:3000/api/?method=updateById&id=${ticket.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: editedShortDescription,
              description: editedDetailedDescription,
            }),
          });
  
          // Проверяем успешен ли ответ (статус 2xx)
          if (response.ok) {
            // Разбираем JSON-ответ
            const updatedTickets = await response.json();
  
            // Отрисовываем обновленный список тикетов
            this.renderTicketList(updatedTickets);
  
            // Удаляем модальное окно редактирования из документа
            document.body.removeChild(editModal);
          } else {
            // Выбрасываем ошибку, если ответ не успешен
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          // Логируем и выводим сообщение об ошибке, если произошла ошибка при обновлении
          console.error('Ошибка при обновлении тикета:', error);
          alert('Не удалось обновить тикет. Пожалуйста, попробуйте снова.');
        }
      } else {
        // Выводим предупреждение, если хотя бы одно из полей не заполнено
        alert('Пожалуйста, заполните все поля.');
      }
    });
  
    // Добавляем модальное окно редактирования в документ
    document.body.appendChild(editModal);
  }
  
  
  // Метод для отображения модального окна подтверждения удаления тикета
  confirmDelete(ticket) {
    const confirmModal = this.createDeleteModal(ticket);
    document.body.appendChild(confirmModal);
  }

  // Метод для создания модального окна редактирования тикета
  createEditModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Редактирование тикета</h2>
        <label for="shortDescription">Краткое описание:</label>
        <input type="text" id="shortDescription" name="shortDescription" value="${ticket.name}" required>
        <br>
        <label for="detailedDescription">Подробное описание:</label>
        <textarea id="detailedDescription" name="detailedDescription">${ticket.description}</textarea>
        <br>
        <button type="button" id="cancelEdit">Отмена</button>
        <button type="button" id="confirmEdit">OK</button>
      </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    const cancelEditButton = modal.querySelector('#cancelEdit');
    cancelEditButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    const confirmEditButton = modal.querySelector('#confirmEdit');
    confirmEditButton.addEventListener('click', () => {
      // Извлечение данных из полей ввода
      const editedShortDescription = document.getElementById('shortDescription').value;
      const editedDetailedDescription = document.getElementById('detailedDescription').value;

    });

    // Возвращение созданного модального окна
    return modal;
  }

  // Метод для создания модального окна подтверждения удаления тикета
  createDeleteModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Удаление тикета</h2>
        <p>Вы действительно хотите удалить тикет?</p>
        <button type="button" id="cancelDelete">Отмена</button>
        <button type="button" id="confirmDelete">OK</button>
      </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    const cancelDeleteButton = modal.querySelector('#cancelDelete');
    cancelDeleteButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    const confirmDeleteButton = modal.querySelector('#confirmDelete');
    confirmDeleteButton.addEventListener('click', () => {
      // Вызов функции onDelete, передавая тикет для удаления
      this.onDelete(ticket);
      document.body.removeChild(modal);
    });

    // Возвращение созданного модального окна
    return modal;
  }

}
