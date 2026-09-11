export type NavTab = 
  | 'register-batch'
  | 'my-beehives'
  | 'harvest-batches'
  | 'nmr-lab-reports'
  | 'msp-payouts-and-schemes'
  | 'marketplace-and-challenge';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}
