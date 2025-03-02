export type PaginatedResponse<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number; 
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  }
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
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