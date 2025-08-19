export function sortUsers(users) {
    return [...users].sort((a, b) => {
        const pointsDiff = b.points - a.points;
        if (pointsDiff !== 0) return pointsDiff;
        return a.name.localeCompare(b.name);
    });
}