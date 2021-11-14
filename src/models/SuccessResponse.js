/**
 * Created by: Emmanuel Toledo Castro.
 * Created on: 11/06/2021
 * Updated on: 11/06/2021
 * Description: SuccessResponse class.
 */
export default class SuccessResponse {
  message = "";

  constructor(message) {
    this.message = message;
  }

  Message(message = null) {
    if (message) this.message = message;
    else return this.message;
  }
}
