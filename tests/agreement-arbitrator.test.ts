import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AgreementInitiated } from "../generated/schema"
import { AgreementInitiated as AgreementInitiatedEvent } from "../generated/AgreementArbitrator/AgreementArbitrator"
import { handleAgreementInitiated } from "../src/agreement-arbitrator"
import { createAgreementInitiatedEvent } from "./agreement-arbitrator-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let agreementGUID = Bytes.fromI32(1234567890)
    let contractooorAgreement = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let streamId = BigInt.fromI32(234)
    let newAgreementInitiatedEvent = createAgreementInitiatedEvent(
      agreementGUID,
      contractooorAgreement,
      streamId
    )
    handleAgreementInitiated(newAgreementInitiatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AgreementInitiated created and stored", () => {
    assert.entityCount("AgreementInitiated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AgreementInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "agreementGUID",
      "1234567890"
    )
    assert.fieldEquals(
      "AgreementInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractooorAgreement",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgreementInitiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "streamId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
