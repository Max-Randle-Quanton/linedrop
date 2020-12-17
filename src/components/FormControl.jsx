import React, { useState } from "react";
import PropTypes from "prop-types";
import EntityForm from "./EntityForm";
import { makeStyles } from "@material-ui/core";

const EntityFormControl = ({
  buttonComponent,
  title,
  columns,
  initialData,
  entityDefinition,
  onSubmit,
  disabledColumns,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      {buttonComponent({
        onClick: () => {
          console.log(columns);
          setMounted(true);
          setOpen(true);
        },
      })}
      {mounted && (
        <EntityForm
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setMounted(false)}
          title={title}
          columns={columns}
          entityDefinition={entityDefinition}
          initialData={initialData}
          onSubmit={onSubmit}
          disabledColumns={disabledColumns}
        />
      )}
    </>
  );
};

export default EntityFormControl;

EntityFormControl.propTypes = {
  buttonComponent: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.object.isRequired,
  entityDefinition: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabledColumns: PropTypes.arrayOf(PropTypes.string),
};

const useStyles = makeStyles((theme) => ({
  flexColContainer: {
    display: "flex",
    flexDirection: "column",
  },

  flexColItem: {
    marginBottom: theme.spacing(3),
  },
}));

const popoulateFields = ({
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
