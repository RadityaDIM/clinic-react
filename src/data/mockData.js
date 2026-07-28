export const Role = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
  DOCTOR: 'doctor',
};

export const AppointmentStatus = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  RESCHEDULED: 'RESCHEDULED',
  RESERVED: 'RESERVED',
  COMPLETED: 'COMPLETED',
};

export const doctors = [
  { id: 'd1', name: 'Dr. Alisher Karimov', specialization: 'Kardiolog', experience: 12, phone: '+998 90 123 45 67', email: 'a.karimov@klinika.uz', status: 'active', rating: 4.9, patients: 142, bio: 'Yurak-qon tomir kasalliklari bo\'yicha mutaxassis. 12 yillik tajriba.', schedule: [{ day: 'Senin', from: '09:00', to: '17:00' }, { day: 'Rabu', from: '09:00', to: '17:00' }, { day: 'Jumat', from: '09:00', to: '14:00' }] },
  { id: 'd2', name: 'Dr. Malika Yusupova', specialization: 'Pediatr', experience: 8, phone: '+998 91 234 56 78', email: 'm.yusupova@klinika.uz', status: 'active', rating: 4.8, patients: 215, bio: 'Bolalar salomatligi bo\'yicha mutaxassis. 8 yillik tajriba.', schedule: [{ day: 'Senin', from: '08:00', to: '16:00' }, { day: 'Selasa', from: '08:00', to: '16:00' }, { day: 'Kamis', from: '08:00', to: '16:00' }] },
  { id: 'd3', name: 'Dr. Bobur Toshmatov', specialization: 'Nevropatolog', experience: 15, phone: '+998 93 345 67 89', email: 'b.toshmatov@klinika.uz', status: 'active', rating: 4.7, patients: 98, bio: 'Asab tizimi kasalliklari bo\'yicha mutaxassis. 15 yillik tajriba.', schedule: [{ day: 'Selasa', from: '10:00', to: '18:00' }, { day: 'Kamis', from: '10:00', to: '18:00' }] },
  { id: 'd4', name: 'Dr. Nilufar Rashidova', specialization: 'Ginekolog', experience: 10, phone: '+998 94 456 78 90', email: 'n.rashidova@klinika.uz', status: 'active', rating: 4.9, patients: 178, bio: 'Ayollar salomatligi bo\'yicha mutaxassis. 10 yillik tajriba.', schedule: [{ day: 'Senin', from: '09:00', to: '17:00' }, { day: 'Rabu', from: '09:00', to: '17:00' }] },
  { id: 'd5', name: 'Dr. Sardor Xolmatov', specialization: 'Jarroh', experience: 18, phone: '+998 95 567 89 01', email: 's.xolmatov@klinika.uz', status: 'active', rating: 4.8, patients: 64, bio: 'Umumiy jarrohlik bo\'yicha mutaxassis. 18 yillik tajriba.', schedule: [{ day: 'Selasa', from: '08:00', to: '15:00' }, { day: 'Kamis', from: '08:00', to: '15:00' }] },
];

