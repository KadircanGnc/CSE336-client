export type PaginatedResponse<T> = {
  content: T[];
  total: number;
  page: number;
}

export type GetBoardings_WC_MLS_Response = {
  id: string;
  passengerId: string;
  passengerType: string;
  boardingTime: number;
  busStopId: string;
  latitude: number;
  longitude: number;
  tripId: string;
  boardingType: BoardingType;
}

export type BoardingType = {
  id: string;
  name: string;
}