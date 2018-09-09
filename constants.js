const CUSTOMER_ELIGIBLE = 'CUSTOMER_ELIGIBLE';
const CUSTOMER_INELIGIBLE = 'CUSTOMER_INELIGIBLE';
const TECHNICAL_FAILURE = 'TECHNICAL_FAILURE';
const INVALID_ACCOUNT_NUMBER = 'INVALID_ACCOUNT_NUMBER';
const SPORTS_CHANNEL = 'SPORTS';
const KIDS_CHANNEL = 'KIDS';
const MUSIC_CHANNEL = 'MUSIC';
const NEWS_CHANNEL = 'NEWS';
const MOVIES_CHANNEL = 'MOVIES';
const CHAMPIONS_LEAGUE_TICKET = 'CHAMPIONS_LEAGUE_FINAL_TICKET';
const KARAOKE_PRO_MICROPHONE = 'KARAOKE_PRO_MICROPHONE';
const PIRATES_OF_THE_CARIBBEAN = 'PIRATES_OF_THE_CARIBBEAN_COLLECTION';

const rewardMappings = {
    [SPORTS_CHANNEL]: [CHAMPIONS_LEAGUE_TICKET],
    [KIDS_CHANNEL]: [],
    [MUSIC_CHANNEL]: [KARAOKE_PRO_MICROPHONE],
    [NEWS_CHANNEL]: [],
    [MOVIES_CHANNEL]: [PIRATES_OF_THE_CARIBBEAN],
};

const mockEligibileCustomerService = () => CUSTOMER_ELIGIBLE;
const mockIneligibileCustomerService = () => CUSTOMER_INELIGIBLE;
const mockTechnicalExceptionCustomerService = () => {
    throw new Error(TECHNICAL_FAILURE);
};
const mockInvalidAccountExceptionCustomerService = () => {
    throw new Error(INVALID_ACCOUNT_NUMBER);
};

module.exports = {
    CUSTOMER_ELIGIBLE,
    CUSTOMER_INELIGIBLE,
    TECHNICAL_FAILURE,
    INVALID_ACCOUNT_NUMBER,
    SPORTS_CHANNEL,
    KIDS_CHANNEL,
    MUSIC_CHANNEL,
    NEWS_CHANNEL,
    MOVIES_CHANNEL,
    CHAMPIONS_LEAGUE_TICKET,
    KARAOKE_PRO_MICROPHONE,
    PIRATES_OF_THE_CARIBBEAN,
    rewardMappings,
    mockEligibileCustomerService,
    mockIneligibileCustomerService,
    mockTechnicalExceptionCustomerService,
    mockInvalidAccountExceptionCustomerService,
};
