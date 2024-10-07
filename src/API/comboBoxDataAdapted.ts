import { getUsers, getRoles, getActions } from '@/API/fetchData.ts';

export const fetchDataForUserComboBox = async (token: string) => {

    try {

        const users = await getUsers(token);

        const data = users.map((user: any) => ({
            textValue: user.name,
            idValue: user._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching users from comboBox:', e);
    }

}

export const fetchDataForRoleComboBox = async (token: string) => {

    try {

        const roles = await getRoles(token);

        const filteredRoles = roles.filter((role: any) => role.enabled === true);
        const data = filteredRoles.map((role: any) => ({
            textValue: role.name,
            idValue: role._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching roles from comboBox:', e);
    }

}

export const fetchDataForActionsComboBox = async (token: string) => {

    try {

        const actions = await getActions(token);
        const filteredActions = actions.filter((action: any) => action.enabled === true);

        const data = filteredActions.map((action: any) => ({
            textValue: action.name,
            idValue: action._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching actions from comboBox:', e);
    }

}