import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { Formik, FormikHelpers, FormikProps } from "formik";

import { todoValidationSchema } from "../validations";
import { useTodoContext } from "../context/TodoContext";
import { shortToastMessage } from "../components/ToastMessage";
import palette from "../../palette";

interface FormValues {
  text: string;
  description: string;
}

const AddTodoScreen = () => {
  const { addTodo } = useTodoContext()

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    addTodo({
        id: new Date().getTime(),
        text: values.text,
        description: values.description,
        completed: false,
    })
    shortToastMessage(`Task ${values.text} added successfully`)
    resetForm()
  };

  return (
    <View style={{ flex:1, backgroundColor:'white', justifyContent:'center' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ text: "", description: "" }}
          validationSchema={todoValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Task Title</Text>
                <TextInput
                  label='Task Title'
                  value={formikProps.values.text}
                  mode="outlined"
                  multiline={true}
                  activeOutlineColor={palette.defaultTheme}
                  onChangeText={formikProps.handleChange("text")}
                  onBlur={formikProps.handleBlur("text")}
                />
                {formikProps.errors.text && formikProps.touched.text && (
                  <Text style={styles.error}>{formikProps.errors.text}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Task Description</Text>
                <TextInput
                  value={formikProps.values.description}
                  mode="outlined"
                  placeholder="Add a description for the task"
                  multiline={true}
                  activeOutlineColor={palette.defaultTheme}
                  onChangeText={formikProps.handleChange("description")}
                  onBlur={formikProps.handleBlur("description")}
                  style={styles.descriptionInput}
                />
                {formikProps.errors.description && formikProps.touched.description && (
                  <Text style={styles.error}>{formikProps.errors.description}</Text>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={() => formikProps.handleSubmit()}
                  style={styles.addButton}
                  icon="plus"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                >
                  Add Task
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: palette.defaultTheme,
    width: '95%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 10,
    padding: 10,
  },
  label: {
    color: palette.defaultTheme,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionInput: {
    height: 100,
  },
  buttonContainer: {
    marginTop: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: palette.defaultTheme,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default AddTodoScreen;
