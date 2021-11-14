/**
 * Created by: Emmanuel Toledo Castro.
 * Created on: 11/06/2021
 * Updated on: 11/06/2021
 * Description: Employees class.
 */
export default class Employees {
  employId = "";
  photo = "";
  name = "";
  firstLastName = "";
  secondLastName = "";
  fullName = "";
  salary = 0;
  status = 0;
  hiringDate = "";
  job = "";

  constructor(
    employId = "00000000-0000-0000-0000-000000000000",
    photo = "",
    name = "",
    firstLastName = "",
    secondLastName = "",
    fullName = "",
    salary = 0,
    status = 0,
    hiringDate = "",
    job = ""
  ) {
    this.employId = employId;
    this.photo = photo;
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.fullName = fullName;
    this.salary = salary;
    this.status = status;
    this.hiringDate = hiringDate;
    this.job = job;
  }

  EmployId(employId = null) {
    if (employId) this.employId = employId;
    else return this.employId;
  }

  Photo(photo = null) {
    if (photo) this.photo = photo;
    else return this.photo;
  }

  Name(name = null) {
    if (name) this.name = name;
    else return this.name;
  }

  FirstLastName(firstLastName = null) {
    if (firstLastName) this.firstLastName = firstLastName;
    else return this.firstLastName;
  }

  SecondLastName(secondLastName = null) {
    if (secondLastName) this.secondLastName = secondLastName;
    else return this.secondLastName;
  }

  FullName(fullName = null) {
    if (fullName) this.fullName = fullName;
    else return this.fullName;
  }

  Salary(salary = null) {
    if (salary) this.salary = salary;
    else return this.salary;
  }

  Status(status = null) {
    if (status) this.status = status;
    else return this.status;
  }

  HiringDate(hiringDate = null) {
    if (hiringDate) this.hiringDate = hiringDate;
    else return this.hiringDate;
  }

  Job(job = null) {
    if (job) this.job = job;
    else return this.job;
  }
}
