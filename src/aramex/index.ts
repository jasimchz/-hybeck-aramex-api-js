import {
  Address,
  AramexClientConfig,
  Consignee,
  RateResponse,
  Shipment,
  ShipmentDetails,
  ShipmentResponse,
  TrackingResponse,
} from "./types";
import { post } from "../helper";

let clientInfo: Record<string, any> = {};
let baseUrl = "";

// Initialize Aramex API client
export function initializeAramexClient(config: AramexClientConfig): void {
  baseUrl = config.sandbox
    ? "https://ws.dev.aramex.net/ShippingAPI.V2"
    : "https://ws.aramex.net/ShippingAPI.V2";

  clientInfo = {
    UserName: config.username,
    Password: config.password,
    Version: "v2",
    AccountNumber: config.accountNumber,
    AccountPin: config.accountPin,
    AccountEntity: config.accountEntity,
    AccountCountryCode: config.accountCountryCode,
    Source: 24,
  };
}

// Get shipping cost
export async function getAramexShippingCost(
  origin: Address,
  destination: Address,
  shipmentDetails: ShipmentDetails
): Promise<RateResponse> {
  const payload = {
    ClientInfo: clientInfo,
    Transaction: null,
    OriginAddress: origin,
    DestinationAddress: destination,
    ShipmentDetails: shipmentDetails,
  };

  return post(
    "RateCalculator/Service_1_0.svc/json/CalculateRate",
    payload,
    baseUrl
  );
}

// Request delivery
export async function requestAramexDelivery(
  shipment: Shipment,
  consignee: Consignee,
  details: ShipmentDetails
): Promise<ShipmentResponse> {
  const payload = {
    ClientInfo: clientInfo,
    Transaction: null,
    Shipments: [
      {
        ...shipment,
        Consignee: consignee,
        Details: details,
      },
    ],
  };

  return post(
    "Shipping/Service_1_0.svc/json/CreateShipments",
    payload,
    baseUrl
  );
}

// Request return
export async function requestAramexReturn(
  shipment: Shipment,
  consignee: Consignee,
  details: ShipmentDetails
): Promise<ShipmentResponse> {
  const payload = {
    ClientInfo: clientInfo,
    Transaction: null,
    Shipments: [
      {
        ...shipment,
        Consignee: consignee,
        Details: details,
        ShipmentType: "RTN",
      },
    ],
  };

  return post(
    "Shipping/Service_1_0.svc/json/CreateShipments",
    payload,
    baseUrl
  );
}

// Get shipment status
export async function getAramexShipmentStatus(
  shipmentNumbers: string[]
): Promise<TrackingResponse> {
  const payload = {
    ClientInfo: clientInfo,
    Transaction: null,
    Shipments: shipmentNumbers,
  };

  return post("Tracking/Service_1_0.svc/json/TrackShipments", payload, baseUrl);
}

// Create Address helper function
export function createAramexAddress(address: Partial<Address>): Address {
  return {
    Line1: address.Line1 || "",
    Line2: address.Line2 || "",
    Line3: address.Line3 || "",
    City: address.City || "",
    StateOrProvinceCode: address.StateOrProvinceCode || "",
    PostCode: address.PostCode || "",
    CountryCode: address.CountryCode || "",
  };
}

// Calculate chargeable weight
export function calculateAramexChargeableWeight(
  dimensions: { Length: number; Width: number; Height: number; Unit: string },
  actualWeight: number
): number {
  const dimensionalFactor = 5000;
  const volumetricWeight =
    (dimensions.Length * dimensions.Width * dimensions.Height) /
    dimensionalFactor;
  return Math.max(actualWeight, volumetricWeight);
}

// Test credentials
export const aramexTestCredentials: AramexClientConfig = {
  username: "testingapi@aramex.com",
  password: "R123456789$r",
  accountNumber: "20016",
  accountPin: "331421",
  accountEntity: "AMM",
  accountCountryCode: "JO",
  sandbox: true,
};
