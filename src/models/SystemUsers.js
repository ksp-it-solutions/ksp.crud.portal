/**
 * Created by: Emmanuel Toledo Castro.
 * Created on: 11/06/2021
 * Updated on: 11/06/2021
 * Description: SystemUser class.
 */
import Employees from "./Employees";

export default class SystemUsers {
  systemuserId = "00000000-0000-0000-0000-000000000000";
  username = "";
  password = "";
  repeatPassword = "";
  status = 0;
  employId = "";
  employ = new Employees();

  constructor(
    systemuserId = "00000000-0000-0000-0000-000000000000",
    username = "",
    password = "",
    status = 0,
    employId = "00000000-0000-0000-0000-000000000000",
    employ = new Employees()
  ) {
    this.systemuserId = systemuserId;
    this.username = username;
    this.password = password;
    this.repeatPassword = "";
    this.status = status;
    this.employId = employId;
    this.employ = employ;
  }

  SystemuserId(systemuserId = null) {
    if (systemuserId) this.systemuserId = systemuserId;
    else return this.systemuserId;
  }

  Username(username = null) {
    if (username) this.username = username;
    else return this.username;
  }

  Password(password = null) {
    if (password) this.password = password;
    else return this.password;
  }

  RepeatPassword(repeatPassword = null) {
    if (repeatPassword) this.repeatPassword = repeatPassword;
    else return this.repeatPassword;
  }

  Status(status = null) {
    if (status) this.status = status;
    else return this.status;
  }

  EmployId(employId = null) {
    if (employId) this.employId = employId;
    else return this.employId;
  }

  Employ(employ = null) {
    if (employ) this.employ = employ;
    else return this.employ;
  }
}
