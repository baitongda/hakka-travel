/**
 *  ticket numbers filter
 *  @param {int} type 车票类型 0-正价票 1-优惠票
 *  @param {int} num 车票数量
 *  @param {int} price 票价
 */

 const booking = function(type, num, price) {

 	switch(type) {
 		case 0: 
	 		return num > 0? '正价票'+price+'元可预订': '已满座';
	 		break;
 		case 1: 
 			return num > 0? '优惠票'+price+'元可预订': '优惠票已抢完';
 			break;
 		default: 
 			break;
 	}
 }

 module.exports = booking;