import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import BSForm from '../components/form/BSFrom';
import BSInput from '../components/form/BSInput';
import { useRegisterMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Registering...');
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match', { id: toastId, duration: 2000 });
        return;
      }

      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log(data);
      await registerUser(newUser).unwrap();
      toast.success('Registration successful', { id: toastId, duration: 2000 });
      navigate('/login');
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BSInput type="text" name="name" label="Name:" />
        <BSInput type="email" name="email" label="Email:" />
        <BSInput type="password" name="password" label="Password:" />
        <BSInput type="password" name="confirmPassword" label="Confirm Password:" />
        <Button htmlType="submit">Register</Button>
      </BSForm>
      <div style={{ marginTop: '16px' }}>
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </Row>
  );
};

export default Register;
