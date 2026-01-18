export type SecurityEvent = 'LOGIN_SUCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'PASSWORD_CHANGE';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityLog {
    id: string;
    userId?: string;
    userEmail: string;
    event: SecurityEvent;
    ip: string;
    location: string;
    userAgent: string;
    severity: Severity;
    createdAt: string; 
}