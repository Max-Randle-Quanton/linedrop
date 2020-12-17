export const formFields = ({
  fieldset,
  formData,
  setFormData,
  fieldsetDescriptor,
  className,
  ...rest
}) =>
  fieldset.map((fieldName) => {
    let helperText;

    // sets error to true if any tests fail
    // sets helper text to the feedback from the first test that failed
    const error = fieldsetDescriptor[fieldName].validationTests.some(
      ({ test, feedback }) => {
        const pass = test(formData);
        if (!pass) {
          helperText = feedback;
        }
        return !pass;
      }
    );

    return fieldsetDescriptor[fieldName].inputComponent({
      key: fieldName,
      className,
      name: fieldName,
      label: fieldsetDescriptor[fieldName].displayName,
      value: formData[fieldName],
      onUpdate: (fieldName, fieldValue) =>
        setFormData({ ...formData, [fieldName]: fieldValue }),
      error,
      helperText,
      fullWidth: true,
    });
  });

export const handleSubmit = ({
  ButtonComponent,
  formData,
  fieldsetDescriptor,
  fieldset,
  ...rest
}) => (
  <ButtonComponent
    {...rest}
    disabled={fieldset.map((fieldName) =>
      fieldsetDescriptor[fieldName].validationTests.some(
        ({ test, feedback }) => !test(formData)
      )
    )}
  />
);
