import React from 'react';
import Moment from 'moment';

export const odontogramProcedures = {
    procedures:[
        {
            name: '',
            selector: 'date',
            cell: row=> Moment(row.date).format('DD/MM/yyyy')
          },
        {
          name: '',
          selector: 'description',
        cell:row=><div style={{whiteSpace:'break-spaces'}}>{row.description}</div>
         
        },
        {
            name: '',
            selector: 'doctor'
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
          cell:row=><div style={{whiteSpace:'break-spaces'}}>{row.description}</div>
        }
      ]
};
