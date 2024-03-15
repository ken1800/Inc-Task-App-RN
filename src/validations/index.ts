import * as Yup from "yup";

export const todoValidationSchema = Yup.object().shape({
    text: Yup.string().required("Task Title is required"),
    description: Yup.string().required("Task Description is required"),
});