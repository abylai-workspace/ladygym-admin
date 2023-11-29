import React from "react";
import classes from "./Input.module.scss";

interface Props {
  type: string;
  id?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  styles?: string | any;
  onChange?: (value: any) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
export const InputBlack = React.forwardRef<IImperativeHandler, Props>(
  ({ id, type, onChange, minLength, maxLength, styles, placeholder }, ref) => {
    return (
      <div className={`${classes.form__control} ${styles}`}>
        <input
          className={classes.input}
          // ref={inputRef}
          id={id}
          minLength={minLength}
          maxLength={maxLength}
          type={type}
          placeholder={placeholder}
          // value={value}
          // readOnly={props.readonly || false}
          onChange={onChange}
          // autoComplete={props.autocomplete || "off"}
        />
      </div>
    );
  }
);
