const crypto = require('crypto');


function randomChallengeString() {
  let longString = '';
  for (let i = 0; i < 1000000; i += 1) {
    longString += Math.random().toString(36).substr(2, 1);
  }
  return longString;
}

(function doWork() {
  const challengeString = randomChallengeString();
  let nonce = 0;
  const startDate = new Date();
  let hash = crypto.createHash('sha256').update(challengeString + nonce).digest('hex');
  while (hash.substr(0, 3) !== '000') {
    hash = crypto.createHash('sha256').update(challengeString + nonce).digest('hex');
    nonce += 1;
  }
  const endDate = new Date();
  console.log('Found the answer');
  console.log(`The answer is ${nonce} with a final hash of ${hash}`);
  console.log(`${(endDate - startDate) / 1000} seconds to complete`);
}());
