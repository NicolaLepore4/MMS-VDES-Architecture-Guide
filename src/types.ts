import React from 'react';

export type ComponentId = 'agent' | 'edge-router' | 'vdes-modem' | 'vde-air' | 'shore-base' | 'shore-router' | 'dest-agent';

export type Language = 'it' | 'en';

export interface TranslationSet {
  title: string;
  subtitle: string;
  engineeringNote: string;
  securityCompliance: string;
  useCases: string;
  closeDocumentation: string;
  protocolArchitecture: string;
  bitLevelMapping: string;
  smartRoutingEnabled: string;
  encapsulationHierarchy: string;
  payloadSpecs: string;
  packetField: string;
  bitByteSize: string;
  logicDescription: string;
  referenceLibrary: string;
  innerCore: string;
  carrierLayer: string;
  middleware: string;
  ipLink: string;
  vdesLink: string;
  activeProtocol: string;
  details: string;
  smartRoutingNote: string;
  specification: string;
  vdesDescription: string;
  architectureView: string;
  vdesStructureView: string;
  frequency: string;
  channel: string;
  purpose: string;
  modulation: string;
  technology: string;
  upperLeg: string;
  lowerLeg: string;
  simplex: string;
  power: string;
  functioningLogic: string;
  routingLogic: string;
  messageBroker: string;
  storeAndForward: string;
  failoverMechanisms: string;
  confidentiality: string;
  integrity: string;
  availability: string;
  securityAnalysis: string;
  simulationView: string;
  activeScenario: string;
  satLossScenario: string;
  cyberScenario: string;
  startSimulation: string;
  stopSimulation: string;
  simEventLog: string;
  coastalRange: string;
  deepSea: string;
  shipStatus: string;
  linkStatus: string;
  securityStatus: string;
  priorityLevel: string;
  slowSpeed: string;
  normalSpeed: string;
  fastSpeed: string;
  pauseSim: string;
  resumeSim: string;
  rmodeTitle: string;
  pntTitle: string;
  rmodeSimulator: string;
  hdopTitle: string;
  accuracyTitle: string;
  geometryTitle: string;
  stationId: string;
  dragHint: string;
  theoryTitle: string;
  geometricDilution: string;
  atomicClockTitle: string;
  toaDescription: string;
  jammingTitle: string;
  spoofingTitle: string;
  optimalScenario: string;
  poorScenario: string;
  criticalScenario: string;
  resetMap: string;
  packetDecoder: string;
  decodePayload: string;
  selectTemplate: string;
  rawPayload: string;
  layerSMMP: string;
  layerMMTP: string;
  layerNMEA: string;
  encryptionKey: string;
  routingHeader: string;
  radioSentences: string;
  stackType: string;
  vdesStack: string;
  ethernetStack: string;
  backhaulStack: string;
  layerTransport: string;
  layerPhysical: string;
  endToEnd: string;
  hopByHop: string;
  protocolIndependenceTitle: string;
  protocolIndependenceDesc: string;
  disclaimerTitle: string;
  disclaimerText: string;
  educationalApp: string;
  vdeSatView: string;
  vdeSatSimulator: string;
  satelliteTitle: string;
  dopplerShift: string;
  latencyTitle: string;
  footprintTitle: string;
  passDuration: string;
  accessMode: string;
  randomAccess: string;
  spreadSpectrumTitle: string;
  locking: string;
  passStatus: string;
  vdeSatExpTitle: string;
  vdeSatExpDesc: string;
  vdeSatDopplerTitle: string;
  vdeSatDopplerDesc: string;
  vdeSatLatencyTitle: string;
  vdeSatLatencyDesc: string;
  vdeSatEssaTitle: string;
  vdeSatEssaDesc: string;
  aisCongestionView: string;
  aisCongestionSimulator: string;
  shipDensity: string;
  slotOccupancy: string;
  radarBlindingRisk: string;
  mmsEdgeRouter: string;
  routingActive: string;
  congestionWarning: string;
  congestionCritical: string;
  scenarioMalacca: string;
  scenarioGibraltar: string;
  scenarioEnglishChannel: string;
  aisPriorityTitle: string;
  aisPriorityDesc: string;
  macLayerTitle: string;
  macLayerDesc: string;
  routerTitle: string;
  routerDesc: string;
}

export interface BaseStation {
  id: string;
  x: number;
  y: number;
  active: boolean;
}

export type LocalizedString = { it: string; en: string };

export interface StepInfo {
  id: ComponentId;
  title: LocalizedString;
  subtitle: LocalizedString;
  details: LocalizedString[];
  protocol?: string;
  icon: React.ReactNode;
  resources?: Resource[];
  functioning?: {
    title: LocalizedString;
    steps: LocalizedString[];
  };
}

export interface Resource {
  title: string;
  url: string;
  type: 'spec' | 'paper' | 'use-case' | 'industry';
}

export interface SimPacket {
  id: string;
  type: 'SAR' | 'MET' | 'POS' | 'MALICIOUS' | 'TESLA';
  status: 'agent' | 'router' | 'link' | 'shore' | 'dest';
  link: 'vdes' | 'ip' | 'queued' | 'dropped';
  label: string;
  layer: 'Application' | 'Transport' | 'Physical' | 'Data';
  verified?: boolean;
  isTesla?: boolean;
}

export interface ProtocolInfo {
  id: string;
  name: string;
  description: LocalizedString;
  packetStructure: {
    field: string;
    description: LocalizedString;
    size?: string;
  }[];
  useCases: LocalizedString[];
  securityConsiderations: LocalizedString[];
  encapsulationStack?: string[];
  resources?: Resource[];
  functioning?: {
    title: LocalizedString;
    steps: LocalizedString[];
  };
}

export interface VdesChannelInfo {
  id: string;
  name: string;
  type: 'AIS' | 'ASM' | 'VDE-TER' | 'VDE-SAT';
  leg: 'upper' | 'lower' | 'simplex';
  frequency: string;
  channel: string;
  bandwidth: string;
  modulation: string;
  power: string;
  accessMethod: string;
  details: LocalizedString[];
  protocol: string;
  security: {
    confidentiality: LocalizedString;
    integrity: LocalizedString;
    availability: LocalizedString;
    notes: LocalizedString;
  };
}
