const promiseAll = async (promises) => {
  const results = [];
  for (const promise of promises) {
    if (typeof promise.then === 'function') {
      results.push(await promise);
    } else {
      results.push(promise);
    }
  }
  return results;
}

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      if (typeof promise.then === 'function') {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    }
  });
}

// Kod testowy.
promiseAll([]).then(result => {
  console.log('PromiseAll: To powinien być []:', JSON.stringify(result));
});

promiseAll([futureSuccess(1), futureSuccess(2), futureSuccess(3)]).then(result => {
  console.log('PromiseAll: To powinien być [1, 2, 3]:', result);
});

promiseAll([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('PromiseAll: WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('PromiseAll: Coś poszło nie tak..:', error);
    }
    console.log('PromiseAll: To powinien być X:', error);
  });

promiseRace([1, 2, 3]).then(result => {
  console.log('PromiseRace: This should be 1:', result);
});

const now = performance.now();
promiseRace([delayedSuccess(1, 300), delayedSuccess(2, 200), delayedSuccess(3, 100)]).then(result => {
  const after = performance.now();
  const diff = after - now;
  if (diff < 100) {
    throw 'PromiseRace: Za szybko!'
  }
  if (diff >= 200) {
    throw 'PromiseRace: Za wolno!'
  }
  console.log('PromiseRace: To powinno być 3:', result);
});

promiseRace([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('PromiseRace: WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('PromiseRace: Coś poszło nie tak..:', error);
    }
    console.log('PromiseRace: To powinien być X:', error);
  });

function futureSuccess(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
};

function delayedSuccess(val, time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), time);
  });
};