import React, { useState } from "react";
import PropTypes from "prop-types";

const FormBase = ({
  fieldset,
  initialData,
  fieldsetDescriptor,
  disabledColumns,
  inputClassName,
  WrapperComponent,
  FeedbackComponent,
  ButtonComponent,
  onSubmit,
  ...rest
}) => {
  const [formData, setFormData] = useState(initialData);
  const [feedback, setFeedback] = useState();

  return (
    <WrapperComponent
      renderFields={fieldset.map((fieldName) => {
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
          className: inputClassName,
          name: fieldName,
          label: fieldsetDescriptor[fieldName].displayName,
          value: formData[fieldName],
          onUpdate: (fieldName, fieldValue) =>
            setFormData({ ...formData, [fieldName]: fieldValue }),
          error,
          helperText,
          fullWidth: true,
          ...fieldsetDescriptor[fieldName].inputComponentProps,
        });
      })}
      renderButton={
        <ButtonComponent
          disabled={fieldset.some((fieldName) =>
            fieldsetDescriptor[fieldName].validationTests.some(
              ({ test, feedback }) => !test(formData)
            )
          )}
          onClick={() => onSubmit(formData, setFeedback, setFeedback)}
        />
      }
      renderFeedback={feedback && <FeedbackComponent message={feedback} />}
    />
  );
};

FormBase.propTypes = {
  fieldset: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.object,
  fieldsetDescriptor: PropTypes.object.isRequired,
  inputClassName: PropTypes.string,
  WrapperComponent: PropTypes.func.isRequired,
  FeedbackComponent: PropTypes.func.isRequired,
  ButtonComponent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormBase;
