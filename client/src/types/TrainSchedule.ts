export type ScheduleItemTypeFromServer = {
  id: number,
  number: number,
  route: string,
  periodicity: string,
  station: string,
  arrival: string,
  departure: string,
  terminal: string,
  createdAt: Date,
  updatedAt: Date
};

export type ScheduleItemTypeToServer = {
  number: number,
  route_from: string,
  route_to: string,
  periodicity: string,
  station: string,
  arrival: string,
  departure: string,
  terminal: string,
}

