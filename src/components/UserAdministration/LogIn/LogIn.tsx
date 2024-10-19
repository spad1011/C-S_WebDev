/* eslint-disable max-len */
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LogInForm } from '../LogInForm/LogInForm.tsx';
import { LoggedInContext } from '../../../App.tsx';
import { checkExistingUsername, checkPasswordForUser } from '../AdministrationHelper.ts';

export interface FormValues {
    username: string
    password: string
}

// named differently because of some internal NavBar error with Bootstrap
export function Login() {
  const { loggedIn, setLoggedIn } = useOutletContext<LoggedInContext>(); // Get the loggedIn value from the react-router root element and also allow to change it globally
  useEffect(() => {
    sessionStorage.setItem('isLoggedInKey', loggedIn.state.toString());
  }, [loggedIn]);

  const methods = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit, reset } = methods;
  const [showFeedbackAlert, setFeedbackAlertState] = useState<boolean>(false);

  const login: SubmitHandler<FormValues> = (values) => { // SubmitHandler explanation => LogInForm
    if (checkExistingUsername(values.username)
      && checkPasswordForUser(values.username, values.password)) { // Checks if user exists and password is correct
      setLoggedIn({ state: true });
      setFeedbackAlertState(false);
      reset();
      localStorage.setItem('currentUser', values.username);
    } else {
      reset({ password: '' });
      setFeedbackAlertState(true);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn({ state: false });
    navigate('/'); // to navigate back to the Homepage when logging out
  };

  return (
    <FormProvider {...methods}>
      {showFeedbackAlert ? (
        <Alert
          variant="warning"
          onClose={() => setFeedbackAlertState(false)}
          dismissible
        >
          Unknown Username/Password
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit(login)}>
          {!loggedIn.state && <LogInForm />}
        </Form>
      )}
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
