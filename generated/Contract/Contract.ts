// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Contract__agreementResult {
  value0: Address;
  value1: Address;
  value2: i32;
  value3: i32;
  value4: boolean;
  value5: boolean;
  value6: boolean;
  value7: boolean;
  value8: boolean;
  value9: string;

  constructor(
    value0: Address,
    value1: Address,
    value2: i32,
    value3: i32,
    value4: boolean,
    value5: boolean,
    value6: boolean,
    value7: boolean,
    value8: boolean,
    value9: string
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set(
      "value3",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value3))
    );
    map.set("value4", ethereum.Value.fromBoolean(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    map.set("value7", ethereum.Value.fromBoolean(this.value7));
    map.set("value8", ethereum.Value.fromBoolean(this.value8));
    map.set("value9", ethereum.Value.fromString(this.value9));
    return map;
  }

  getProvider(): Address {
    return this.value0;
  }

  getClient(): Address {
    return this.value1;
  }

  getAtWillDays(): i32 {
    return this.value2;
  }

  getCureTimeDays(): i32 {
    return this.value3;
  }

  getLegalCompulsion(): boolean {
    return this.value4;
  }

  getMoralTurpitude(): boolean {
    return this.value5;
  }

  getBankruptcyDissolutionInsolvency(): boolean {
    return this.value6;
  }

  getCounterpartyMalfeasance(): boolean {
    return this.value7;
  }

  getLostControlOfPrivateKeys(): boolean {
    return this.value8;
  }

  getContractURI(): string {
    return this.value9;
  }
}

export class Contract__initializeInput_agreementStruct extends ethereum.Tuple {
  get provider(): Address {
    return this[0].toAddress();
  }

  get client(): Address {
    return this[1].toAddress();
  }

  get atWillDays(): i32 {
    return this[2].toI32();
  }

  get cureTimeDays(): i32 {
    return this[3].toI32();
  }

  get legalCompulsion(): boolean {
    return this[4].toBoolean();
  }

  get moralTurpitude(): boolean {
    return this[5].toBoolean();
  }

  get bankruptcyDissolutionInsolvency(): boolean {
    return this[6].toBoolean();
  }

  get counterpartyMalfeasance(): boolean {
    return this[7].toBoolean();
  }

  get lostControlOfPrivateKeys(): boolean {
    return this[8].toBoolean();
  }

  get contractURI(): string {
    return this[9].toString();
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  agreement(): Contract__agreementResult {
    let result = super.call(
      "agreement",
      "agreement():(address,address,uint16,uint16,bool,bool,bool,bool,bool,string)",
      []
    );

    return new Contract__agreementResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toI32(),
      result[3].toI32(),
      result[4].toBoolean(),
      result[5].toBoolean(),
      result[6].toBoolean(),
      result[7].toBoolean(),
      result[8].toBoolean(),
      result[9].toString()
    );
  }

  try_agreement(): ethereum.CallResult<Contract__agreementResult> {
    let result = super.tryCall(
      "agreement",
      "agreement():(address,address,uint16,uint16,bool,bool,bool,bool,bool,string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__agreementResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toI32(),
        value[3].toI32(),
        value[4].toBoolean(),
        value[5].toBoolean(),
        value[6].toBoolean(),
        value[7].toBoolean(),
        value[8].toBoolean(),
        value[9].toString()
      )
    );
  }

  initialize(
    _sablier: Address,
    streamToken: Address,
    tokensToStream: BigInt,
    termLength: BigInt,
    _agreement: Contract__initializeInput_agreementStruct
  ): BigInt {
    let result = super.call(
      "initialize",
      "initialize(address,address,uint256,uint256,(address,address,uint16,uint16,bool,bool,bool,bool,bool,string)):(uint256)",
      [
        ethereum.Value.fromAddress(_sablier),
        ethereum.Value.fromAddress(streamToken),
        ethereum.Value.fromUnsignedBigInt(tokensToStream),
        ethereum.Value.fromUnsignedBigInt(termLength),
        ethereum.Value.fromTuple(_agreement)
      ]
    );

    return result[0].toBigInt();
  }

  try_initialize(
    _sablier: Address,
    streamToken: Address,
    tokensToStream: BigInt,
    termLength: BigInt,
    _agreement: Contract__initializeInput_agreementStruct
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "initialize",
      "initialize(address,address,uint256,uint256,(address,address,uint16,uint16,bool,bool,bool,bool,bool,string)):(uint256)",
      [
        ethereum.Value.fromAddress(_sablier),
        ethereum.Value.fromAddress(streamToken),
        ethereum.Value.fromUnsignedBigInt(tokensToStream),
        ethereum.Value.fromUnsignedBigInt(termLength),
        ethereum.Value.fromTuple(_agreement)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _sablier(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get streamToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokensToStream(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get termLength(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _agreement(): InitializeCall_agreementStruct {
    return changetype<InitializeCall_agreementStruct>(
      this._call.inputValues[4].value.toTuple()
    );
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get streamId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class InitializeCall_agreementStruct extends ethereum.Tuple {
  get provider(): Address {
    return this[0].toAddress();
  }

  get client(): Address {
    return this[1].toAddress();
  }

  get atWillDays(): i32 {
    return this[2].toI32();
  }

  get cureTimeDays(): i32 {
    return this[3].toI32();
  }

  get legalCompulsion(): boolean {
    return this[4].toBoolean();
  }

  get moralTurpitude(): boolean {
    return this[5].toBoolean();
  }

  get bankruptcyDissolutionInsolvency(): boolean {
    return this[6].toBoolean();
  }

  get counterpartyMalfeasance(): boolean {
    return this[7].toBoolean();
  }

  get lostControlOfPrivateKeys(): boolean {
    return this[8].toBoolean();
  }

  get contractURI(): string {
    return this[9].toString();
  }
}