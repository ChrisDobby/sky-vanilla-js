const rewardsService = require('./redeemService');
const constants = require('./constants');

describe('redeemService', function () {
    const eligibleCustomerWithChannels = channels => ({
        customerAccountNumber: 1,
        portfolio: {
            channels,
        },
        eligibilityService: constants.mockEligibileCustomerService,
    });

    it('should return no rewards for an ineligible customer', () => {
        const params = {
            customerAccountNumber: 1,
            portfolio: {
                channels: [],
            },
            eligibilityService: constants.mockIneligibileCustomerService,
        };

        const rewards = rewardsService(params);

        expect(rewards.data).toEqual([]);
    });

    it('should return no rewards for a technical failure', () => {
        const params = {
            customerAccountNumber: 1,
            portfolio: {
                channels: [],
            },
            eligibilityService: constants.mockTechnicalExceptionCustomerService,
        };

        const rewards = rewardsService(params);

        expect(rewards.data).toEqual([]);
    });

    it('should return no rewards and set invalid customer account number for an invalid account number', () => {
        const params = {
            customerAccountNumber: 1,
            portfolio: {
                channels: [],
            },
            eligibilityService: constants.mockInvalidAccountExceptionCustomerService,
        };

        const rewards = rewardsService(params);

        expect(rewards.data).toEqual([]);
        expect(rewards.invalidCustomerAccount).toBeTruthy();
    });

    it('should return a champions league ticket reward for a sports channel only subscriber', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([constants.SPORTS_CHANNEL]));

        expect(rewards.data.length).toBe(1);
        expect(rewards.data[0]).toBe(constants.CHAMPIONS_LEAGUE_TICKET);
    });

    it('should return no rewards for a kids channel only subscriber', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([constants.KIDS_CHANNEL]));

        expect(rewards.data.length).toBe(0);
    });

    it('should return a karaoke microphone for a music channel only subscriber', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([constants.MUSIC_CHANNEL]));

        expect(rewards.data.length).toBe(1);
        expect(rewards.data[0]).toBe(constants.KARAOKE_PRO_MICROPHONE);
    });

    it('should return no rewards for a news channel only subscriber', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([constants.NEWS_CHANNEL]));

        expect(rewards.data.length).toBe(0);
    });

    it('should return a pirates of the caribbean collection for a movie channel only subscriber', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([constants.MOVIES_CHANNEL]));

        expect(rewards.data.length).toBe(1);
        expect(rewards.data[0]).toBe(constants.PIRATES_OF_THE_CARIBBEAN);
    });

    it('should return all rewards for a subscriber to all channels', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels([
            constants.SPORTS_CHANNEL,
            constants.KIDS_CHANNEL,
            constants.MUSIC_CHANNEL,
            constants.NEWS_CHANNEL,
            constants.MOVIES_CHANNEL,
        ]));

        expect(rewards.data.length).toBe(3);
        expect(rewards.data).toContain(constants.CHAMPIONS_LEAGUE_TICKET);
        expect(rewards.data).toContain(constants.KARAOKE_PRO_MICROPHONE);
        expect(rewards.data).toContain(constants.PIRATES_OF_THE_CARIBBEAN);
    });

    it('should return no rewards for a subscriber to an unknown channel', () => {
        const rewards = rewardsService(eligibleCustomerWithChannels(['HISTORY']));

        expect(rewards.data.length).toBe(0);
    });
});
