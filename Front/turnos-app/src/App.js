import React from 'react';
import './app.css';
import Pacientes from './componentes/pacientes/Pacientes'
import ProyectoState from './componentes/pacientes/useContext/proyectState'
import {BrowserRouter, BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Turno from './componentes/turnos/Turno'
import TurnoState from './componentes/turnos/useContextTurnos/turnoState'



function App() {
  return (


    <ProyectoState>
      <TurnoState>
        <html>
          <div className="container ">
            <Router>
              <Switch>
                <Route exact path="/pacientes" component={Pacientes}/>
                <Route exact path="/turnos" component={Turno}/>
              </Switch>
            </Router>
          </div>
        </html>
      </TurnoState>
    </ProyectoState>
    
    
  );
}

export default App;
