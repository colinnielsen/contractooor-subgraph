import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AgreementInitiated,
  AgreementProposed
} from "../generated/AgreementArbitrator/AgreementArbitrator"

export function createAgreementInitiatedEvent(
  agreementGUID: Bytes,
  contractooorAgreement: Address,
  streamId: BigInt
): AgreementInitiated {
  let agreementInitiatedEvent = changetype<AgreementInitiated>(newMockEvent())

  agreementInitiatedEvent.parameters = new Array()

  agreementInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementGUID",
      ethereum.Value.fromFixedBytes(agreementGUID)
    )
  )
  agreementInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractooorAgreement",
      ethereum.Value.fromAddress(contractooorAgreement)
    )
  )
  agreementInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "streamId",
      ethereum.Value.fromUnsignedBigInt(streamId)
    )
  )

  return agreementInitiatedEvent
}

export function createAgreementProposedEvent(
  agreementGUID: Bytes,
  agreementId: BigInt,
  provider: Address,
  client: Address,
  contractURI: string,
  targetEndTimestamp: BigInt,
  streamToken: Address,
  totalStreamedTokens: BigInt,
  terminationClauses: ethereum.Tuple
): AgreementProposed {
  let agreementProposedEvent = changetype<AgreementProposed>(newMockEvent())

  agreementProposedEvent.parameters = new Array()

  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementGUID",
      ethereum.Value.fromFixedBytes(agreementGUID)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam("client", ethereum.Value.fromAddress(client))
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "contractURI",
      ethereum.Value.fromString(contractURI)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "targetEndTimestamp",
      ethereum.Value.fromUnsignedBigInt(targetEndTimestamp)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "streamToken",
      ethereum.Value.fromAddress(streamToken)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "totalStreamedTokens",
      ethereum.Value.fromUnsignedBigInt(totalStreamedTokens)
    )
  )
  agreementProposedEvent.parameters.push(
    new ethereum.EventParam(
      "terminationClauses",
      ethereum.Value.fromTuple(terminationClauses)
    )
  )

  return agreementProposedEvent
}
