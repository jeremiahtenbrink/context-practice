import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

export const useForm = (
  initalState,
  callback: () => any,
): [any, (e: ChangeEvent) => void, (e: FormEvent) => void] => {
  const [values, setValue] = useState(initalState);

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = (
    e,
  ): void => {
    if (e) {
      e.preventDefault();
    }
    setValue(initalState);
    callback();
  };

  const handleChange: (event: ChangeEvent<any>) => void = e => {
    e.persist();
    setValue((values: any) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  };

  return [values, handleChange, handleSubmit];
};
