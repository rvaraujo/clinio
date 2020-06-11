const PatientService = {
    getPatientInfo:function(id){
        let patient = '';
        let toothStatus= [];
        let toothProcedures =[];
        let newProcedures=[];
        let procedures=[];
        if(id === 'abc'){
            patient = {name: 'Rafael Vieira de Araujo', birthDate: '1979-05-18',email:'rvaraujo.sp@gmailo.com',gender:'M',insurance:1, postalCode:"60749020",address:"RUA 08H", addressNumber:"255", neighborhood:"José Walter", city:"Fortaleza", state:"CE",addressComplement:"Bloco C - AP 203"};
            toothStatus.push({id:26,absent:true, damaged: false, recovered:false, implanted:false});
            toothProcedures.push({toothId:21, description:'Restauração'},{toothId:27, description:'Obturação'});
            newProcedures.push({toothId:21,description:'Restauração Coroa Restauração Coroa Restauração Coroa Restauração Coroa', date:'2020-05-03', doctor:'Dr Gilberto'},{toothId:21,description:'Obturação', date:'2020-03-12', doctor:'Dr Ronaldo Azevedo'});
            procedures.push({date:'2020-04-15',description:'Limpeza',doctor:'Dra. Karina'},{date:'2020-04-15',description:'Aplicação de Flúor',doctor:'Dra. Karina'});
        }
            if(id === 'wert'){
                patient = {name: 'Camila Faria', birthDate: '1988-10-17',email:'camila_fisio@hotmail.com.br',gender:'F',insurance:3, postalCode:"60749020",address:"RUA 08H", addressNumber:"255", neighborhood:"José Walter", city:"Fortaleza", state:"CE",addressComplement:"Bloco C - AP 203"};
                procedures.push({data:'2020-04-22',description:'Branqueamento',doctor:'Dr. Ricardo'});
            }
            if(id === 'gthg')
            patient =  {name: 'Eriberto Araujo', birthDate: '1947-07-11',email:'eribertoaraujo@globo.com',gender:'M',insurance:5, postalCode:"60182005",address:"AVENIDA CESAR CALS", addressNumber:"350", neighborhood:"Vicente Pinzon", city:"Fortaleza", state:"CE",addressComplement:"AP 304"};
            if(id === 'fgrg')
            patient = {name: 'Francisca Maciel', birthDate: '1962-10-28',email:'neidemaciel@globo.com',gender:'F',insurance:3, postalCode:"60182005",address:"AVENIDA CESAR CALS", addressNumber:"350", neighborhood:"Vicente Pinzon", city:"Fortaleza", state:"CE",addressComplement:"AP 304"};

        return {patient: patient, toothStatus :toothStatus,preExistingProcedures: toothProcedures, performedProcedures:newProcedures,procedures: procedures};
    }
}
export default PatientService;