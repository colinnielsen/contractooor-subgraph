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
  let id = Bytes.fromByteArray(
    crypto.keccak256(
      ByteArray.fromUTF8(
        agreementId
          .toHex()
          .concat(provider.toHex())
          .concat(client.toHex())
      )
    )
  );

  let agreement = Agreement.load(id);

  if (agreement == null) {
    agreement = new Agreement(id);
    agreement.agreementId = agreementId;
    agreement.provider = provider;
    agreement.client = client;
  }

  return agreement;
}

export function handleAgreementProposed(event: AgreementProposedEvent): void {
  let agreementProposedEvent = new AgreementProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let agreement = getOrCreateAgreementEntity(
    event.params.agreementId,
    event.params.provider,
    event.params.client
  );

  agreementProposedEvent.agreement = agreement.id;
  agreementProposedEvent.agreementGUID = event.params.agreementGUID;
  agreementProposedEvent.agreementId = event.params.agreementId;
  agreementProposedEvent.proposer = event.params.proposer;
  agreementProposedEvent.provider = event.params.provider;
  agreementProposedEvent.client = event.params.client;
  agreementProposedEvent.contractURI = event.params.contractURI;
  agreementProposedEvent.targetEndTimestamp = event.params.targetEndTimestamp;
  agreementProposedEvent.streamToken = event.params.streamToken;
  agreementProposedEvent.totalStreamedTokens = event.params.totalStreamedTokens;

  agreementProposedEvent.terminationClauses_atWillDays =
    event.params.terminationClauses.atWillDays;
  agreementProposedEvent.terminationClauses_cureTimeDays =
    event.params.terminationClauses.cureTimeDays;
  agreementProposedEvent.terminationClauses_legalCompulsion =
    event.params.terminationClauses.legalCompulsion;
  agreementProposedEvent.terminationClauses_moralTurpitude =
    event.params.terminationClauses.moralTurpitude;
  agreementProposedEvent.terminationClauses_bankruptcyDissolutionInsolvency =
    event.params.terminationClauses.bankruptcyDissolutionInsolvency;
  agreementProposedEvent.terminationClauses_counterpartyMalfeasance =
    event.params.terminationClauses.counterpartyMalfeasance;
  agreementProposedEvent.terminationClauses_lostControlOfPrivateKeys =
    event.params.terminationClauses.lostControlOfPrivateKeys;

  agreementProposedEvent.blockNumber = event.block.number;
  agreementProposedEvent.blockTimestamp = event.block.timestamp;
  agreementProposedEvent.transactionHash = event.transaction.hash;

  agreement.status = "PROPOSED";
  agreement.agreementGUID = event.params.agreementGUID;
  agreement.agreementId = event.params.agreementId;
  agreement.provider = event.params.provider;
  agreement.client = event.params.client;
  agreement.currentProposal = agreementProposedEvent.id;
  agreement.lastProposer = event.params.proposer;

  agreementProposedEvent.save();
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
  agreementInitiatedEvent.provider = event.params.provider;
  agreementInitiatedEvent.client = event.params.client;
  agreementInitiatedEvent.contractooorAgreement =
    event.params.contractooorAgreement;
  agreementInitiatedEvent.streamId = event.params.streamId;

  agreementInitiatedEvent.blockNumber = event.block.number;
  agreementInitiatedEvent.blockTimestamp = event.block.timestamp;
  agreementInitiatedEvent.transactionHash = event.transaction.hash;

  agreement.status = "ACCEPTED";
  agreement.agreementAddress = event.params.contractooorAgreement;
  agreement.streamId = event.params.streamId;

  agreementInitiatedEvent.save();
  agreement.save();
}
