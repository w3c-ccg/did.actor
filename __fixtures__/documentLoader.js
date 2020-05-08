const jsonld = require("jsonld");
const resolver = require("./resolver");
const documentLoader = jsonld.documentLoaders.node();

const wrappedDocumentLoader = async (url) => {
  // console.log(url);

  // Resolve DIDs
  if (url.startsWith("did:key")) {
    const didDoc = await resolver(url);
    return {
      contextUrl: null,
      documentUrl: url,
      document: didDoc,
    };
  }

  if (url.startsWith("did:web:did.actor:alice")) {
    return {
      contextUrl: null,
      documentUrl: url,
      document: require(`../alice/did.json`),
    };
  }

  // Resolve Contexts
  if (url.startsWith("https://w3id.org/did/v0.11")) {
    return documentLoader("https://w3id.org/did/v0.11");
  }

  if (url.startsWith("https://www.w3.org/2018/credentials/v1")) {
    return documentLoader("https://www.w3.org/2018/credentials/v1");
  }

  if (url.startsWith("https://www.w3.org/2018/credentials/examples/v1")) {
    return documentLoader("https://www.w3.org/2018/credentials/examples/v1");
  }

  if (url.startsWith("https://w3id.org/vc-revocation-list-2020/v1")) {
    return documentLoader("https://w3id.org/vc-revocation-list-2020/v1");
  }

  if (url.startsWith("https://www.w3.org/ns/odrl.jsonld")) {
    return documentLoader("https://www.w3.org/ns/odrl.jsonld");
  }
};

module.exports = wrappedDocumentLoader;
