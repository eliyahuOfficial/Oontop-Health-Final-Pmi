///csvUtils.ts
export const convertToCSV = (obj: Record<string, any>): string => {
    const keys = Object.keys(obj).join(',');
    const values = Object.values(obj).map(value => `"${value}"`).join(',');
    return `${keys}\n${values}`;
};