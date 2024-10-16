import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LogInForm } from '../LogInForm/LogInForm.tsx';
import { LoggedInContext } from '../../../App.tsx';

export interface FormValues {
    username: string
    password: string
}

// named differently because of some internal NavBar error with Bootstrap
export function Login() {
  /* const [loggedIn, changeLoggedIn] = useState(()=>{
        const savedState = isLoggedIn() //Need to return bool and not string
        return savedState;
    }) */

  const { loggedIn, setLoggedIn } = useOutletContext<LoggedInContext>();
  useEffect(() => {
    sessionStorage.setItem('isLoggedInKey', loggedIn.state.toString());
  }, [loggedIn]);

  const [uname, setUName] = useState<string>('');
  const methods = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const login: SubmitHandler<FormValues> = (data) => {
    // username: data.username
    // password: data.password
    setLoggedIn({ state: true });
    setUName(data.username);
    reset();
  };

  const logout = () => {
    setLoggedIn({ state: false });
    setUName('');
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(login)}>
        {!loggedIn.state && (<LogInForm />)}
        <p>{uname}</p>
      </Form>
      {loggedIn.state && (
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          logout();
        }}
      >
        Logout
      </Button>
      )}
    </FormProvider>
  );
}
