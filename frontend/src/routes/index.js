import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentsUpdate from '../pages/StudentsUpdate';
import StudentsRegister from '../pages/StudentsRegister';
import Plans from '../pages/Plans';
import PlansRegister from '../pages/PlansRegister';
import PlansUpdate from '../pages/PlansUpdate';
import Registration from '../pages/Registration';
import RegistrationNew from '../pages/RegistrationNew';
import RegistrationUpdate from '../pages/RegistrationUpdate';
import HelpOrders from '../pages/HelpOrders';
import Checkins from '../pages/Checkins'
import Alert from '../pages/Alert'
import Trainings from '../pages/Trainings'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/alert" component={Alert} isPrivate />
      <Route path="/checkins" component={Checkins} isPrivate />
      <Route path="/trainings" component={Trainings} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/students-register" component={StudentsRegister} isPrivate />
      <Route
        path="/students-update/:id?"
        component={StudentsUpdate}
        isPrivate
      />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/plans-register" component={PlansRegister} isPrivate />
      <Route path="/plans-update/:id" component={PlansUpdate} isPrivate />
      <Route path="/registration" component={Registration} isPrivate />
      <Route path="/new-registration" component={RegistrationNew} isPrivate />
      <Route
        path="/registration-update/:id"
        component={RegistrationUpdate}
        isPrivate
      />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
