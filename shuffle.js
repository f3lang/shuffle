/**
 * Create a reproducible shuffle of a deck of 10 cards.
 * The amount of available shuffles in a 10 card deck is 10!
 * This class will map any of those 3628800 possible card shuffles
 * to one distinctive shuffle.
 * This class is optimized for a deck of ten cards and will only work
 * with a deck of ten cards.
 */
class Shuffle {

	constructor(numberOfCards) {
		this.f = [];
		this.sourcePositions = [];
		this.numberOfCards = numberOfCards * 1;
		while(numberOfCards--) {
			this.f[numberOfCards] = Shuffle.factorial(numberOfCards);
			this.sourcePositions.push(numberOfCards);
		}
	}

	static factorial(count){
		let fl = count;
		while (count-- > 1) {
			fl = fl * count;
		}
		return fl;
	}

	/**
	 * Will return a shuffle map. e.g. [8,9,7,6,4,5,3,2,1,0]
	 * @param nonce The random value between 0 and 3628799
	 * @return {Array} A shuffled array of indices
	 */
	getShuffle(nonce) {
		let orderMap = this.generateOrderMap(nonce);
		return this.generateCardOrder(orderMap);
	}

	generateOrderMap(nonce) {
		let orderMap = [];
		let c = nonce;
		let numberOfCards = this.numberOfCards*1;
		while (numberOfCards-- > 1) {
			orderMap.push(Math.floor(c / f[numberOfCards]));
			c = c % this.f[numberOfCards];
		}
		orderMap.push(c);
		return orderMap;
	}

	generateCardOrder(orderMap) {
		let positions = this.sourcePositions.slice();
		for (let i = 0; i < orderMap.length; i++) {
			if (orderMap[i]) {
				let targetNumber = positions[orderMap[i] + i];
				positions.splice(orderMap[i] + i, 1);
				positions.splice(i, 0, targetNumber);
			}
		}
		return positions;
	}

}

module.exports = Shuffle;