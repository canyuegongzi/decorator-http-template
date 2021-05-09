import Qs from 'qs';

function httpTransformRequest(data: any) {
    return Qs.stringify(data);
}
describe('http create instance', function () {
  test('add: 1 + 2 = 3', () => {
    expect(1 + 2).toBe(3);
  });
})

