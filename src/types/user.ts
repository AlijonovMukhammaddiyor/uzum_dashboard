export interface UserType {
  username: string;
  phone_number: string;
  referred_by: string;
  referral_code: string;
  email?: string;
  is_staff?: boolean;
  tariff?: 'free' | 'trial' | 'seller' | 'business' | 'base';
  shops_updated_at?: string;
}
