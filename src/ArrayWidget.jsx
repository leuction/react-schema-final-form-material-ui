import * as React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { renderField, withSchema } from 'react-schema-final-form';
import { FieldArray } from "react-final-form-arrays";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import _isString from 'lodash.isstring';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  element: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const handleClickRemove = (remove, idx) => () => {
  remove(idx);
};

const ArrayWidget = (props, context) => {
  const {
    advanced,
    fieldName,
    schema,
    theme,
    required,
    classes,
  } = props;
  const {
    reactFinalForm: { mutators },
  } = context;
  return (
    (!advanced || !schema.advanced) &&
    <FieldArray
      name={fieldName}
      fieldName={fieldName}
      schema={schema}
    >
      {({
        fields,
        schema,
        fieldName,
        meta: { error },
      }) => (
      <Paper
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
          <FormControl
            className={classes.root}
            component="fieldset"
            error={_isString(error)}
            required={required} 
            fullWidth
          >
            <FormGroup>
              {schema.title && <FormLabel component="legend" className={classes.element}>{schema.title}</FormLabel>}
              {fields.map((name, idx) => 
                <FormGroup
                  key={name}
                >
                  <IconButton
                    onClick={handleClickRemove(fields.remove, idx)}
                    style={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  {renderField({
                    schema: schema.items,
                    fieldName: name,
                    theme,
                    arrayIndex: idx,
                  })}
                </FormGroup>
              )}
              {_isString(error) && <FormHelperText>{_isString(error) ? error : undefined}</FormHelperText>}
              {schema.description && <FormHelperText error={false}>{schema.description}</FormHelperText>}
            </FormGroup>
          </FormControl>
        <Button
          className={classes.element}
          variant="raised"
          color="primary"
          onClick={() => { mutators.push(fieldName, schema.items && schema.items.type === 'object' ? {} : undefined) }}
          style={{
            alignSelf: 'flex-start',
          }}
        >
          Add
        </Button>
      </Paper>
      )}
    </FieldArray>
  );
};

ArrayWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
};

ArrayWidget.contextTypes = {
  reactFinalForm: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSchema(ArrayWidget));
