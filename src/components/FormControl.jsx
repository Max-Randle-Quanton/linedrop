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
