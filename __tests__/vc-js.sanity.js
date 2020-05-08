const jsigs = require("jsonld-signatures");
const { Ed25519KeyPair } = require("crypto-ld");
const vc = require("vc-js");

const rl = require("vc-revocation-list");

const documentLoader = require("../__fixtures__/documentLoader");

const aliceUnlockedDID = require("../alice/did.unlocked.json");

const { Ed25519Signature2018 } = jsigs.suites;
const { AssertionProofPurpose } = jsigs.purposes;

const key = new Ed25519KeyPair(aliceUnlockedDID.publicKey[0]);

const suite = new Ed25519Signature2018({
  key,
  date: "2019-12-11T03:50:55Z",
});

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1",
    "https://w3id.org/vc-revocation-list-2020/v1",
  ],
  id: "https://did.actor/bob/credentials/3732.json",
  type: ["VerifiableCredential", "UniversityDegreeCredential"],
  issuer: "did:web:did.actor:alice",
  issuanceDate: "2020-03-10T04:24:12.164Z",
  credentialStatus: {
    id: "https://did.actor/alice/credentials/status/3.json#94567",
    type: "RevocationList2020Status",
    revocationListIndex: "94567",
    revocationListCredential:
      "https://did.actor/alice/credentials/status/3.json",
  },
  credentialSubject: {
    id: "did:web:did.actor:bob",
    degree: {
      type: "BachelorDegree",
      name: "Bachelor of Science and Arts",
    },
  },
};

jest.setTimeout(20 * 1000);

const CONTEXTS = {
  VC_V1: "https://www.w3.org/2018/credentials/v1",
  RL_V1: "https://w3id.org/vc-revocation-list-2020/v1",
};

describe("vc-js sanity", () => {
  it("sign and verify", async () => {
    let verifiableCredential = await vc.issue({
      credential: { ...credential },
      suite,
      documentLoader,
    });
    // console.log(verifiableCredential);
    let verification = await vc.verifyCredential({
      credential: verifiableCredential,
      purposes: new AssertionProofPurpose(),
      suite,
      documentLoader,
    });
    expect(verification.verified).toBe(true);
  });
  it("sign and verify", async () => {
    const id = "https://did.actor/alice/credentials/status/3.json";
    const list = await rl.createList({ length: 100000 });
    const encodedList = await list.encode();
    const rlCredential = {
      "@context": [CONTEXTS.VC_V1, CONTEXTS.RL_V1],
      id,
      issuer: "did:web:did.actor:alice",
      issuanceDate: "2020-03-10T04:24:12.164Z",
      type: ["VerifiableCredential", "RevocationList2020Credential"],
      credentialSubject: {
        id: `${id}#list`,
        type: "RevocationList2020",
        encodedList,
      },
    };
    let verifiableCredential = await vc.issue({
      credential: { ...rlCredential },
      suite,
      documentLoader,
    });
    // console.log(verifiableCredential);
  });
});
