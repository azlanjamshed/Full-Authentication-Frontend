import api from "../utils/axios";

export const makeAdmin = (id) =>
    api.put(`/admin/make-admin/${id}`);