export function sortByDate<T>(items: T[], prop: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    const sortOrder = order === 'asc' ? -1 : 1;
    return items.sort((a, b) => {
        const dateA = new Date(a[prop] as unknown as string).getTime();
        const dateB = new Date(b[prop] as unknown as string).getTime();
        return sortOrder * (dateB - dateA);
    });
}

export function sortByNumber<T>(items: T[], prop: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    const sortOrder = order === 'asc' ? -1 : 1;
    return items.sort((a, b) => {
        const numA = Number(a[prop]);
        const numB = Number(b[prop]);
        return sortOrder * (numB - numA);
    });
}

export function sortByString<T>(items: T[], prop: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    const sortOrder = order === 'asc' ? 1 : -1;
    return items.sort((a, b) => {
        const stringA = String(a[prop]);
        const stringB = String(b[prop]);
        return sortOrder * stringA.localeCompare(stringB);
    });
}
