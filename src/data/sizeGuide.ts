export interface SizeMeasurement {
  size: string;
  chest: string;
  shoulder: string;
  length: string;
  sleeve: string;
}

export const sizeGuide: SizeMeasurement[] = [
  { size: 'P', chest: '96 cm', shoulder: '42 cm', length: '72 cm', sleeve: '60 cm' },
  { size: 'M', chest: '102 cm', shoulder: '44 cm', length: '74 cm', sleeve: '62 cm' },
  { size: 'G', chest: '108 cm', shoulder: '46 cm', length: '76 cm', sleeve: '64 cm' },
  { size: 'GG', chest: '114 cm', shoulder: '48 cm', length: '78 cm', sleeve: '66 cm' },
  { size: 'XG', chest: '122 cm', shoulder: '51 cm', length: '80 cm', sleeve: '68 cm' },
];

export const measurementInstructions = [
  {
    label: 'Tórax',
    instruction: 'Meça ao redor da parte mais larga do peito, passando pelas axilas.',
  },
  {
    label: 'Ombro',
    instruction: 'Meça de uma ponta do ombro à outra, passando por trás do pescoço.',
  },
  {
    label: 'Comprimento',
    instruction: 'Meça da base do pescoço (costas) até a barra da camisa.',
  },
  {
    label: 'Manga',
    instruction: 'Meça do ombro até o punho, com o braço levemente dobrado.',
  },
];
