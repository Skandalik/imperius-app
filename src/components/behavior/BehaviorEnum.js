export const BehaviorConstants = {
    OPTION: 'option',
    INPUT: 'input',
    STATUS: 'status',
    ACTIVE: 'active',
    IS_ON: 'is on',
    IS_OFF: 'is off',
    NOT_EQUALS: 'not equals',
    EQUALS: 'equals',
    BIGGER_THAN: 'is bigger than',
    SMALLER_THAN: 'is smaller than',
    SET: 'set',
    TURN: 'turn',
    TURN_ON: 'turn on',
    TURN_OFF: 'turn off',
    ON: '1',
    OFF: '0',
};

export const BehaviorProperties = [
    {
        description: BehaviorConstants.ACTIVE,
        property: BehaviorConstants.ACTIVE,
    },
    {
        description: BehaviorConstants.STATUS,
        property: BehaviorConstants.STATUS,
    },
];

export const BehaviorArgumentsActive = [
    {
        description: BehaviorConstants.IS_ON,
        property: BehaviorConstants.ON,
    },
    {
        description: BehaviorConstants.IS_OFF,
        property: BehaviorConstants.OFF,
    },
];

export const BehaviorPredicates = [
    BehaviorConstants.EQUALS,
    BehaviorConstants.NOT_EQUALS,
    BehaviorConstants.BIGGER_THAN,
    BehaviorConstants.SMALLER_THAN,
];

export const BehaviorActionSet = [
    BehaviorConstants.SET,
];

export const BehaviorActionTurn = [
    {
        description: BehaviorConstants.TURN_ON,
        property: BehaviorConstants.ON
    },
    {
        description: BehaviorConstants.TURN_OFF,
        property: BehaviorConstants.OFF
    },
];
