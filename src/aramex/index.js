"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aramexTestCredentials = void 0;
exports.initializeAramexClient = initializeAramexClient;
exports.getAramexShippingCost = getAramexShippingCost;
exports.requestAramexDelivery = requestAramexDelivery;
exports.requestAramexReturn = requestAramexReturn;
exports.getAramexShipmentStatus = getAramexShipmentStatus;
exports.createAramexAddress = createAramexAddress;
exports.calculateAramexChargeableWeight = calculateAramexChargeableWeight;
const helper_1 = require("../helper");
let clientInfo = {};
let baseUrl = "";
// Initialize Aramex API client
function initializeAramexClient(config) {
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
function getAramexShippingCost(origin, destination, shipmentDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            ClientInfo: clientInfo,
            Transaction: null,
            OriginAddress: origin,
            DestinationAddress: destination,
            ShipmentDetails: shipmentDetails,
        };
        return (0, helper_1.post)("RateCalculator/Service_1_0.svc/json/CalculateRate", payload, baseUrl);
    });
}
// Request delivery
function requestAramexDelivery(shipment, consignee, details) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            ClientInfo: clientInfo,
            Transaction: null,
            Shipments: [
                Object.assign(Object.assign({}, shipment), { Consignee: consignee, Details: details }),
            ],
        };
        return (0, helper_1.post)("Shipping/Service_1_0.svc/json/CreateShipments", payload, baseUrl);
    });
}
// Request return
function requestAramexReturn(shipment, consignee, details) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            ClientInfo: clientInfo,
            Transaction: null,
            Shipments: [
                Object.assign(Object.assign({}, shipment), { Consignee: consignee, Details: details, ShipmentType: "RTN" }),
            ],
        };
        return (0, helper_1.post)("Shipping/Service_1_0.svc/json/CreateShipments", payload, baseUrl);
    });
}
// Get shipment status
function getAramexShipmentStatus(shipmentNumbers) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            ClientInfo: clientInfo,
            Transaction: null,
            Shipments: shipmentNumbers,
        };
        return (0, helper_1.post)("Tracking/Service_1_0.svc/json/TrackShipments", payload, baseUrl);
    });
}
// Test credentials
exports.aramexTestCredentials = {
    username: "testingapi@aramex.com",
    password: "R123456789$r",
    accountNumber: "20016",
    accountPin: "331421",
    accountEntity: "AMM",
    accountCountryCode: "JO",
    sandbox: true,
};
// Create Address helper function
function createAramexAddress(address) {
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
function calculateAramexChargeableWeight(dimensions, actualWeight) {
    const dimensionalFactor = 5000;
    const volumetricWeight = (dimensions.Length * dimensions.Width * dimensions.Height) /
        dimensionalFactor;
    return Math.max(actualWeight, volumetricWeight);
}
