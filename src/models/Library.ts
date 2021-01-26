export interface Image {
  url: string;
  title: string;
}

export interface Address {
  street: string;
  comment: string;
  fullAddress: string;
}

export interface Phone {
  value: number;
  comment: string;
}

export interface Tag {
  id: number;
  name: string;
  sysName: string;
}

export interface Library {
  _id: string;
  nativeId: string;
  data: {
    info: unknown;
    general: {
      id: number;
      name: string;
      description: string;
      status: string;
      address: Address;
      contacts: {
        website: 'string';
        email: string;
        phones: Phone[];
      };
      gallery?: Image[];
      image?: Image;
      tags: Tag[];
      workingSchedule: {
        [key: string]: {
          from: string;
          to: string;
        }
      };
    };
  };
}
