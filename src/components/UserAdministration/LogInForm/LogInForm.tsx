import { Button, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

export function LogInForm() {
  const { register } = useFormContext();
  // eslint-disable-next-line max-len
  // register is used to extract value from Form element to be used for the SubmitHandler so that it can generate an object with the extracted values

  return (
    <Stack direction="horizontal" gap={2}>
      <Form.Control
        className="mr-1"
        type="text"
        placeholder="Username"
        required
        {...register('username', {
          required: true,
        })}
      />
      <Form.Control
        className=""
        type="password"
        placeholder="Password"
        required
        {...register('password', {
          required: true,
        })}
      />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Stack>
  );
}
