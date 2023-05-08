import './login.scss'

import Loader from "@/components/Loader/Loader";

import { faLock, faSignIn, faUser } from "@fortawesome/free-solid-svg-icons";

import { FormContainer, Input } from "@/components/Form";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { Button } from "@/components/Button";

const Login = () => {

  const { flash, admin } = usePage().props
  console.log(admin)

  const { data, setData, processing, post, errors } = useForm({
    email: '',
    password: ''
  })

  const authorizeAdmin = () => {
    post(route('admin.login'))
  }

  return (
    <div className="admin-login-app">

      <h5>Administration Login</h5>

      <Head title={'Admin Login'} />
      <Loader load={processing} />

      <FormContainer>

        <Input
          label='E-mail or Username'
          labelIcon={faUser}
          value={data.email}
          error={errors.email}
          handleChange={ e => setData('email', e.target.value) }
        />

        <Input
          label='Password'
          labelIcon={faLock}
          value={data.password}
          error={errors.password}
          type={'password'}
          handleChange={ e => setData('password', e.target.value) }
        />

      </FormContainer>

      <Button icon={faSignIn} text='Authorize' color='dark' handleClick={authorizeAdmin} />

    </div>

  );

}

export default Login
