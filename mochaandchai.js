var expect = chai.expect;

describe("War Game", function() {
  describe('playWar', function() {
    it('the game should start', function() {
      var x = playWar();
      expect(x).to.equal('the start of the game')
    })
  })
})