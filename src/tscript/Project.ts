interface AllProjectData {
    customerName: string;
    name: string;
    code: string;
    status: number;
    pms: string[];
    activeMember: number;
    projectType: number;
    timeStart: string;
    timeEnd: string;
    id: number;
  }
  interface Result {
    customerName: string;
    data: {
      name: string;
      code: string;
      status: number;
      pms: string[];
      activeMember: number;
      projectType: number;
      timeStart: string;
      timeEnd: string;
      id: number;
    }[];
  }
  interface Customer{
    name: string;
    id: number
  }
export type{AllProjectData, Result, Customer}