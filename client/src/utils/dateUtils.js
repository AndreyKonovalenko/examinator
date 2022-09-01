import moment from 'moment';

export const updatedAtPareser = (updatedAt) =>
  moment(updatedAt).format('DD.MM.YYYY/HH:mm:ss');
