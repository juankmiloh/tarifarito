const componentesTransmision = [
  {
    key: 1,
    start: true,
    show: true,
    header: [
      { title: 'CONCEPTO', tamano: 12 },
      { title: 'UNIDAD', tamano: 4 },
      { title: 'VALORES', tamano: 8 }
    ],
    data: [
      {
        campo: '1',
        concepto: 'Cargos por uso del STN MO (AGENTE)',
        unidad: '$/kWh',
        input: { key: 'cpuds_1', type: 'number', placeholder: 'Ingrese un valor', value: 87 }
      },
      {
        campo: '2',
        concepto: 'Cargos por uso del STN MO (LAC)',
        unidad: '$/kWh',
        input: { key: 'cpuds_2', type: 'number', placeholder: 'Ingrese un valor', value: 80 }
      }
    ]
  },
  {
    key: 2,
    start: false,
    show: true,
    header: [
      { title: 'CONCEPTO', tamano: 12 },
      { title: 'UNIDAD', tamano: 4 },
      { title: 'VALORES', tamano: 8 }
    ],
    data: [
      {
        campo: '1',
        concepto: 'Cargos por uso T\' publicado por el LAC',
        unidad: '$/kWh',
        input: { key: 'cput_1', type: 'number', placeholder: 'Ingrese un valor', value: '' }
      },
      {
        campo: '2',
        concepto: 'Delta cargo por uso T\' publicado por el LAC',
        unidad: '$/kWh',
        input: { key: 'cput_2', type: 'number', placeholder: 'Ingrese un valor', value: '' }
      },
      {
        campo: '3',
        concepto: 'Componente de Transmisión',
        unidad: '$/kWh',
        input: { key: 'cput_3', type: 'number', placeholder: 'Ingrese un valor', value: '' }
      }
    ]
  },
  {
    key: 3,
    start: false,
    show: true,
    header: [
      { title: 'CONCEPTO', tamano: 12 },
      { title: 'UNIDAD', tamano: 4 },
      { title: 'VALORES', tamano: 8 }
    ],
    data: [
      {
        campo: '1',
        concepto: 'Componente de Transmisión (AGENTE - SSPD)',
        unidad: '$/kWh',
        input: { key: 'cpt_1', type: 'number', placeholder: 'Ingrese un valor', value: '' }
      },
      {
        campo: '2',
        concepto: 'Componente de Transmisión (LAC - SSPD)',
        unidad: '$/kWh',
        input: { key: 'cpt_2', type: 'number', placeholder: 'Ingrese un valor', value: '' }
      }
    ]
  }
]

export default componentesTransmision
