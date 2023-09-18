export interface UserType {
  username: string;
  phone_number: string;
  referred_by?: string;
  is_paid?: boolean;
  referral_code: string;
  payment_date?: string;
  email?: string;
  is_staff?: boolean;
  tariff?: 'free' | 'trial' | 'seller' | 'business' | 'base';
  shops_updated_at?: string;
}
