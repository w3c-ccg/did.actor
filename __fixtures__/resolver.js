const didKeyDriver = require("did-method-key").driver();

module.exports = async (did) => {
  if (did.startsWith("did:key:")) {
    const didDocument = await didKeyDriver.get({ did });
    return didDocument;
  }
  throw new Error("DID Method not supported by resolver");
};
