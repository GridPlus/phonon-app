import * as React from "react";

const FormErrorText: React.FC<{ children?: string }> = (props) => (
  <p className="text-bold p-2 text-xl text-red-400 shadow-inner">
    {props.children}
  </p>
);

export default FormErrorText;
