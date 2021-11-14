/**
 * Created by: Emmanuel Toledo Castro.
 * Created on: 11/06/2021
 * Updated on: 11/06/2021
 * Description: Beneficiaries class.
 */
import Employees from "./Employees";

export default class Beneficiaries {
  beneficiaryId = "";
  name = "";
  firstLastName = "";
  secondLastName = "";
  fullName = "";
  relationship = "";
  dateBirth = "";
  gender = 0;
  status = 1;
  employId = "";

  constructor(
    beneficiaryId = "00000000-0000-0000-0000-000000000000",
    name = "",
    firstLastName = "",
    secondLastName = "",
    fullName = "",
    relationship = "",
    dateBirth = "",
    gender = 0,
    status = 0,
    employId = "00000000-0000-0000-0000-000000000000",
  ) {
    this.beneficiaryId = beneficiaryId;
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.fullName = fullName;
    this.relationship = relationship;
    this.dateBirth = dateBirth;
    this.gender = gender;
    this.status = status;
    this.employId = employId;
  }

  BeneficiaryId(beneficiaryId = null) {
    if (beneficiaryId) this.beneficiaryId = beneficiaryId;
    else return this.beneficiaryId;
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

  Relationship(relationship = null) {
    if (relationship) this.relationship = relationship;
    else return this.relationship;
  }

  DateBirth(dateBirth = null) {
    if (dateBirth) this.dateBirth = dateBirth;
    else return this.dateBirth;
  }

  Gender(gender = null) {
    if (gender) this.gender = gender;
    else return this.gender;
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
