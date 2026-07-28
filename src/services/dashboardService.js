import { apiClient } from "../config/apiClient";

export const dashboardService = {
  getPatients: async () => {
    try {
      const response = await apiClient.get("/patient/display");
      return response;
    } catch (error) {
      throw error;
    }
  },
  registerPatient: async (patientData) => {
    try {
      const response = await apiClient.post("/patient/register", patientData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getPatientByUserId: async (userId) => {
    try {
      const response = await apiClient.get(`/patient/user/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getDoctors: async () => {
    try {
      const response = await apiClient.get("/doctor/display");
      return response;
    } catch (error) {
      throw error;
    }
  },
  createAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post(
        "/appointment/create",
        appointmentData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  displayAppointment: async () => {
    try {
      const response = await apiClient.get("/appointment/display");
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateAppointment: async (id, status) => {
    try {
      // Mengirim status sebagai query parameter di URL untuk dicocokkan
      // dengan @RequestParam di backend.
      const response = await apiClient.put(
        `/appointment/update/${id}?status=${status}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  displayAppointmentById: async (id) => {
    try {
      const response = await apiClient.get(`/appointment/display/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  createAdmission: async (admissionData) => {
    try {
      const response = await apiClient.post("/admission/create", admissionData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  createMedicalRecord: async (medicalRecordData) => {
    try {
      const response = await apiClient.post(
        "/medical-record/create",
        medicalRecordData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  displayAllDisease: async () => {
    try {
      const response = await apiClient.get("/disease/display");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
