import {
  Alert,
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkExistingUsername } from '../AdministrationHelper.ts';
import { LoggedInContext } from '../../../App.tsx';
import { FormValues } from '../LogIn/LogIn.tsx';

interface SignInProp {
  hideModal: () => void;
}

export function SignIn({ hideModal }: SignInProp) {
  const { loggedIn, setLoggedIn } = useOutletContext<LoggedInContext>();
  useEffect(() => {
    sessionStorage.setItem('isLoggedInKey', loggedIn.state.toString());
  }, [loggedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showFeedbackAlert, setFeedbackAlertState] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (checkExistingUsername(values.username)) {
      setFeedbackMessage('Username already exists!');
    } else {
      setLoggedIn({ state: true });
      setFeedbackMessage('User succesfully created!');
      localStorage.setItem(values.username, values.password);
      localStorage.setItem('currentUser', values.username);
    }
    setFeedbackAlertState(true);
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title> SIGN IN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormLabel>Enter Username</FormLabel>
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
            <FormControl
              type="password"
              placeholder="Enter password"
              {...register('password', {
                required: 'Password can not be empty',
              })}
            />
            {errors.password && (
            <FormControl.Feedback type="invalid">
              {errors.password.message}
            </FormControl.Feedback>
            )}
          </FormGroup>
          <Row className="pt-3">
            <Col className="d-flex justify-content-start">
              <Button variant="secondary" onClick={hideModal}>
                Close
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      {showFeedbackAlert && (
        <Alert
          variant={
            feedbackMessage === 'Username already exists!'
              ? 'warning'
              : 'success'
          }
          onClose={() => setFeedbackAlertState(false)}
          dismissible
        >
          {feedbackMessage}
        </Alert>
      )}
    </Modal>
  );
}