export const patients = [
  { id: 'p1', name: 'Jasur Ergashev', age: 42, gender: 'male', phone: '+998 90 111 22 33', email: 'j.ergashev@mail.uz', address: 'Toshkent, Chilonzor t.', bloodType: 'A+', status: 'active', registeredAt: '2024-01-15' },
  { id: 'p2', name: 'Dilnoza Hasanova', age: 28, gender: 'female', phone: '+998 91 222 33 44', email: 'd.hasanova@gmail.com', address: 'Toshkent, Yunusobod t.', bloodType: 'B+', status: 'active', registeredAt: '2024-02-20' },
  { id: 'p3', name: 'Murod Nazarov', age: 55, gender: 'male', phone: '+998 93 333 44 55', address: 'Samarqand, Mirzo Ulugbek', bloodType: 'O-', status: 'active', registeredAt: '2023-11-05' },
  { id: 'p4', name: 'Shahlo Tursunova', age: 34, gender: 'female', phone: '+998 94 444 55 66', email: 's.tursunova@mail.ru', address: 'Toshkent, Sergeli t.', bloodType: 'AB+', status: 'active', registeredAt: '2024-03-10' },
  { id: 'p5', name: 'Otabek Yusupov', age: 19, gender: 'male', phone: '+998 95 555 66 77', address: 'Farg\'ona, Asaka', bloodType: 'A-', status: 'active', registeredAt: '2024-04-01' },
  { id: 'p6', name: 'Gulnora Ismoilova', age: 61, gender: 'female', phone: '+998 97 666 77 88', address: 'Toshkent, Uchtepa t.', bloodType: 'B-', status: 'inactive', registeredAt: '2023-08-22' },
  { id: 'p7', name: 'Farhod Rahimov', age: 38, gender: 'male', phone: '+998 90 777 88 99', email: 'f.rahimov@yandex.uz', address: 'Namangan', bloodType: 'O+', status: 'active', registeredAt: '2024-01-30' },
  { id: 'p8', name: 'Nargiza Qodirov', age: 47, gender: 'female', phone: '+998 91 888 99 00', address: 'Toshkent, Mirzo Ulugbek t.', bloodType: 'A+', status: 'active', registeredAt: '2023-12-15' },
];

export const appointments = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: '2026-07-28', time: '09:00', status: 'COMPLETED', reason: 'Yurak og\'rig\'i', room: '201' },
  { id: 'a2', patientId: 'p2', doctorId: 'd4', date: '2026-07-28', time: '10:30', status: 'RESERVED', reason: 'Tekshiruv', room: '105' },
  { id: 'a3', patientId: 'p3', doctorId: 'd1', date: '2026-07-28', time: '11:00', status: 'PENDING', reason: 'Bosim tekshiruv', room: '201' },
  { id: 'a4', patientId: 'p4', doctorId: 'd2', date: '2026-07-28', time: '14:00', status: 'PENDING', reason: 'Bolalar tekshiruvi', room: '302' },
  { id: 'a5', patientId: 'p5', doctorId: 'd3', date: '2026-07-29', time: '09:30', status: 'PENDING', reason: 'Bosh og\'rig\'i', room: '410' },
  { id: 'a6', patientId: 'p6', doctorId: 'd5', date: '2026-07-29', time: '10:00', status: 'CANCELLED', reason: 'Umumiy tekshiruv', room: '115' },
  { id: 'a7', patientId: 'p7', doctorId: 'd1', date: '2026-07-30', time: '11:30', status: 'PENDING', reason: 'EKG tekshiruv', room: '201' },
  { id: 'a8', patientId: 'p8', doctorId: 'd4', date: '2026-07-30', time: '09:00', status: 'PENDING', reason: 'Nazorat ko\'rik', room: '105' },
];

export const prescriptions = [
  { id: 'rx1', patientId: 'p1', doctorId: 'd1', date: '2026-07-28', diagnosis: 'Arterial gipertenziya 2-darajali', medications: [{ name: 'Amlodipine', dosage: '5mg', frequency: 'Kuniga 1 marta', duration: '30 kun' }, { name: 'Enalapril', dosage: '10mg', frequency: 'Kuniga 2 marta', duration: '30 kun' }], advice: 'Tuz iste\'molini kamaytiring. Muntazam jismoniy mashq qiling.', nextVisit: '2026-08-28' },
  { id: 'rx2', patientId: 'p2', doctorId: 'd4', date: '2026-07-28', diagnosis: 'Homiladorlik davri tekshiruvi - norma', medications: [{ name: 'Folic acid', dosage: '5mg', frequency: 'Kuniga 1 marta', duration: '60 kun' }], advice: 'To\'g\'ri ovqatlanish. Dam olish rejimiga rioya qiling.', nextVisit: '2026-09-15' },
  { id: 'rx3', patientId: 'p3', doctorId: 'd3', date: '2026-07-27', diagnosis: 'Migren', medications: [{ name: 'Sumatriptan', dosage: '50mg', frequency: 'Kerak bo\'lganda', duration: '30 kun' }], advice: 'Stress va uyqu muammolarini oldini oling.', nextVisit: '2026-08-27' },
];

