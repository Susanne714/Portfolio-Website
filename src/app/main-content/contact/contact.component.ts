import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { TranslatePipe, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * ContactComponent is responsible for displaying and handling the contact form.
 * It includes form validation, error handling, and message sending functionality.
 *
 * @selector app-contact
 * @standalone true (Standalone component without NgModule)
 * @imports CommonModule, FormsModule, ButtonComponent, TranslatePipe, RouterModule
 * @templateUrl ./contact.component.html
 * @styleUrl ./contact.component.scss
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TranslatePipe, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnDestroy {
  private http = inject(HttpClient); // inject HttpClient

  formValid = false;
  allFieldsFilled = false;

  name: string = '';
  email: string = '';
  message: string = '';
  defaultMessage: string = '';
  privacyChecked: boolean = false;

  showNameError = false;
  showEmailError = false;
  showMessageError = false;
  showPrivacyError = false;

  private langChangeSubscription: Subscription;

  constructor(private translate: TranslateService) {
    this.loadTranslatedText();

    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTranslatedText();
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }

  /**
   * Loads the translated standard text for the message field.
   */
  private loadTranslatedText() {
    this.translate.get('contact.form_textfield').subscribe((translatedText: string) => {
      this.message = translatedText || "Hello Susanne,...";
      this.defaultMessage = translatedText || "Hello Susanne,...";
    });
  }

  /**
   * Hides specific error messages.
   * @param field The field whose error is to be hidden.
   */
  hideFieldError(field: string) {
    if (field === 'name') this.showNameError = false;
    if (field === 'email') this.showEmailError = false;
    if (field === 'message') this.showMessageError = false;
    if (field === 'privacy') this.showPrivacyError = false;

    this.checkAllFieldsFilled();
  }
  /**
   * Checks whether all fields have been filled in correctly.
   */
  private checkAllFieldsFilled() {
    this.allFieldsFilled =
      this.name.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.isMessageValid() &&
      this.privacyChecked;
  }

  /**
 * Event handler for the input in the message field.
 * @param event The input event.
 */
  onMessageInput(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    this.message = input.value;
  }

  /**
  * Checks whether the message is valid (enough additional characters).
  * @returns true if the message is valid, otherwise false.
  */
  isMessageValid(): boolean {
    const trimmedMessage = this.message.trim();
    const trimmedDefault = this.defaultMessage.trim();

    const additionalLength = trimmedMessage.length - trimmedDefault.length;

    return (
      trimmedMessage !== trimmedDefault &&
      additionalLength >= 3
    );
  }

  /**
   * Live validation of the input field when exiting it.
   */
  validateName() {
    const namePattern = /^[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜß]+$/;
    this.showNameError = !namePattern.test(this.name);
  }

  /**
 * Live validation of the input field when exiting it.
 */
  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.showEmailError = !emailPattern.test(this.email);
  }

  /**
 * Live validation of the textarea when exiting it.
 */
  validateMessage() {
    this.showMessageError = !this.isMessageValid();
  }

  /**
  * Validates the form and sends it if everything is correct.
  */
  validateForm() {
    const namePattern = /^[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜß]+$/;
    const nameValid = namePattern.test(this.name);
    this.showNameError = !nameValid;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailPattern.test(this.email);
    this.showEmailError = !emailValid;

    const messageValid = this.isMessageValid();
    this.showMessageError = !messageValid;

    const privacyValid = this.privacyChecked;
    this.showPrivacyError = !privacyValid;

    this.formValid = nameValid && emailValid && messageValid && privacyValid;

    if (this.formValid) {
      this.sendForm();
    }
  }

  /**
   * Sends the form to the server.
   */
  async sendForm() {
    const formData = this.prepareFormData();
    this.sendFormData(formData).subscribe({
      next: (response) => this.handleServerResponse(response),
      error: (error) => this.handleError(error)
    });
  }

  /**
 * Prepares the form data by gathering user input values.
 * @returns {Object} The prepared form data including name, email, and message.
 */
  prepareFormData() {
    return {
      name: this.name,
      email: this.email,
      message: this.message
    };
  }

  /**
 * Sends the form data to the backend using an HTTP POST request.
 * @param {Object} formData - The form data to be sent.
 * @returns {Observable<string>} The server response as an observable.
 */
  sendFormData(formData: any) {
    return this.http.post('https://susanneborchardt.com/sendMail.php', JSON.stringify(formData), {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    });
  }

  /**
 * Handles the server response after submitting the form.
 * Parses the response and triggers either success or error messages.
 * @param {string} response - The raw response received from the server.
 */
  handleServerResponse(response: any) {
    const responseObj = JSON.parse(response); // parse php response

    if (responseObj.success) {
      this.toggleSuccessMessage(); // Erfolgsnachricht aus PHP verwenden
      this.resetForm();
    } else {
      this.toggleErrorMessage(); // Fehlermeldung aus PHP verwenden
    }
  }

  /**
 * Handles errors that occur during form submission.
 * Logs the error and triggers an error message display.
 * @param {any} error - The error object from the HTTP request.
 */
  handleError(error: any) {
    console.error("Form submission failed.", error);
    this.toggleErrorMessage();
  }

  /**
  * Resets the form after sending.
  */
  private resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
    this.privacyChecked = false;
    this.showNameError = false;
    this.showEmailError = false;
    this.showMessageError = false;
    this.showPrivacyError = false;
  }

  /**
  * Displays a success message.
  */
  private toggleSuccessMessage() {
    const messageOverlay = document.querySelector('.success-message-overlay');

    messageOverlay?.classList.remove('hide');
    messageOverlay?.classList.add('show');

    setTimeout(() => {
      messageOverlay?.classList.remove('show');
      messageOverlay?.classList.add('hide');
    }, 4000);
  }

  /**
 * Displays an error message.
 */
  private toggleErrorMessage() {
    const messageOverlay = document.querySelector('.error-message-overlay');

    messageOverlay?.classList.remove('hide');
    messageOverlay?.classList.add('show');

    setTimeout(() => {
      messageOverlay?.classList.remove('show');
      messageOverlay?.classList.add('hide');
    }, 4000);
  }
}