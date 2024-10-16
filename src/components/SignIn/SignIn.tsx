import {
  Alert, Button, FormControl, FormGroup, FormLabel, Modal,
} from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkExistingUsername } from './SignInHelpers.ts';
import { LoggedInContext } from '../../App.tsx';
import { FormValues } from '../LogIn/LogIn/LogIn.tsx';

interface SignInProp {
    hideModal: () => void;
}

export function SignIn({ hideModal }: SignInProp) {
  const { loggedIn, setLoggedIn } = useOutletContext<LoggedInContext>();
  useEffect(() => {
    sessionStorage.setItem('isLoggedInKey', loggedIn.state.toString());
  }, [loggedIn]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showFeedbackAlert, setFeedbackAlertState] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    if (checkExistingUsername(input.username)) {
      setFeedbackMessage('Username already exists!');
    } else {
      localStorage.setItem(input.username, input.password);
      setLoggedIn({ state: true });
      setFeedbackMessage('User succesfully created!');
    }
    setFeedbackAlertState(true);
  };

  return (
    <>
      <Modal
        show
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title> SIGN IN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>Enter Username</FormLabel>
              #
              <FormControl
                type="text"
                placeholder="Enter username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <FormControl.Feedback type="invalid">
                  {errors.username.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Enter Password</FormLabel>
              #
              <FormControl
                type="password"
                placeholder="Enter password"
                {...register('password', { required: 'Password can not be empty' })}
              />
              {errors.password && (
                <FormControl.Feedback type="invalid">
                  {errors.password.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer onSubmit={handleSubmit(onSubmit)}>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      {showFeedbackAlert && (
        <Alert
          variant={feedbackMessage === 'Username already exists!' ? 'success' : 'warning'}
          onClose={() => setFeedbackAlertState(false)}
          dismissible
        >
          {feedbackMessage}
        </Alert>
      )}
    </>
  );
}
