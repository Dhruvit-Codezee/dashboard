import { pickBy } from "lodash";

export const filterChangedFormFields = (
    allFields,
    dirtyFields
) => {
    const changedFieldValues = Object.keys(pickBy(dirtyFields)).reduce(
        (acc, currentField) => {
            return {
                ...acc,
                [currentField]: allFields[currentField],
            };
        },
        {}
    );

    return changedFieldValues;
};