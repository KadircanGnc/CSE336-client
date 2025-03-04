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
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};

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
};

export type BoardingType = {
  id: string;
  name: string;
};

export type CreateBoarding_WC_MLS_Request = {
  passengerId: string;
  passengerType: string;
  boardingTime: number;
  busStopId: string;
  latitude: number;
  longitude: number;
  tripId: string;
  boardingTypeName: string;
};

export type GetBoardingTypes_WC_MLS_Response = {
  id: string;
  name: string;
};

export type CreateBoardingType_WC_MLS_Request = {
  name: string;
};

export type CreateBusStop_WC_MLS_Request = {
  stopName: string;
  latitude: number;
  longitude: number;
};

export type GetBusStops_WC_MLS_Response = {
  id: string;
  stopName: string;
  latitude: number;
  longitude: number;
};

export type GetLines_WC_MLS_Response = {
  id: string;
  lineCode: string;
  lineCodeRepresentation: string;
};

export type CreateLine_WC_MLS_Request = {
  lineCode: string;
  lineCodeRepresentation: string;
};
