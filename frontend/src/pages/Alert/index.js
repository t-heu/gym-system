import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import { Alerts, Wrapper, Container } from './styles';

const schema = Yup.object().shape({
  message: Yup.string()
    .required('é obrigatório')
});

export default function Alert() {
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit({message}) {
    try {
      setLoading(true);
      await api.post('/users/push', {message});
  
      setLoading(false);
      alert('Check!');
    } catch (err) {
      setLoading(false);
      alert('Ooops.. ');
    }
  }
  
  return (
    <Alerts>
      <h1>Gerenciador de Avisos</h1>
      <Wrapper>
   
        <Container>
          <Form schema={schema} onSubmit={handleSubmit}>
            <label htmlFor="message">Enviar avisos para celulares</label>
            <Input multiline name="message" placeholder="Avisos" />
            
            <button className="button__submit" type="submit">
              {loading ? 'Loading...' : 'Enviar'}
            </button>
          </Form>
        </Container>
      </Wrapper>
    </Alerts>
  )
}