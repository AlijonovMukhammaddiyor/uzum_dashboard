export interface UserType {
  username: string;
  phone_number: string;
  referred_by: string;
  referral_code: string;
  email?: string;
  is_staff?: boolean;
  is_pro?: boolean;
  is_proplus?: boolean;
}
