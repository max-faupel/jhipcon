import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SpeakerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-speaker div table .btn-danger'));
  title = element.all(by.css('jhi-speaker div h2#page-heading span')).first();

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

export class SpeakerUpdatePage {
  pageTitle = element(by.id('jhi-speaker-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  emailInput = element(by.id('field_email'));
  twitterInput = element(by.id('field_twitter'));
  bioInput = element(by.id('file_bio'));
  sessionsSelect = element(by.id('field_sessions'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setTwitterInput(twitter) {
    await this.twitterInput.sendKeys(twitter);
  }

  async getTwitterInput() {
    return await this.twitterInput.getAttribute('value');
  }

  async setBioInput(bio) {
    await this.bioInput.sendKeys(bio);
  }

  async getBioInput() {
    return await this.bioInput.getAttribute('value');
  }

  async sessionsSelectLastOption(timeout?: number) {
    await this.sessionsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sessionsSelectOption(option) {
    await this.sessionsSelect.sendKeys(option);
  }

  getSessionsSelect(): ElementFinder {
    return this.sessionsSelect;
  }

  async getSessionsSelectedOption() {
    return await this.sessionsSelect.element(by.css('option:checked')).getText();
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

export class SpeakerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-speaker-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-speaker'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
