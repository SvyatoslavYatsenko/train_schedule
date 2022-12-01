export const removeScheduleItem = async (itemId: number) => {
    await fetch(`http://localhost:3001/schedule/${itemId}`, {
        method: 'DELETE'});
};

export const editScheduleItem = async (itemId: number) => {
    await fetch(`http://localhost:3001/schedule/${itemId}`, {
        method: 'PATCH'});
};
