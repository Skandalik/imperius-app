export const BehaviorConstants = {
    STATUS: 'status',
    ACTIVE: 'active',
    NOT_EQUALS: 'not equals',
    EQUALS: 'equals',
    BIGGER_THAN: 'is bigger than',
    SMALLER_THAN: 'is smaller than',
    SET: 'set',
    TURN: 'turn',
    ON: '1',
    OFF: '0',
};

export const PredicatesOptions = [
    {
        optionValue: 'is on',
        type: 'option',
        property: BehaviorConstants.ACTIVE,
        predicate: BehaviorConstants.EQUALS,
        argument: BehaviorConstants.ON
    },
    {
        optionValue: 'is off',
        type: 'option',
        property: BehaviorConstants.ACTIVE,
        predicate: BehaviorConstants.EQUALS,
        argument: BehaviorConstants.OFF
    },
    {
        optionValue: 'status is bigger than',
        type: 'input',
        property: BehaviorConstants.STATUS,
        predicate: BehaviorConstants.BIGGER_THAN,
        argument: ''
    },
    {
        optionValue: 'status is less than',
        type: 'input',
        property: BehaviorConstants.STATUS,
        predicate: BehaviorConstants.SMALLER_THAN,
        argument: ''
    },
    {
        optionValue: 'status equals',
        type: 'input',
        property: BehaviorConstants.STATUS,
        predicate: BehaviorConstants.EQUALS,
        argument: ''
    },
    {
        optionValue: 'status not equals',
        type: 'input',
        property: BehaviorConstants.STATUS,
        predicate: BehaviorConstants.NOT_EQUALS,
        argument: ''
    },
];

export const ActionOptions = [
    {
        optionValue: 'set on',
        type: 'option',
        property: BehaviorConstants.ACTIVE,
        action: BehaviorConstants.SET,
        argument: BehaviorConstants.ON
    },
    {
        optionValue: 'set off',
        type: 'option',
        property: BehaviorConstants.ACTIVE,
        action: BehaviorConstants.SET,
        argument: BehaviorConstants.OFF
    },
    {
        optionValue: 'set status',
        type: 'input',
        property: BehaviorConstants.STATUS,
        action: BehaviorConstants.SET,
        argument: ''
    },
];