export const payments = [
  { id: 'pay1', patientId: 'p1', appointmentId: 'a1', amount: 150000, method: 'card', status: 'paid', date: '2026-07-28', description: 'Kardiolog konsultatsiyasi' },
  { id: 'pay2', patientId: 'p2', appointmentId: 'a2', amount: 200000, method: 'cash', status: 'pending', date: '2026-07-28', description: 'Ginekolog ko\'rigi' },
  { id: 'pay3', patientId: 'p3', appointmentId: 'a3', amount: 150000, method: 'transfer', status: 'paid', date: '2026-07-28', description: 'Kardiolog konsultatsiyasi' },
  { id: 'pay4', patientId: 'p4', appointmentId: 'a4', amount: 120000, method: 'card', status: 'pending', date: '2026-07-28', description: 'Pediatr ko\'rigi' },
  { id: 'pay5', patientId: 'p5', appointmentId: 'a5', amount: 180000, method: 'cash', status: 'paid', date: '2026-07-29', description: 'Nevropatolog konsultatsiyasi' },
];

export const medicalRecords = [
  { id: 'mr1', patientId: 'p1', doctorId: 'd1', date: '2026-07-28', type: 'Konsultatsiya', diagnosis: 'Arterial gipertenziya 2-darajali', treatment: 'Antihipertenziv terapiya', notes: 'Qon bosimi 160/100 mmHg. EKG - LV gipertrofiyasi belgilari.' },
  { id: 'mr2', patientId: 'p2', doctorId: 'd4', date: '2026-07-28', type: 'Tekshiruv', diagnosis: 'Homiladorlik 12 hafta - norma', treatment: 'Vitaminlar tavsiya etildi', notes: 'UZI: homila rivojlanishi normal.' },
  { id: 'mr3', patientId: 'p3', doctorId: 'd3', date: '2026-07-27', type: 'MRI', diagnosis: 'Migren bez aura', treatment: 'Analgetik va triptan terapiya', notes: 'MRI: patologik o\'zgarishlar aniqlanmadi.' },
];

export const analyticsData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 4200000, appointments: 82 },
    { month: 'Feb', revenue: 3800000, appointments: 74 },
    { month: 'Mar', revenue: 5100000, appointments: 96 },
    { month: 'Apr', revenue: 4700000, appointments: 89 },
    { month: 'Mei', revenue: 5600000, appointments: 105 },
    { month: 'Jun', revenue: 6200000, appointments: 118 },
    { month: 'Jul', revenue: 5900000, appointments: 112 },
    { month: 'Agu', revenue: 6800000, appointments: 128 },
    { month: 'Sep', revenue: 7100000, appointments: 134 },
    { month: 'Okt', revenue: 6500000, appointments: 124 },
    { month: 'Nop', revenue: 7300000, appointments: 139 },
    { month: 'Des', revenue: 8200000, appointments: 156 },
  ],
  departmentStats: [
    { name: 'Kardiolog', appointments: 45 },
    { name: 'Pediatr', appointments: 62 },
    { name: 'Nevropatolog', appointments: 38 },
    { name: 'Ginekolog', appointments: 54 },
    { name: 'Jarroh', appointments: 22 },
    { name: 'Terapevt', appointments: 40 },
  ],
  weeklyAppointments: [
    { day: 'Sen', value: 18 },
    { day: 'Sel', value: 22 },
    { day: 'Rab', value: 15 },
    { day: 'Kam', value: 25 },
    { day: 'Jum', value: 20 },
    { day: 'Sab', value: 12 },
  ],
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('id-ID').format(amount) + ' so\'m';

export const getPatientById = (id) => patients.find(p => p.id === id);
export const getDoctorById = (id) => doctors.find(d => d.id === id);
export const getAppointmentsByPatient = (patientId) => appointments.filter(a => a.patientId === patientId);
export const getPrescriptionsByPatient = (patientId) => prescriptions.filter(p => p.patientId === patientId);
export const getPaymentsByPatient = (patientId) => payments.filter(p => p.patientId === patientId);
export const getMedicalRecordsByPatient = (patientId) => medicalRecords.filter(r => r.patientId === patientId);
