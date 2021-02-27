#### [View on GitHub](https://github.com/w3c-ccg/did.actor)

User Experience and Development Personas for Decentralized Identifiers and Verifiable Credentials.

🚧 `did:web` assumes that you trust / control the web hosting service.

This assumption might not be great for service provides who cannot be trusted to protect user privacy.

For example: `did:web:hospital.example:patients:123` is a terrible idea... this would allow the hospital to observe when the patient used their identity.

## Supply Chain Persons

See [supply-chain](./supply-chain)

## Healthcare

See [healthcare](./healthcare)

## Generic

### [Alice, did:web:did.actor:alice](./alice)

Example of a [revocation list maintained by alice](https://did.actor/alice/credentials/status/3.json)

### [Bob, did:web:did.actor:bob](./bob)

Example of a [credential issued by alice to bob](https://did.actor/bob/credentials/3732.json)

### [Carol, did:web:did.actor:carol](./carol)

### [Mike, did:web:did.actor:mike](./mike)

#### Motivation

It's often desirable to have Test DIDs that are readable, and that might have some additional context that is useful to lean on for development. By using github and did:web, we can provide such dids and everything needed to support them.

#### About DID Web

You can learn more about [did:web here.](https://did-web.web.app/)

Note that this demo uses experimental `did:web` functionality not currently supported by the Universal Resolver.

See:

- [web-did-resolver/issues/32](https://github.com/decentralized-identity/web-did-resolver/issues/32)
