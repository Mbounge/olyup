import { Athletic } from '../athletic';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of an athletic
  const athletic = Athletic.build({
    discipline: 'Hockey',
    type: 'Coach',
  });
  // save the athletic to the db
  await athletic.save();

  // fetch the athletic twice
  const firstInstance = await Athletic.findById(athletic.id);
  const secondInstance = await Athletic.findById(athletic.id);

  // make separate changes to the athletic we fetched
  // When we fetch this athletic, it has a version flag of 1
  firstInstance!.set({ price: 30 });
  secondInstance!.set({ price: 50 });

  // save the first fetched athletic
  await firstInstance!.save();

  // save the second fetched athletic and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('This should not reach this point!');
});

it('increments the version number on multiple saves', async () => {
  const athletic = Athletic.build({
    discipline: 'Hockey',
    type: 'Coach',
  });

  await athletic.save();
  expect(athletic.version).toEqual(0);
  await athletic.save();
  expect(athletic.version).toEqual(1);
  await athletic.save();
  expect(athletic.version).toEqual(2);
});
