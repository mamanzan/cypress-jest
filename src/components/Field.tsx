import React, { useRef, useState } from "react";

import "./Field.css";

export interface IFieldProps {
  placeholder?: string;
  text?: string;
  width?: string;
}

export const Field = ({
  placeholder = "",
  text = "",
  width = "300px",
}: IFieldProps): JSX.Element => {
  const fieldRef = useRef(null);
  const [state, setState] = useState({ text, showClear: false });

  const updateValue = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setState({ text: value, showClear: value.length > 0 });
  };

  const clear = () => {
    setState({ text: "", showClear: false });
    if (fieldRef.current) (fieldRef.current as any).focus();
  };

  const field = "field";
  return (
    <div className={field} style={{ width }} data-cy="field">
      <input
        type="text"
        data-cy="textInput"
        ref={fieldRef}
        placeholder={placeholder}
        value={state.text}
        onChange={updateValue}
      />
      {state.showClear && (
        <button data-cy="clear" onClick={clear}>
          ×
        </button>
      )}
    </div>
  );
};
