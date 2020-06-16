import React from 'react';
import Moment from 'moment';

export const odontogramProcedures = {
    procedures:[
        {
            name: '',
            selector: 'date',
        cell: row=> <div className="procedure-data">{Moment(row.date).format('DD/MM/yyyy')}</div>
          },
        {
          name: '',
          selector: 'description',
        cell:row=><div className="procedure-data" style={{whiteSpace:'break-spaces'}}>{row.description}</div>
         
        },
        {
            name: '',
            selector: 'doctor',
            cell:row=><div className="procedure-data">{row.doctor}</div>
          }
      ],
      preExistingProcedures : [
        {
          name: '',
          selector: 'toothId',
          omit: true
        },
        {
          name: '',
          selector: 'description',
          cell:row=><div className="procedure-data" style={{whiteSpace:'break-spaces'}}>{row.description}</div>
        }
      ]
};
