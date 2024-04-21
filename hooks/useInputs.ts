import { useState, useCallback } from "react";

interface InputEvent<T> extends React.ChangeEvent<T> {
  target: T & EventTarget & { name: string; value: any };
}

function useInputs<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const onChange = useCallback(
    (
      e: InputEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setValues((prevValues) => ({
        ...prevValues,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  const setValue = useCallback(
    (name: string, value: any) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [setValues]
  );

  return { values, onChange, reset, setValue };
}

export default useInputs;
