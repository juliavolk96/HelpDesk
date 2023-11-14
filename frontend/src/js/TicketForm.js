/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.form = this.createForm();
  }

  createForm() {
    const form = document.createElement('form');
    form.innerHTML = `
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="description">Description:</label>
      <textarea id="description" name="description"></textarea>
      <br>
      <button type="submit">Submit</button>
    `;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      this.onSubmit(data);
    });

    return form;
  }
}
