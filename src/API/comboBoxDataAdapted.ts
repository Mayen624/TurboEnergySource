import { getUsers, getRoles } from '@/API/fetchData.ts';

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

        const data = roles.map((role: any) => ({
            textValue: role.name,
            idValue: role._id,
        }));

        return data;

    } catch (e) {
        console.error('Error fetching roles from comboBox:', e);
    }

}