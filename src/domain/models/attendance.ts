export type AttendanceStatus = 'Pendente' | 'Resolvido';

export interface Attendance {
  id: string;
  status: AttendanceStatus;
}
