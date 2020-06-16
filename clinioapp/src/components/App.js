import React from 'react';
import SelectGenders from './SelectGenders';
import SelectInsurances from './SelectInsurances';
const App=()=>(
    <>
        <div>
            <h2>Clinio - Teste API's</h2>
            <h4>Genders</h4>
            <SelectGenders />
            <h4>Insurances</h4>
            <SelectInsurances />
        </div>
    </>
);
export default App;