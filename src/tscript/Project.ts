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
export const dataBranch = [
  { branch: 0, name: "Ha Noi" },
  { branch: 1, name: "Da Nang" },
  { branch: 2, name: "HCM" },
  { branch: 3, name: "Vinh" },
]
export const dataMembers = [
  { type: 0, name: "Staff" },
  { type: 1, name: "Internship" },
  { type: 2, name: "Collaborator" },
]
export const checkBranch = (branch: number | null): string => {
  if (branch || branch === 0) {
    const data = dataBranch.filter((item) => item.branch === branch);
    return data[0].name;
  }
  return "";
};
export const checkTypeMember = (type: number | null): string => {
  if (type || type === 0) {
    const data = dataMembers.filter((item) => item.type === type);
    return data[0].name;
  }
  return "";
};
interface UserNotPagging {
  name: string;
  isActive: boolean;
  type: number;
  jobTitle: string;
  level: number;
  userCode: string;
  avatarPath: string;
  branch: number;
  id: number;
}

interface DataFilterUser {
  branch: {
    index: number;
  };
  type: {
    index: number;
  };
  level: {
    index: number;
  };
  name: {
    nameString: string;
  };
}
export type{AllProjectData, Result, Customer, UserNotPagging, DataFilterUser} 