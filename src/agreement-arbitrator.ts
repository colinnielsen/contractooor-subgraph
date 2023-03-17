import {
  AgreementInitiated as AgreementInitiatedEvent,
  AgreementProposed as AgreementProposedEvent
} from "../generated/AgreementArbitrator/AgreementArbitrator"
import { AgreementInitiated, AgreementProposed } from "../generated/schema"

export function handleAgreementInitiated(event: AgreementInitiatedEvent): void {
  let entity = new AgreementInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementGUID = event.params.agreementGUID
  entity.contractooorAgreement = event.params.contractooorAgreement
  entity.streamId = event.params.streamId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAgreementProposed(event: AgreementProposedEvent): void {
  let entity = new AgreementProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementGUID = event.params.agreementGUID
  entity.agreementId = event.params.agreementId
  entity.provider = event.params.provider
  entity.client = event.params.client
  entity.contractURI = event.params.contractURI
  entity.targetEndTimestamp = event.params.targetEndTimestamp
  entity.streamToken = event.params.streamToken
  entity.totalStreamedTokens = event.params.totalStreamedTokens
  entity.terminationClauses_atWillDays =
    event.params.terminationClauses.atWillDays
  entity.terminationClauses_cureTimeDays =
    event.params.terminationClauses.cureTimeDays
  entity.terminationClauses_legalCompulsion =
    event.params.terminationClauses.legalCompulsion
  entity.terminationClauses_moralTurpitude =
    event.params.terminationClauses.moralTurpitude
  entity.terminationClauses_bankruptcyDissolutionInsolvency =
    event.params.terminationClauses.bankruptcyDissolutionInsolvency
  entity.terminationClauses_counterpartyMalfeasance =
    event.params.terminationClauses.counterpartyMalfeasance
  entity.terminationClauses_lostControlOfPrivateKeys =
    event.params.terminationClauses.lostControlOfPrivateKeys

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
