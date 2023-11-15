// Определение класса TicketForm
export default class TicketForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    // Создание формы и сохранение её в свойстве form
    this.form = this.createForm();
  }

  createForm() {
    const form = document.createElement('form');

    // Добавление HTML-разметки в форму
    form.innerHTML = `
      <button type="button" id="openModal">Добавить тикет</button>
    `;

    form.addEventListener('submit', (event) => {
      // Предотвращение перезагрузка страницы
      event.preventDefault();

      // Создание объекта FormData для получения данных формы
      const formData = new FormData(form);

      // Преобразование данных из FormData в объект
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Вызов функции onSubmit, передавая ей данные формы
      this.onSubmit(data);
    });

    // Получение кнопки для открытия модального окна
    const openModalButton = form.querySelector('#openModal');

    // Добавление обработчика события click на кнопку открытия модального окна
    openModalButton.addEventListener('click', () => this.openModal());

    // Возвращение созданной формы
    return form;
  }

  // Метод для открытия модального окна
  openModal() {
    // Создание элемента для модального окна
    const modal = document.createElement('div');
    modal.className = 'modal';

    // Добавление HTML-разметки в модальное окно
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Добавление тикета</h2>
        <label for="shortDescription">Краткое описание:</label>
        <input type="text" id="shortDescription" name="shortDescription" required>
        <br>
        <label for="detailedDescription">Подробное описание:</label>
        <textarea id="detailedDescription" name="detailedDescription"></textarea>
        <br>
        <button type="button" id="cancelTicket">Отмена</button>
        <button type="button" id="submitTicket">OK</button>
      </div>
    `;

    // Добавление модального окна в тело документа
    document.body.appendChild(modal);


    // Получение кнопки для отмены тикета
    const cancelTicketButton = modal.querySelector('#cancelTicket');
    cancelTicketButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Получение кнопки для подтверждения создания тикета
    const submitTicketButton = modal.querySelector('#submitTicket');
    submitTicketButton.addEventListener('click', () => {
      const shortDescription = document.getElementById('shortDescription').value;
      const detailedDescription = document.getElementById('detailedDescription').value;

      // Проверка, что оба поля заполнены
      if (shortDescription && detailedDescription) {
        // Вызов функции onSubmit, передавая ей данные создаваемого тикета
        this.onSubmit({ name: shortDescription, description: detailedDescription });
        document.body.removeChild(modal);
      } else {
        alert('Пожалуйста, заполните все поля.');
      }
    });
  }
}
