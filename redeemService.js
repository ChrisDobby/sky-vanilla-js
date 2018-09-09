const constants = require('./constants');

function rewardsService({
    customerAccountNumber,
    portfolio,
    eligibilityService
}) {
    const rewards = channel => (
        typeof constants.rewardMappings[channel] === 'undefined'
            ? []
            : constants.rewardMappings[channel]);

    const emptyData = { data: [] };
    try {
        const eligibility = eligibilityService(customerAccountNumber);
        if (eligibility === constants.CUSTOMER_INELIGIBLE) { return emptyData; }

        return Object.assign(
            emptyData,
            {
                data: [].concat.apply([], portfolio.channels.map(rewards)),
            });
    } catch (err) {
        if (err.message === constants.INVALID_ACCOUNT_NUMBER) {
            return Object.assign(emptyData, { invalidCustomerAccount: true });
        }

        return emptyData;
    }
}

module.exports = rewardsService;
