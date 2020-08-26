export const NAME = "PROFILE";

export const DOWNGRADE = `${NAME}/DOWNGRADE`;
export const DOWNGRADE_SUCCESS = `${NAME}/DOWNGRADE_SUCCESS`;
export const DOWNGRADE_FAIL = `${NAME}/DOWNGRADE_FAIL`;
export const RESET_DOWNGRADE = `${NAME}/RESET_DOWNGRADE`;

export const getDowngradeData = store => store[NAME].downgrade;

export const downgrade = data => ({
    type: DOWNGRADE,
    data
});

export const downgradeSuccess = data => ({
    type: DOWNGRADE_SUCCESS,
    data
});

export const downgradeFail = error => ({
    type: DOWNGRADE_FAIL,
    error
});

export const resetDowngrade = () => ({
    type: RESET_DOWNGRADE
});
