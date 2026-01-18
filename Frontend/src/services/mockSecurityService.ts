import type { SecurityLog, SecurityEvent, Severity } from '../@types/security';


const events: SecurityEvent[] = ['LOGIN_SUCESS', 'LOGIN_FAILED', 'LOGOUT'];
const locations = ['São Paulo, BR', 'Lisboa, PT', 'New York, US', 'London, UK', 'Tokyo, JP'];
const severities: Severity[] = ['LOW', 'MEDIUM', 'HIGH'];

export const generateMockLogs = (count: number): SecurityLog[] => {
  return Array.from({ length: count }).map((_, i) => {
    const event = events[Math.floor(Math.random() * events.length)];
    
    return {
      id: crypto.randomUUID(),
      userEmail: `user${Math.floor(Math.random() * 50)}@exemplo.com`,
      event: event,
     
      severity: event === 'LOGIN_FAILED' ? 'HIGH' : 'LOW',
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      userAgent: 'Chrome / Windows 11',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
    };
  });
};