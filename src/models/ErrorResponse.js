/**
 * Created by: Emmanuel Toledo Castro.
 * Created on: 11/06/2021
 * Updated on: 11/06/2021
 * Description: SystemUser class.
 */
export default class SystemUser {
  message = "";
  details = "";

  constructor(message, details) {
    this.message = message;
    this.details = details;
  }

  Message(message = null) {
    if (message) this.message = message;
    else return this.message;
  }

  Details(details = null) {
    if (details) this.details = details;
    else return this.details;
  }
}
