describe('header test', function () {
  test('add: 1 + 2 = 3', () => {
      class TestHeader {
          public test() {}
      }
      const testInstance = new TestHeader()
      testInstance.test()
    expect(testInstance.constructor === TestHeader).toBe(true);
  });
})

