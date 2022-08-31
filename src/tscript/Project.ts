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
interface TaskFormNewProject {
  taskId: number;
  billable: boolean;
  id?: number;
}
interface PayLoadNewProject{
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: string;
  projectType: number;
  customerId: number;
  tasks: TaskFormNewProject[];
  users: UserFormNewProject[];
  projectTargetUsers: [];
  isAllUserBelongTo: boolean;
  id: number;

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
export const deleteArrInArrById = (
  arrayNeedDelete: UserNotPagging[],
  array: UserNotPagging[] | null
) => {
  if (!arrayNeedDelete || !array) return null;
  return arrayNeedDelete.filter((itemOfArrayNeedDelete) => {
    let result = true;
    for (let itemOfArray of array) {
      if (itemOfArray.id === itemOfArrayNeedDelete.id) result = false;
    }
    return result;
  });
};

export const deleteArrRemoveUserForm =
  (userForm: UserFormNewProject[]) => (userId: number) => {
    return userForm.filter((item) => item.userId !== userId);
  };

export const mergeObjectUserForm =
  (userFrom1: UserFormNewProject[]) =>
  (userForm2: UserFormNewProject): UserFormNewProject[] | null => {
    if (!userFrom1 || !userForm2) return null;
    return userFrom1.map((itemArr1) => {
      if (itemArr1.userId === userForm2.userId) {
        return userForm2;
      } else {
        return itemArr1;
      }
    });
  };

export const getObjectById =
  (listId: UserFormNewProject[]) => (array: UserNotPagging[]) => {
    console.log(array);
    if (!listId || !array) return null;
    const arrayClone = [...array];
    return listId.map((item) => {
      let result!: UserNotPagging;
      for (let itemInArray of arrayClone) {
        if (itemInArray.id === item.userId) {
          result = itemInArray;
        }
      }
      return result;
    });
  };
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
interface UserFormNewProject {
  userId: number;
  type: number;
  id?: number;
}

  export const filterUser =
  (users: UserNotPagging[] | null) =>
  (branch: number) =>
  (type: number) =>
  (level: number) =>
  (name: string) => {
    //   if -1 return old users
    if (users) {
      return users
        .filter((item) => (branch === -1 ? true : item.branch === branch))
        .filter((item) => (type === -1 ? true : item.type === type))
        .filter((item) => (level === -1 ? true : item.level === level))
        .filter((item) => (name === "" ? true : item.name.includes(name)));
    }
  };

export const mergeObjectById =
  (array1: UserNotPagging[]) =>
  (
    array2: UserFormNewProject[]
  ): (UserNotPagging & { typeOffice: number })[] | null => {
    if (!array1 || !array2) return null;

    return array1.map((itemArr1) => {
      let result!: UserNotPagging & { typeOffice: number };
      for (let item of array2) {
        if (itemArr1.id === item?.userId) {
          result = { ...itemArr1, typeOffice: item.type };
        }
      }
      return result ;
    });
  };

export type{
  AllProjectData, 
  Result, Customer, 
  UserNotPagging,
  UserFormNewProject, 
  DataFilterUser,
PayLoadNewProject,
TaskFormNewProject} 