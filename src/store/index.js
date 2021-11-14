import { createStore } from "vuex";
import router from "../router/index";
import Employees from "../models/Employees";
import SystemUsers from "../models/SystemUsers";
import Beneficiaries from "../models/Beneficiaries";
import ErrorResponse from "../models/ErrorResponse";
import SuccessResponse from "../models/SuccessResponse";

export default createStore({
  state: {
    employees: new Array(),
    beneficiaries: new Array(),
    recordEmploy: new SystemUsers(),
    systemUser: new SystemUsers(),
    beneficiary: new Beneficiaries(),
    errorResponse: new ErrorResponse(),
    successResponse: new SuccessResponse(),
    token: "",
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, payload){
      state.isLoading = payload;
    },
    setErrorResponse(state, payload) {
      if (payload === null)
        return (state.errorResponse = {
          message: null,
          details: null
        });
      return (state.errorResponse = {
        message: payload,
        details: ""
      });
    },
    setSuccessResponse(state, payload) {
      if (payload == null) return (state.successResponse = { message: null });
      return (state.successResponse = {
        message: payload
      });
    },
    setToken(state, payload) {
      state.token = payload;
    },
    login(state, payload) {
      state.systemUser = payload;
    },
    getEmployees(state, payload) {
      state.employees = payload;
    },
    getEmploy(state, payload) {
      state.recordEmploy = payload;
    },
    deleteEmployees(state, payload) {
      state.employees = state.employees.filter(x => x.employId !== payload);
    },
    getBeneficiaries(state, payload) {
      state.beneficiaries = payload;
    },
    setBeneficiary(state, payload) {
      state.beneficiary = payload;
    },
    createBeneficiary(state, payload) {
      state.beneficiaries.push(payload);
    },
    deleteBeneficiaries(state, payload) {
      state.beneficiaries = state.beneficiaries.filter(x => x.beneficiaryId !== payload);
    },
  },
  actions: {
    setIsLoading({commit}, value){
      return commit("setIsLoading", value);
    },
    setErrorResponse({ commit }, errorResponse) {
      return commit("setErrorResponse", errorResponse);
    },
    setSuccessResponse({ commit }, successResponse) {
      return commit("setSuccessResponse", successResponse);
    },
    setBeneficiary({commit}, beneficiary) {
      return commit("setBeneficiary", beneficiary);
    },
    async getToken({ commit }) {
      try {
        const response = await fetch("https://localhost:44364/api/token", {
          method: "POST",
          redirect: "follow",
          body: JSON.stringify({})
        });
        let objectResponse = await response.json();
        if (!response.ok) {
          return commit(
            "setErrorResponse",
            objectResponse.error
              ? objectResponse.error
              : "An unexpected error has ocurrer."
          );
        }
        commit("setToken", objectResponse.value);
        commit("setErrorResponse", null);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
      }
    },
    async login({ commit, dispatch, state }, systemUser) {
      try {
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/systemusers/login/${state.token}`,
          {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: systemUser.username, password: systemUser.password })
          }
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        commit("login", objectResponse);
        commit("setErrorResponse", null);
        router.push("/");
        localStorage.setItem("systemUser", JSON.stringify(objectResponse));
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
      }
    },
    logout({ commit }) {
      commit("login", null);
      localStorage.removeItem("systemUser");
      router.push("/login");
    },
    loadLogin({ commit }) {
      if (!localStorage.getItem("systemUser")) return commit("login", null);
      commit("login", JSON.parse(localStorage.getItem("systemUser")));
    },
    async getEmployees({ commit, dispatch, state }) {
      try {
        if(!state.systemUser)
          return;
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/employees/${state.token}/?ignoreId=${state.systemUser.employId}`
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        const arrayEmployees = new Array();
        for (let id in objectResponse) {
          arrayEmployees.push(
            new Employees(
              objectResponse[id].employId,
              objectResponse[id].photo,
              objectResponse[id].name,
              objectResponse[id].firstLastName,
              objectResponse[id].secondLastName,
              objectResponse[id].fullName,
              objectResponse[id].salary,
              objectResponse[id].status,
              objectResponse[id].hiringDate,
              objectResponse[id].job
            )
          );
        }
        commit("getEmployees", arrayEmployees);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async getEmploy({ commit, dispatch, state }, employId) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/employees/${state.token}/${employId}`,
          {
            method: "GET",
            redirect: "follow"
          }
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        objectResponse.repeatPassword = objectResponse.password;
        if (objectResponse.employ.hiringDate)
          objectResponse.employ.hiringDate = objectResponse.employ.hiringDate.substring(
            0,
            10
          );
        commit("setErrorResponse", null);
        commit("getEmploy", objectResponse);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async createEmployees({ commit, dispatch, state }, systemuser) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/employees/${state.token}`,
          {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(systemuser)
          }
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Employ created correctly!");
        router.push("/");
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async updateEmployees({ commit, dispatch, state }, systemuser) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/employees/${state.token}/${systemuser.employId}`,
          {
            method: "PUT",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(systemuser)
          }
        );
        if (!response.ok) {
          dispatch("setIsLoading", false);
          const objectResponse = await response.json();
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        if(systemuser.employId === state.systemUser.employId) {
          systemuser.employ.fullName = `${systemuser.employ.name} ${systemuser.employ.firstLastName} ${systemuser.employ.secondLastName}`;
          commit("login", systemuser);
          localStorage.setItem("systemUser", JSON.stringify(systemuser));
        }
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Employ updated correctly!");
        router.push("/");
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async deleteEmployees({ commit, dispatch, state }, employId) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/employees/${state.token}/${employId}`,
          {
            method: "DELETE",
            redirect: "follow"
          }
        );
        if (!response.ok) {
          dispatch("setIsLoading", false);
          const objectResponse = await response.json();
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Employ deleted correctly!");
        commit("deleteEmployees", employId);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async getBeneficiaries({ commit, dispatch, state }, employId) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/beneficiaries/employ/${state.token}/${employId}`
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        const arrayBeneficiaries = new Array();
        for (let id in objectResponse) {
          arrayBeneficiaries.push(
            new Beneficiaries(
              objectResponse[id].beneficiaryId, 
              objectResponse[id].name, 
              objectResponse[id].firstLastName, 
              objectResponse[id].secondLastName, 
              objectResponse[id].fullName, 
              objectResponse[id].relationship, 
              objectResponse[id].dateBirth, 
              objectResponse[id].gender, 
              objectResponse[id].status, 
              objectResponse[id].employId, 
              objectResponse[id].employ
            )
          );
        }
        commit("getBeneficiaries", arrayBeneficiaries);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async getBeneficiary({ commit, dispatch, state }, beneficiaryId) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/beneficiaries/${state.token}/${beneficiaryId}`,
          {
            method: "GET",
            redirect: "follow"
          }
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        if (objectResponse.dateBirth)
          objectResponse.dateBirth = objectResponse.dateBirth.substring(0,10);
        commit("setErrorResponse", null);
        commit("setBeneficiary", objectResponse);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async createBeneficiary({ commit, dispatch, state }, beneficiary) {
      try {
        dispatch("setIsLoading", true);
        beneficiary.state = 1;
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/beneficiaries/${state.token}`,
          {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(beneficiary)
          }
        );
        const objectResponse = await response.json();
        if (!response.ok) {
          dispatch("setIsLoading", false);
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        objectResponse.fullName = `${objectResponse.name} ${objectResponse.firstLastName} ${objectResponse.secondLastName}`;
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Beneficiary created correctly!");
        commit("createBeneficiary", objectResponse);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async updateBeneficiary({ commit, dispatch, state }, beneficiary) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/beneficiaries/${state.token}/${beneficiary.beneficiaryId}`,
          {
            method: "PUT",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(beneficiary)
          }
        );
        if (!response.ok) {
          dispatch("setIsLoading", false);
          const objectResponse = await response.json();
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        beneficiary.fullName = `${beneficiary.name} ${beneficiary.firstLastName} ${beneficiary.secondLastName}`;
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Beneficiary updated correctly!");
        commit("setBeneficiary", beneficiary);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
    async deleteBeneficiaries({ commit, dispatch, state }, beneficiaryId) {
      try {
        dispatch("setIsLoading", true);
        await dispatch("getToken");
        const response = await fetch(
          `https://localhost:44364/api/beneficiaries/${state.token}/${beneficiaryId}`,
          {
            method: "DELETE",
            redirect: "follow"
          }
        );
        if (!response.ok) {
          dispatch("setIsLoading", false);
          const objectResponse = await response.json();
          commit("setSuccessResponse", null);
          return commit(
            "setErrorResponse",
            objectResponse.message
              ? objectResponse.message
              : "An unexpected error has ocurrer."
          );
        }
        commit("setErrorResponse", null);
        commit("setSuccessResponse", "¡Beneficiary deleted correctly!");
        commit("deleteBeneficiaries", beneficiaryId);
        dispatch("setIsLoading", false);
      } catch (error) {
        console.log(error); return commit("setErrorResponse","An unexpected error has ocurrer.");
        dispatch("setIsLoading", false);
      }
    },
  },
  getters: {
    authenticatedUser(state) {
      return !!state.systemUser;
    }
  },
  modules: {}
});
