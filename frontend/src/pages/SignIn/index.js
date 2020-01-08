import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import { Wrapper, Container } from './styles';
import logo from '../../assets/logo-gympoint-vertical.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  
  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="GymPoint Logo" />
        
        <Form schema={schema} onSubmit={handleSubmit}>
          <label htmlFor="email">Seu Email</label>
          <Input name="email" placeholder="exemplo@email.com" />
          <label htmlFor="password">Sua Senha</label>
          <Input name="password" type="password" placeholder="******" />

          <button className="button__submit" type="submit">
            {loading ? 'Loading...' : 'Entrar no Sistema'}
          </button>
        </Form>
      </Container>
    </Wrapper>
  );
}
