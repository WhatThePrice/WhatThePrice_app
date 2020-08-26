export const NAME = "PROFILE";

export const UPGRADE = `${NAME}/UPGRADE`;
export const UPGRADE_SUCCESS = `${NAME}/UPGRADE_SUCCESS`;
export const UPGRADE_FAIL = `${NAME}/UPGRADE_FAIL`;
export const RESET_UPGRADE = `${NAME}/RESET_UPGRADE`;

export const getUpgradeData = store => store[NAME].upgrade;

export const upgrade = data => ({
    type: UPGRADE,
    data
});

export const upgradeSuccess = data => ({
    type: UPGRADE_SUCCESS,
    data
});

export const upgradeFail = error => ({
    type: UPGRADE_FAIL,
    error
});

export const resetUpgrade = () => ({
    type: RESET_UPGRADE
});
