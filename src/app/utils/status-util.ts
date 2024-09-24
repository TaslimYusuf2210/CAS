export enum STATUS {
  OpenRunning = 'Open/Running',
  Closed = 'Closed',
  Draft = 'Draft',
  Approved = 'Approved',
  Rejected = 'Rejected',
  PendingApproval = 'Pending Approval',
  Active = 'active',
  Inactive = 'inactive',
}

export const handleStatus = (status: STATUS) => {
  let value!: string;
  switch (status) {
    case STATUS.OpenRunning:
      value = 'text-[#7BC900] bg-[#7BC90014] rounded-[25px]';
      break;
    case STATUS.Closed:
      value = 'text-[#EA2A1D] bg-[#EA2A1D14] rounded-[25px]';
      break;
    case STATUS.Draft:
      value = 'text-[#787878] bg-[#F8F8F8] rounded-[25px]';
      break;
    case STATUS.PendingApproval:
      value = 'text-[#787878] bg-[#e2f4fb] rounded-[25px]';
      break;
    case STATUS.Approved:
      value = 'text-[#7BC900] bg-[#7BC90014] rounded-[25px]';
      break;
    case STATUS.Rejected:
      value = 'text-[#EA2A1D] bg-[#EA2A1D14] rounded-[25px]';
      break;
    case STATUS.Active:
      value = 'text-[#7BC900] bg-[#7BC90014] rounded-[25px]';
      break;
    case STATUS.Inactive:
      value = 'text-[#EA2A1D] bg-[#EA2A1D14] rounded-[25px]';
      break;
  }
  return value;
};
