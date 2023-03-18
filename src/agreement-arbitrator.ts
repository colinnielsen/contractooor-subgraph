import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  crypto,
} from "@graphprotocol/graph-ts";
import {
  AgreementInitiated as AgreementInitiatedEvent,
  AgreementProposed as AgreementProposedEvent,
} from "../generated/AgreementArbitrator/AgreementArbitrator";
import {
  Agreement,
  AgreementInitiated,
  AgreementProposed,
} from "../generated/schema";

export function getOrCreateAgreementEntity(
  agreementId: BigInt,
  provider: Address,
  client: Address
): Agreement {
  let id = Bytes.fromByteArray(crypto.keccak256(
    ByteArray.fromUTF8(
      agreementId
        .toHex()
        .concat(provider.toHex())
        .concat(client.toHex())
    )
  ));

  let agreement = Agreement.load(id);

  if (agreement == null) {
    agreement = new Agreement(id);
    agreement.agreementId = agreementId;
    agreement.provider = provider;
    agreement.client = client;
    agreement.save();
  }

  return agreement;
}

export function handleAgreementProposed(event: AgreementProposedEvent): void {
  let entity = new AgreementProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let agreement = getOrCreateAgreementEntity(
    event.params.agreementId,
    event.params.provider,
    event.params.client
  );

  entity.agreement = agreement.id;
  entity.agreementGUID = event.params.agreementGUID;
  entity.agreementId = event.params.agreementId;
  entity.proposer = event.params.proposer;
  entity.provider = event.params.provider;
  entity.client = event.params.client;
  entity.contractURI = event.params.contractURI;
  entity.targetEndTimestamp = event.params.targetEndTimestamp;
  entity.streamToken = event.params.streamToken;
  entity.totalStreamedTokens = event.params.totalStreamedTokens;

  entity.terminationClauses_atWillDays =
    event.params.terminationClauses.atWillDays;
  entity.terminationClauses_cureTimeDays =
    event.params.terminationClauses.cureTimeDays;
  entity.terminationClauses_legalCompulsion =
    event.params.terminationClauses.legalCompulsion;
  entity.terminationClauses_moralTurpitude =
    event.params.terminationClauses.moralTurpitude;
  entity.terminationClauses_bankruptcyDissolutionInsolvency =
    event.params.terminationClauses.bankruptcyDissolutionInsolvency;
  entity.terminationClauses_counterpartyMalfeasance =
    event.params.terminationClauses.counterpartyMalfeasance;
  entity.terminationClauses_lostControlOfPrivateKeys =
    event.params.terminationClauses.lostControlOfPrivateKeys;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  agreement.allProposals.push(entity.id);
  agreement.lastProposer = event.params.proposer;
  agreement.agreementGUID = event.params.agreementGUID;
  agreement.agreementId = event.params.agreementId;
  agreement.currentProposal = entity.id;
  agreement.status = "PROPOSED";

  entity.save();
  agreement.save();
}

export function handleAgreementInitiated(event: AgreementInitiatedEvent): void {
  let agreementInitiatedEvent = new AgreementInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let agreement = getOrCreateAgreementEntity(
    event.params.agreementId,
    event.params.provider,
    event.params.client
  );

  agreementInitiatedEvent.agreement = agreement.id;
  agreementInitiatedEvent.contractooorAgreement =
    event.params.contractooorAgreement;
  agreementInitiatedEvent.streamId = event.params.streamId;

  agreementInitiatedEvent.blockNumber = event.block.number;
  agreementInitiatedEvent.blockTimestamp = event.block.timestamp;
  agreementInitiatedEvent.transactionHash = event.transaction.hash;

  agreement.status = "INITIATED";
  agreement.agreementAddress = event.params.contractooorAgreement;

  agreementInitiatedEvent.save();
  agreement.save();
}
