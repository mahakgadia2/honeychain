export type NavTab = 
  | 'home'
  | 'register-batch'
  | 'my-beehives'
  | 'harvest-batches'
  | 'nmr-lab-reports'
  | 'cooperative-pools'
  | 'msp-payouts-and-schemes'
  | 'marketplace-and-challenge';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}
