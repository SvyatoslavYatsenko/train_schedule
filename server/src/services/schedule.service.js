
export const handleObjectKeys = (newSchedule) => {
    const route = [newSchedule.route_from, '-', newSchedule.route_to];
    delete newSchedule.route_from;
    delete newSchedule.route_to;
    newSchedule.route = route.join('') 

    return newSchedule;
}

export const deleteSpasesInValues = (newSchedule) => {
    Object.keys(newSchedule).forEach(key => {
        if(typeof newSchedule[key] === 'string'){
            newSchedule[key] = newSchedule[key].trim()
        }
    });
    return newSchedule;
}

