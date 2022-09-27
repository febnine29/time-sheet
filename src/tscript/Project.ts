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
interface DataSingleProject {
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
export const deleteArrInArrByIdTask = (
  arrayNeedDelete: Task[],
  array: Task[] | null
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
export const mergeObjectByIdTask =
  (array1: Task[]) =>
  (array2: TaskFormNewProject[]): (Task & { billable: boolean })[] | null => {
    if (!array1 || !array2) return null;
    return array1.map((itemArr1) => {
      let result!: Task & { billable: boolean };

      array2.forEach((itemArr2) => {
        if (itemArr1.id === itemArr2.taskId) {
          result = { ...itemArr1, billable: itemArr2.billable };
        }
      });
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
  export const dataLevel = [
    { level: 0, name: "Intern_0" },
    { level: 1, name: "Intern_1" },
    { level: 2, name: "Intern_2" },
    { level: 3, name: "Prefresher" },
    { level: 4, name: "Fresher-" },
    { level: 5, name: "Fresher" },
    { level: 6, name: "Fresher+" },
    { level: 7, name: "Junior-" },
    { level: 8, name: "Junior" },
    { level: 9, name: "Junior+" },
    { level: 10, name: "Middle-" },
    { level: 11, name: "Middle" },
    { level: 12, name: "Middle+" },
    { level: 13, name: "Senior-" },
    { level: 14, name: "Senior" },
    { level: 15, name: "Senior+" },
  ];
  export const checkLevel = (level: number | null): string => {
    if (level || level === 0) {
      const data = dataLevel.filter((item) => item.level === level);
      return data[0].name;
    }
    return "";
  };
  
  export const dataTypeUser = [
    { type: 0, name: "Staff" },
    { type: 1, name: "Internship" },
    { type: 2, name: "Collaborator" },
  ];
  
  export const checkTypeUser = (type: number | null): string => {
    if (type || type === 0) {
      const data = dataTypeUser.filter((item) => item.type === type);
      return data[0].name;
    }
    return "";
  };
  interface Task {
    name: string;
    type: number;
    isDeleted: boolean;
    id: number;
  }
  export const mergeObjectTaskForm =
  (taskForm: TaskFormNewProject[]) =>
  (dataChangeTaskForm: TaskFormNewProject) => {
    if (!taskForm || !dataChangeTaskForm) return null;
    return taskForm.map((itemArr1) => {
      if (itemArr1.taskId === dataChangeTaskForm.taskId) {
        return dataChangeTaskForm;
      } else {
        return itemArr1;
      }
    });
  };
  export const deleteArrRemoveTaskForm =
  (userForm: TaskFormNewProject[]) => (taskId: number) => {
    return userForm.filter((item) => item.taskId !== taskId);
  };
export type{
  AllProjectData, 
  Result, Customer, 
  UserNotPagging,
  DataSingleProject,
  UserFormNewProject, 
  DataFilterUser,
PayLoadNewProject,
TaskFormNewProject,
Task} 