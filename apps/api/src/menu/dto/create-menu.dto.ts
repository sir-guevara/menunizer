import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsNumber()
  table: number;

  @IsNotEmpty()
  @IsString()
  detail: string;

  paymentMethod?: PaymentMethodInterface;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

interface PaymentMethodInterface {
  id: string;
  object: string;
  billing_details: BillingDetails;
  card: Card;
  created: number;
  customer: null;
  livemode: boolean;
  type: string;
}

interface BillingDetails {
  address: Address;
  email: null;
  name: string;
  phone: null;
}

interface Address {
  city: null;
  country: null;
  line1: null;
  line2: null;
  postal_code: string;
  state: null;
}

interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  funding: string;
  generated_from: null;
  last4: string;
  networks: Networks;
  three_d_secure_usage: ThreeDSecureUsage;
  wallet: null;
}

interface Checks {
  address_line1_check: null;
  address_postal_code_check: null;
  cvc_check: null;
}

interface Networks {
  available: string[];
  preferred: null;
}

interface ThreeDSecureUsage {
  supported: boolean;
}
