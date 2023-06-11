import { Address, BigInt, Bytes, crypto, log } from "@graphprotocol/graph-ts";
import {
  AgreementInitiated as AgreementInitiatedEvent,
  AgreementProposed as AgreementProposedEvent,
} from "../generated/AgreementArbitrator/AgreementArbitrator";
import {
  Agreement,
  AgreementInitiated,
  AgreementProposed,
  UserPair,
} from "../generated/schema";

export function getOrCreateUserPairEntity(
  provider: Address,
  client: Address
): UserPair {
  const hashConcat = provider.concat(client);

  let id = Bytes.fromByteArray(crypto.keccak256(hashConcat));

  let userPair = UserPair.load(id);
  log.info("found: {}", [!!userPair ? "true" : "false"]);
  log.info("provider: {}", [provider.toHex()]);
  log.info("client: {}", [client.toHex()]);
  log.info("id: {}", [id.toHex()]);

  if (userPair == null) {
    userPair = new UserPair(id);
    userPair.agreementCount = 0;
  }

  return userPair;
}

export function getOrCreateAgreementEntity(
  provider: Address,
  client: Address,
  agreementNonce: BigInt
): Agreement {
  let id = Bytes.fromByteArray(
    crypto.keccak256(
      Bytes.fromBigInt(agreementNonce)
        .concat(provider)
        .concat(client)
    )
  );

  let agreement = Agreement.load(id);
  if (agreement) log.info("agreement: {}", [agreement.id.toHex()]);
  else log.info("agreement: {}", ["null"]);

  if (agreement == null) {
    agreement = new Agreement(id);
    let userPair = getOrCreateUserPairEntity(provider, client);
    log.info("nonce: {}", [agreementNonce.toString()]);
    userPair.agreementCount = userPair.agreementCount + 1;
    userPair.save();
  }

  return agreement;
}

export function handleAgreementProposed(event: AgreementProposedEvent): void {
  let agreementProposedEvent = new AgreementProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let agreement = getOrCreateAgreementEntity(
    event.params.provider,
    event.params.client,
    event.params.agreementNonce
  );

  agreementProposedEvent.agreement = agreement.id;
  agreementProposedEvent.agreementHash = event.params.agreementHash;
  agreementProposedEvent.agreementNonce = event.params.agreementNonce;
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

  agreement.provider = event.params.provider;
  agreement.client = event.params.client;
  agreement.agreementNonce = event.params.agreementNonce;
  agreement.status = "PROPOSED";
  agreement.agreementHash = event.params.agreementHash;
  agreement.agreementNonce = event.params.agreementNonce;
  agreement.provider = event.params.provider;
  agreement.client = event.params.client;
  agreement.contractURI = event.params.contractURI;
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
    event.params.provider,
    event.params.client,
    event.params.agreementNonce
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
