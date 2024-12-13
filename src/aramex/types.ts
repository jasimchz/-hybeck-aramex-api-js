export interface AramexClientConfig {
  username: string;
  password: string;
  accountNumber: string;
  accountPin: string;
  accountEntity: string;
  accountCountryCode: string;
  sandbox?: boolean;
}

export interface Address {
  Line1: string;
  Line2?: string;
  Line3?: string;
  City: string;
  StateOrProvinceCode?: string;
  PostCode?: string;
  CountryCode: string;
}

export interface ShipmentDetails {
  Dimensions?: {
    Length: number;
    Width: number;
    Height: number;
    Unit: string;
  };
  ActualWeight: {
    Value: number;
    Unit: string;
  };
  ProductGroup: string;
  ProductType: string;
  PaymentType: string;
  PaymentOptions?: string;
  Services?: string;
  NumberOfPieces: number;
  DescriptionOfGoods: string;
  GoodsOriginCountry: string;
}

export interface Consignee {
  Name: string;
  CompanyName?: string;
  PhoneNumber1: string;
  PhoneNumber2?: string;
  CellPhone?: string;
  EmailAddress?: string;
  Address: Address;
}

export interface Shipment {
  Shipper: Consignee;
  Reference1?: string;
  Reference2?: string;
  Reference3?: string;
  ForeignHAWB?: string;
}

export interface RateResponse {
  HasErrors: boolean;
  ErrorMessage: string;
  TotalAmount: number;
  CurrencyCode: string;
  EstimatedDeliveryDate: string;
  RateDetails: Array<{
    ProductGroup: string;
    ProductType: string;
    Rate: number;
    CurrencyCode: string;
    ServiceCode: string;
    ServiceName: string;
    EstimatedDeliveryDate: string;
  }>;
}

export interface ShipmentResponse {
  HasErrors: boolean;
  ErrorMessage: string;
  Shipments: Array<{
    ShipmentNumber: string;
    TrackingNumber: string;
    Status: string;
    StatusDescription: string;
    EstimatedDeliveryDate: string;
  }>;
}

export interface TrackingResponse {
  HasErrors: boolean;
  ErrorMessage: string;
  Shipments: Array<{
    ShipmentNumber: string;
    TrackingNumber: string;
    Status: string;
    StatusDescription: string;
    CurrentLocation: string;
    EstimatedDeliveryDate: string;
    ShipmentEvents: Array<{
      EventCode: string;
      EventDescription: string;
      EventDate: string;
      Location: string;
    }>;
  }>;
}
