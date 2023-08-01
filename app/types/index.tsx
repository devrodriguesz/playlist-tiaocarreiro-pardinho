interface Track {
    id: number;
    number: number;
    title: string;
    duration: number;
  }
  
  interface Album {
    id: number;
    name: string;
    year: string;
    tracks: Track[];
  }
  
  interface ApiResponse<T> {
    data: T;
  }
  