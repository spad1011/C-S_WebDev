import { Button, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

export function LogInForm() {
  const { register } = useFormContext();

  return (
    <Stack direction="horizontal" gap={3}>
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
        className="mr-1"
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
