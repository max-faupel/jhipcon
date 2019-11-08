import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SessionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-session div table .btn-danger'));
  title = element.all(by.css('jhi-session div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class SessionUpdatePage {
  pageTitle = element(by.id('jhi-session-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('file_description'));
  startDateTimeInput = element(by.id('field_startDateTime'));
  endDateTimeInput = element(by.id('field_endDateTime'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setStartDateTimeInput(startDateTime) {
    await this.startDateTimeInput.sendKeys(startDateTime);
  }

  async getStartDateTimeInput() {
    return await this.startDateTimeInput.getAttribute('value');
  }

  async setEndDateTimeInput(endDateTime) {
    await this.endDateTimeInput.sendKeys(endDateTime);
  }

  async getEndDateTimeInput() {
    return await this.endDateTimeInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SessionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-session-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-session'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
