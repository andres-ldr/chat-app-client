import React from 'react';

interface FormComponentProps {
  children: React.ReactNode;
}

const FormComponent = ({ children }: FormComponentProps) => {

  return <form action="">
    {children}
  </form>;
};

export default FormComponent;
