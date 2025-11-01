import { getUsers, getRoles, getActions } from '@/API/fetchData.ts';

export const fetchDataForUserComboBox = async () => {

    try {

        const users = await getUsers();

        const data = users.map((user: any) => ({
            textValue: user.name,
            idValue: user._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching users from comboBox:', e);
    }

}

export const fetchDataForRoleComboBox = async () => {

    try {

        const rolesData = await getRoles();

        const filteredRoles = rolesData.roles.filter((role: any) => role.enabled === true);
        const data = filteredRoles.map((role: any) => ({
            textValue: role.name,
            idValue: role._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching roles from comboBox:', e);
    }

}

export const fetchDataForActionsComboBox = async () => {

    try {

        const actionsData = await getActions();
        const filteredActions = actionsData.actions.filter((action: any) => action.enabled === true);

        const data = filteredActions.map((action: any) => ({
            textValue: action.name,
            idValue: action._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching actions from comboBox:', e);
    }

}