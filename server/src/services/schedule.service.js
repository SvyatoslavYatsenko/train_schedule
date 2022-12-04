
export const handleObjectKeys = (newSchedule) => {
    const route = [newSchedule.route_from, '-', newSchedule.route_to];
    delete newSchedule.route_from;
    delete newSchedule.route_to;
    newSchedule.route = route.join('') 

    return newSchedule;
}

export const deleteSpasesInValues = (newSchedule) => {
    Object.keys(newSchedule).forEach(key => newSchedule[key] = newSchedule[key].trim());
    return newSchedule;
}

