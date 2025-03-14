/*
 * Form
 * Form wraps the content of the form. It is entity agnostic (aka fully reusable).
 * The Form and FormTray div classes can be used for styling all forms the same way.
 * The only children (things that live between <Form> and </Form>) are Form.Item.
 * Form is used inside a ModuleForm, UserForm or other specific form (EntityForm).
 * Form props are:
    * children: special prop not provided directly, what's between the opening and closing tags (provided in the EntityForm).
    * onSubmit: function passed from theEntityForm, itself passed from the crudler component that contains the EntityForm.
        * onSubmit: a handleSubmit async function to post the newly created module to the API.
          Takes in a record to be sent to the backend.
    * onCancel: also passed from Crudler, through EntityForm, to Form (like onSubmit). in this example: a closeForm function.
    
 * Form.Item 
    * All the direct children of Form are Form.Items.
    * Item props are label (the "title" of the item), advice (not used yet),
      and error. Both advice and error can be null, in which case they won't be displayed.
    * error is an error message (string) aimed at the end user explaining
      why the value they entered in this specific item was invalid.

 * Form.useForm
    * useForm is a hook that simplifies the use of Forms in other components. It is called
      from the EntityForm (ModuleForm, UserForm etc), not the crudler.
    * useForm takes as argument the following props:
       * initialRecord: an object with the same keys as the record but with all values set to null (or default values)
       * conformance { htmlToJs }: 
         A conformance object with the same keys as the record and whose attributes are functions, taking in
         the attribute in html and providing the js format to be exported as a JS object and sent to the backend
       * validation: { isValid, errorMessage }: isValid contains functions for each of the record attributes for
         testing whether the given value should be accepted (will be used by the isValid function).
         errorMessage is an object containing appropriate error messages for each of the record attributes.
       * onSubmit: the handleSubmit function passed from the crudler to the EntityForm to the useForm
    * useForm returns:
       * record: the javascript object to be displayed (a module, user...) as an object (key-vales pairs)
       * errors: an object similar to records (same keys) but where values are either null or
         the appropriate error message for that item (if the value was not conform to the passed-in conformance object)
       * handleChange: function that takes in en event, and update the record (the entity)'s appropriate
         field (the jsx name attribute) with the newly entered value (the jsx value attribute).
       * handleSubmit: checks that the current record (which is modified using handleChange) is valid
         according to the isValid (conformance) object. If the current record is valid, it's submitted to the
         backend using the provided onSubmit method.
*/

import "./Form.scss";
import { useState } from "react";

function Form({ children, onSubmit, onCancel }) {
  // Initialization -------------------------------------------------------
  // State ------------------------------------------------------------------
  // Handlers --------------------------------------------------------------
  // View ------------------------------------------------------------------
  return (
    <div className="Form">
      <div className="FormTray">{children}</div>
    </div>
  );
}
//<Action.Tray>
//  <Action.Submit showText onClick={onSubmit} />
//  <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
//</Action.Tray>

function Item({ children, label, advice, error }) {
  // Initialization -------------------------------------------------------
  // State ------------------------------------------------------------------
  // Handlers --------------------------------------------------------------
  // View ------------------------------------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel">{label}</label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {error && <p className="FormError">{error}</p>}
      {children}
    </div>
  );
}

function useForm(
  initialRecord,
  { htmlToJs },
  { isValid, errorMessage },
  onSubmit,
) {
  // Initialization -------------------------------------------------------
  // State ------------------------------------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    // Object.keys(validation.isValid) = ["ModuleName", "ModuleCode", "ModuleLevel" ...] or so
    // reduce produces an object with the same properties (keys) as isValid, with the values set to null.
    Object.keys(isValid).reduce((acc, key) => ({ ...acc, [key]: null }), {}),
  );

  const isValidRecord = (record) => {
    let valid = true;
    // go through each key (attribute name) of isValid (the object template)
    Object.keys(isValid).forEach((key) => {
      // use the function that is the value of each isValid object with the record
      // [key] value as argument
      if (isValid[key](record[key])) {
        errors[key] = null;
      } else {
        // use the same [key] as was used in validation.isValid in
        // validation.errorMessage to get the corresponding error message
        errors[key] = errorMessage[key];
        valid = false;
      }
    });
    // at this point, the errors relative to the record are in state (errors), not returned directly.
    return valid;
  };

  // Handlers ----------------------------------------
  const handleChange = (event) => {
    // event = what kind of change occured?
    // event has 2 values: name and value (=> deconstruct)
    const { name, value } = event.target;
    // ...record = create new object inheriting properties from current record state
    // what's after the comma overrides one field: the overriden field is [name] and the value
    // (after the colon) calls htmlToJs's "name" property using the value field from the calling element.
    // [name] = computed property name, i.e. use the property name that correspond to the
    // triggering element's name property
    setRecord({ ...record, [name]: htmlToJs[name](value) }); // record = existing value
  };

  const handleSubmit = () => {
    if (isValidRecord(record)) {
      onSubmit(record);
    } else {
      console.log("record is NOT valid. Printing `errors` object:");
      console.log(errors);
    }
    // setErrors(errors) wouldn't work because errors is a reference to the errors object, not a value
    // and it therefore wouldn't change anything or update the state of errors (which is what we want).
    // Instead, since errors *does* contain the value (object) we're looking for, setError with a
    // newly created error object from the "old" (updated) error one.
    setErrors({ ...errors });
  };
  // View --------------------------------------------
  // not returning setRecords: handleChange takes care of setting the record
  return [record, errors, handleChange, handleSubmit];
}

// Compose compound component
Form.Item = Item;
Form.useForm = useForm;

export default Form;
